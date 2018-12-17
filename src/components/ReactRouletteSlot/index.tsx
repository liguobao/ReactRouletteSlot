/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2018-12-05 16:06:22
 */
/// <reference path='index.d.ts' />
import React from 'react';
import {
    Wrapper,
    Item,
    LuckyButton,
    Line,
    Content,
    LuckyLabel,
    ContentItem,
    Img,
} from './style';
import { shouldUpdate } from '@common/decorator/decorator';
import { compose } from '@common/helper/compose';
import emptyEnhancer from '@common/HOC/Empty';
import errorBoundaryEnhancer from '@common/HOC/ErrorBoundary';
import Border from './Border';
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
    action: (
        cb: (
            { data, isWin }: { data: number | string; isWin?: boolean }
        ) => void
    ) => void;
    size?: number;
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
    // 是否在运行中
    run: boolean;
    // 抽奖按钮的坐标
    luckyButtonPosition: {
        x: number;
        y: number;
    };
    // 列
    row: number;
    // 行
    col: number;
};
@shouldUpdate({
    props: ['data'],
    state: ['pointer', 'run'],
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
        luckyButtonPosition: {
            x: 0,
            y: 0,
        },
        run: false,
        row: null,
        col: null,
    };
    timer = null;
    componentWillMount() {
        this.dataHandler();
    }
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    isActive = (position: number) => this.state.pointer === position;
    // 活动棋盘的数据
    getBoardData = () =>
        this.state.board.reduce((array, cur) => {
            return array.concat(cur);
        }, []);

    // 寻找目标节点
    findTargetPointer = (target) =>
        this.getBoardData().find((cur) => {
            if (cur.type === 'button') {
                return false;
            }
            return cur.data.id === target;
        });
    // 获得几列
    getRow = (data: any[]) => (this.props.row || data.length < 9 ? 3 : 4);
    // 获得几行
    getCol = (row) => (this.props.data.length - 2 * row) / 2 + 2;
    // 获得按钮的坐标数据
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
                if (position === -1) {
                    break;
                }
                if (position !== -1) {
                    board[x][Y] = {
                        position,
                        data: initData[position],
                        type: 'item',
                    };
                    position = -1;
                }
            }
        }
        return board;
    };
    // 加入按钮
    joinButton = (board) => {
        const temp = board[1][1];
        board[1][1] = { type: 'button' };
        board[1][2] = temp;
    };
    // 根据数据生成行数, 列数, 棋盘, 抽奖按钮的数据
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
            row,
            col,
        });
        this.getLuckyButtonPosition(initData, row);
    };
    // 请求开奖结果的回调
    onResultReturn = ({ data }: { data: number }) => {
        this.setState({
            target: data,
        });
    };
    // 请求数据
    onFetch() {
        setTimeout(() => {
            this.props.action(this.onResultReturn);
        }, 2000);
    }
    // 抽奖
    onClick = () => {
        if (!this.state.run) {
            // 点击启动跑马灯
            this.setState({
                pointer: 0,
                round: 0,
                endRound: 0,
                run: true,
            });
            this.onFetch();
            this.run();
        }
    };
    getTime = (time, interval: number = -50) => {
        if (time < 100) {
            return 100;
        } else {
            return time + interval;
        }
    };
    position = () => {
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
        return [pointer, round];
    };
    reset = () => {
        this.setState({
            run: false,
        });
        return clearInterval(this.timer);
    };
    runBeforeEnd = (pointer: number, time) => {
        const target = this.findTargetPointer(this.state.target);
        if (!target) {
            window.Alert.success('请稍后重试');
            return this.reset();
        }
        if (target && target.position === pointer) {
            window.Alert.success(`恭喜您获得${target.data.label}`);
            return this.reset();
        }
        // 进入结束流程
        this.run(this.getTime(time, 30));
    };
    run = (time: number = 500) => {
        this.timer = setTimeout(() => {
            const [pointer, round] = this.position();
            if (round > MIN_ROUND && this.state.target !== null) {
                this.runBeforeEnd(pointer, time);
            } else {
                this.run(this.getTime(time));
            }
        }, time);
    };
    // 抽奖按钮
    LuckyButton = () => (
        <LuckyButton
            x={this.state.luckyButtonPosition.x}
            y={this.state.luckyButtonPosition.y}
            onClick={this.onClick}
            disable={this.state.run}
        >
            <LuckyLabel>点击抽奖</LuckyLabel>
        </LuckyButton>
    );

    // 物品节点
    Item = ({
        data,
        position,
    }: {
        position: number;
        data: ReactRouletteSlot.RouletteSlotDataItem;
    }) => (
        <Item>
            <Content active={this.isActive(position)}>
                <ContentItem>
                    <Img src={data.img} />
                </ContentItem>
                <ContentItem>
                    <div>{data.label}</div>
                </ContentItem>
            </Content>
        </Item>
    );
    // 每个节点
    Grid = (item: DataItem, index: number) =>
        item.type === 'item' ? (
            <this.Item data={item.data} position={item.position} key={index} />
        ) : (
            <this.LuckyButton key={index} />
        );
    // 每一行
    Line = (line, key) => <Line key={key}>{line.map(this.Grid)}</Line>;
    // 棋盘
    Board = () => (
        <Wrapper size={this.props.size}>
            <tbody>{this.state.board.map(this.Line)}</tbody>
        </Wrapper>
    );

    render() {
        return (
            <Border
                size={this.props.size}
                row={this.state.row}
                col={this.state.col}
                isRun={this.state.run}
            >
                <this.Board />
            </Border>
        );
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
