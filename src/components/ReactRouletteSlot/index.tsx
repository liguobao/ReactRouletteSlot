/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-08 16:41:42
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
import Alert from '@components/Alert';
const MIN_ROUND = 2;

@shouldUpdate({
    props: ['data', 'action'],
    state: ['pointer', 'run'],
})
export class ReactRouletteSlot extends React.Component<
    ReactRouletteSlotProps,
    ReactRouletteSlotState
> {
    state = {
        board: [[]],
        boardData: [],
        run: false,
        // 记录当前的active 位置
        pointer: -1,
    };
    timer = null;

    // 记录转了几圈
    round: number = 0;
    // 记录结束时转了几圈
    endRound: number = 0;
    // 记录目标
    target: number | string = null;
    // 抽奖按钮的坐标
    luckyButtonPosition: {
        x: number;
        y: number;
    } = {
        x: 0,
        y: 0,
    };
    // 列
    row: number = 0;
    // 行
    col: number = 0;
    // 单元高度
    itemHeight: number = 0;

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
    getBoardData = () => this.state.boardData;

    // 寻找目标节点
    findTargetPointer = (target: number | string): DataItem =>
        this.getBoardData().find((cur) => {
            if (cur.type === 'button') {
                return false;
            }
            return cur.data.id === target;
        });
    // 获得几列
    getRow = (data: any[]) => (this.props.row || data.length < 9 ? 3 : 4);
    // 获得几行
    getCol = (row: number) => (this.props.data.length - 2 * row) / 2 + 2;
    // 获得单元高度
    getItemHeight = (col: number) => this.props.height / col - (col - 2) * 1;
    // 获得按钮的坐标数据
    getLuckyButtonPosition = (data: RouletteSlotData, row: number) => {
        const x = row - 2;
        const y = (data.length - row * 2) / 2;
        this.luckyButtonPosition = {
            x,
            y,
        };
    };
    // 生成棋盘
    getBoard = (
        row: number,
        col: number,
        length: number,
        initData: RouletteSlotData
    ): [DataItem[][], DataItem[]] => {
        const board = [];
        const boardData = [];
        let position = 0;
        let Y = 0;
        for (let x = 0; x < col; x++) {
            board[x] = [];

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
                    } else {
                        position = row + x - 1;
                    }
                }
                if (position === -1) {
                    break;
                }

                board[x][Y] = {
                    position,
                    data: initData[position],
                    type: 'item',
                };
                position = -1;

                boardData.push(board[x][Y]);
            }
        }
        return [board, boardData];
    };
    // 加入抽奖按钮
    joinButton = (board: DataItem[][], boardData: DataItem[], row: number) => {
        const temp = board[1][1];
        const button: DataItem = { type: 'button' };
        board[1][1] = button;
        board[1][2] = temp;
        boardData.splice(row + 1, 0, button);
    };
    // 根据数据生成行数, 列数, 棋盘, 抽奖按钮的数据
    dataHandler = () => {
        const initData = this.props.data;
        const row = this.getRow(initData);
        const col = this.getCol(row);
        const [board, boardData] = this.getBoard(
            row,
            col,
            initData.length,
            initData
        );
        this.joinButton(board, boardData, row);
        this.row = row;
        this.col = col;
        this.itemHeight = this.getItemHeight(col);
        this.setState({
            board,
            boardData,
        });

        this.getLuckyButtonPosition(initData, row);
    };
    // 请求开奖结果的回调
    onResultReturn = ({ data }: { data: number | string }) => {
        this.target = data;
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
            this.round = 0;
            this.endRound = 0;
            // 点击启动跑马灯
            this.setState({
                run: true,
                pointer: 0,
            });
            this.onFetch();
            this.run();
        }
    };
    onSuccess = (target: DataItem) => {
        Alert.show({ content: `恭喜您获得${target.data.label}` });
        return this.reset();
    };
    onFail = () => {
        Alert.show({ content: '请稍后重试' });
        return this.reset();
    };
    getTime = (time: number, interval: number = -50) => {
        if (time < 100) {
            return 100;
        } else {
            return time + interval;
        }
    };
    position = () => {
        let pointer = this.state.pointer + 1;
        let round = this.round;
        if (pointer >= this.props.data.length) {
            pointer = 0;
            round++;
        }

        this.round = round;
        this.setState({
            pointer,
        });
        return [pointer, round];
    };
    reset = () => {
        this.setState({
            run: false,
        });
        return clearInterval(this.timer);
    };
    runBeforeEnd = (pointer: number, time: number) => {
        const target = this.findTargetPointer(this.target);
        if (!target) {
            return this.onFail();
        }
        if (this.endRound < 2) {
            if (pointer === target.position) {
                this.endRound = this.endRound + 1;
            }
            return this.run(this.getTime(time));
        }

        if (target.position === pointer) {
            return this.onSuccess(target);
        }
        // 进入结束流程
        this.run(this.getTime(time, 30));
    };
    run = (time: number = 500) => {
        this.timer = setTimeout(() => {
            const [pointer, round] = this.position();
            if (round > MIN_ROUND && this.target !== null) {
                this.runBeforeEnd(pointer, time);
            } else {
                this.run(this.getTime(time));
            }
        }, time);
    };
    // 抽奖按钮
    LuckyButton = () => (
        <LuckyButton
            x={this.luckyButtonPosition.x}
            y={this.luckyButtonPosition.y}
            onClick={this.onClick}
            disable={this.state.run}
        >
            <LuckyLabel>
                <div>点击</div>
                <div>抽奖</div>
            </LuckyLabel>
        </LuckyButton>
    );

    // 物品节点
    Item = ({
        data,
        position,
    }: {
        position: number;
        data: RouletteSlotDataItem;
    }) => (
        <Item>
            <Content active={this.isActive(position)} height={this.itemHeight}>
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
    Line = (line: DataItem[], key: number) => (
        <Line key={key}>{line.map(this.Grid)}</Line>
    );
    // 棋盘
    Board = () => (
        <Wrapper width={this.props.width} height={this.props.height}>
            <tbody>{this.state.board.map(this.Line)}</tbody>
        </Wrapper>
    );

    render() {
        return (
            <Border
                width={this.props.width}
                height={this.props.height}
                row={this.row}
                col={this.col}
                isRun={this.state.run}
            >
                <this.Board />
            </Border>
        );
    }
}
export default compose(
    emptyEnhancer(
        ({ data }: { data: RouletteSlotData }) =>
            !data || data.length === 0 || data.length % 2 !== 0,
        () => {
            Alert.show({ content: '数据不符合要求' });
            return null;
        }
    ),
    errorBoundaryEnhancer('角子机载入失败')
)(ReactRouletteSlot);
