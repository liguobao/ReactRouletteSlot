/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2018-10-01 18:20:57
 */
/// <reference path='index.d.ts' />
import React from 'react';
import { Wrapper, Item, LuckyButton, Line, Content } from './style';
import { shouldUpdate } from '@common/decorator/decorator';
import { compose } from '@common/helper/compose';
import emptyEnhancer from '@common/HOC/Empty';
import errorBoundaryEnhancer from '@common/HOC/ErrorBoundary';
import fetch from 'isomorphic-fetch';
const MIN_ROUND = 2;
type DataItem = {
    type: 'item' | 'button';
    data?: ReactRouletteSlot.RouletteSlotDataItem;
    position?: number;
};
type ReactRouletteSlotProps = {
    data: ReactRouletteSlot.RouletteSlotData;
    // 每行个数
    row?: number;
    action: string;
};
type ReactRouletteSlotState = {
    // 处理过后的数据
    board: DataItem[][];
    // 记录当前的active 位置
    pointer: number;
    // 记录转了几圈
    round: number;
    // 记录结束时转了几圈
    endRound: number;
    // 记录目标
    target: number;
    // 是否启动
    start: boolean;
    luckyButtonPosition: {
        x: number;
        y: number;
    };
};
@shouldUpdate({
    props: ['data'],
    state: ['pointer'],
})
class ReactRouletteSlot extends React.Component<
    ReactRouletteSlotProps,
    ReactRouletteSlotState
> {
    state = {
        board: [[]],
        pointer: -1,
        target: null,
        round: 0,
        endRound: 0,
        start: false,
        luckyButtonPosition: {
            x: 0,
            y: 0,
        },
    };

    componentWillMount() {
        this.dataHandler();
    }

    getRow = (data: any[]) => {
        if (this.props.row) {
            return this.props.row;
        }
        return data.length < 9 ? 3 : 4;
    };
    getCol = (row) => (this.props.data.length - 2 * row) / 2 + 2;
    getLuckyButtonPosition = (
        data: ReactRouletteSlot.RouletteSlotData,
        row: number
    ) => {
        const x = row - 2;
        const y = (data.length - row * 2) / 2;
        this.setState({
            luckyButtonPosition: {
                x,
                y,
            },
        });
    };
    // 生成棋盘
    getBoard = (
        row: number,
        col: number,
        length: number,
        initData: ReactRouletteSlot.RouletteSlotData
    ) => {
        const board = [];
        let position = 0;
        let Y = 0;
        for (let x = 0; x < col; x++) {
            if (!board[x]) {
                board[x] = [];
            }
            for (let y = 0; y < row; y++) {
                Y = y;
                if (x === 0) {
                    position = y;
                } else if (x === col - 1) {
                    position = row + col - 2 + y;
                    Y = row - y - 1;
                } else if (y === 0 || y === 1) {
                    if (y === 0) {
                        position = length - x;
                    } else if (y === 1) {
                        position = row + x - 1;
                    }
                }
                if (position !== -1) {
                    board[x][Y] = {
                        position,
                        data: initData[position],
                        type: 'item',
                    };
                    position = -1;
                } else {
                    break;
                }
            }
        }
        return board;
    };
    joinButton = (board) => {
        const temp = board[1][1];
        board[1][1] = { type: 'button' };
        board[1][2] = temp;
    };
    dataHandler = (initData = this.props.data) => {
        const row = this.getRow(initData);
        const col = this.getCol(row);
        const board: DataItem[][] = this.getBoard(
            row,
            col,
            initData.length,
            initData
        );
        this.joinButton(board);
        this.setState({
            board,
        });
        this.getLuckyButtonPosition(initData, row);
    };
    onResultReturn = ({ data }: { data: number }) => {
        this.setState({
            target: data,
        });
    };
    onFetch() {
        setTimeout(() => {
            this.onResultReturn({ data: 1010 });
        }, 2000);
    }
    onClick = () => {
        // 点击启动跑马灯
        this.setState({
            start: true,
            pointer: 0,
        });
        this.onFetch();
        this.run();
    };
    getTime = (time, interval: number = -50) => {
        if (time < 100) {
            return 100;
        } else {
            return time + interval;
        }
    };
    isTargetPointer = (target) => {
        const data: DataItem[] = this.state.board.reduce((array, cur) => {
            return array.concat(cur);
        }, []);
        console.log(data);
        const result = data.find((cur) => {
            if (cur.type === 'button') {
                return false;
            }
            return cur.data.id === target;
        });

        return result;
    };
    run = (time: number = 500) => {
        const timer = setTimeout(() => {
            let pointer = this.state.pointer + 1;
            let round = this.state.round;
            if (pointer >= this.props.data.length) {
                pointer = 0;
                round++;
            }

            this.setState({
                pointer,
                round,
            });
            if (round > MIN_ROUND && this.state.target !== null) {
                const target = this.isTargetPointer(this.state.target);
                if (target && target.position === pointer) {
                    window.Alert.success(`恭喜您获得${target.data.label}`);
                    return clearInterval(timer);
                }
                // 进入结束流程
                this.run(this.getTime(time, 30));
            } else {
                this.run(this.getTime(time));
            }
        }, time);
    };
    LuckyButton = () => (
        <LuckyButton
            x={this.state.luckyButtonPosition.x}
            y={this.state.luckyButtonPosition.y}
            onClick={this.onClick}
        >
            点击抽奖
        </LuckyButton>
    );
    isActive = (position: number) => this.state.pointer === position;
    Item = ({
        data,
        position,
    }: {
        position: number;
        data: ReactRouletteSlot.RouletteSlotDataItem;
    }) => (
        <Item active={this.isActive(position)}>
            <Content>
                <img src={data.img} />
                <div>{data.label}</div>
            </Content>
        </Item>
    );
    Grid = (item: DataItem, index: number) => {
        return item.type === 'item' ? (
            <this.Item data={item.data} position={item.position} key={index} />
        ) : (
            <this.LuckyButton key={index} />
        );
    };
    Line = (line, key) => <Line key={key}>{line.map(this.Grid)}</Line>;
    Board = () => (
        <Wrapper>
            <tbody>{this.state.board.map(this.Line)}</tbody>
        </Wrapper>
    );

    render() {
        return <this.Board />;
    }
}
export default compose(
    emptyEnhancer(
        ({ data }: { data: ReactRouletteSlot.RouletteSlotData }) =>
            !data || data.length === 0 || data.length % 2 !== 0,
        () => window.Alert.fail('数据不符合要求')
    ),
    errorBoundaryEnhancer('角子机载入失败')
)(ReactRouletteSlot);
