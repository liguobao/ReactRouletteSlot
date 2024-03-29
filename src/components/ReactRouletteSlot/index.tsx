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
    BingoItem,
} from './style';
import { shouldUpdate } from '@common/decorator/decorator';
import { compose } from '@common/helper/compose';
import emptyEnhancer from '@common/HOC/Empty';
import errorBoundaryEnhancer from '@common/HOC/ErrorBoundary';
import Border from './Border';
import Alert from '@components/Alert';
const MIN_ROUND = 1;

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
    target: ReturnData = null;
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
    getRow = () => (this.props.row || this.props.data.length < 9 ? 3 : 4);
    // 获得几行
    getCol = () => (this.props.data.length - 2 * this.row) / 2 + 2;
    // 获得单元高度
    getItemHeight = () => this.props.height / this.col - (this.col - 2) * 1;
    // 获得按钮的坐标数据
    setLuckyButtonPosition = () => {
        this.luckyButtonPosition = {
            x: this.row - 2,
            y: (this.props.data.length - this.row * 2) / 2,
        };
    };
    // 生成棋盘
    getBoard = (): [DataItem[][], DataItem[]] => {
        const board = [];
        const boardData = [];
        let position = 0;
        let Y = 0;
        for (let x = 0; x < this.col; x++) {
            board[x] = [];

            for (let y = 0; y < this.row; y++) {
                Y = y;
                if (x === 0) {
                    position = y;
                } else if (x === this.col - 1) {
                    position = this.row + this.col - 2 + y;
                    Y = this.row - y - 1;
                } else if (y === 0 || y === 1) {
                    if (y === 0) {
                        position = this.props.data.length - x;
                    } else {
                        position = this.row + x - 1;
                    }
                }
                if (position === -1) {
                    break;
                }

                board[x][Y] = {
                    position,
                    data: this.props.data[position],
                    type: 'item',
                };
                position = -1;

                boardData.push(board[x][Y]);
            }
        }
        return [board, boardData];
    };
    // 加入抽奖按钮
    joinButton = (board: DataItem[][], boardData: DataItem[]) => {
        const temp = board[1][1];
        const button: DataItem = { type: 'button' };
        board[1][1] = button;
        board[1][2] = temp;
        boardData.splice(this.row + 1, 0, button);
    };
    // 根据数据生成行数, 列数, 棋盘, 抽奖按钮的数据
    dataHandler = () => {
        this.row = this.getRow();
        this.col = this.getCol();

        const [board, boardData] = this.getBoard();
        this.joinButton(board, boardData);

        this.itemHeight = this.getItemHeight();
        this.setState({
            board,
            boardData,
        });

        this.setLuckyButtonPosition();
    };
    // 请求开奖结果的回调
    onResultReturn = (res: ReturnData) => {
        this.target = res;
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
    onSuccess = (target: DataItem, isWin: boolean = true) => {
        const title = isWin ? '恭喜您中奖了' : '很遗憾, 没有中奖';
        const CurBingoItem = this.props.BingoItem || this.BingoItem;
        Alert.show({
            title,
            content: <CurBingoItem data={target.data} />,
        });
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
        const target = this.findTargetPointer(this.target.data);
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
            return this.onSuccess(target, this.target.isWin);
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
            {this.props.LuckyButton ? (
                <this.props.LuckyButton />
            ) : (
                <this.LuckyContent />
            )}
        </LuckyButton>
    );
    LuckyContent = () => (
        <LuckyLabel>
            <div>点击</div>
            <div>抽奖</div>
        </LuckyLabel>
    );

    BingoItem = ({ data }: { data: RouletteSlotDataItem }) => (
        <BingoItem height={this.itemHeight * 1.5}>
            <this.ItemContent data={data} imgSize={this.itemHeight} />
        </BingoItem>
    );

    ItemContent = ({
        data,
        imgSize = this.itemHeight / 2,
    }: {
        data: RouletteSlotDataItem;
        imgSize?: number;
    }) => (
        <>
            <ContentItem>
                <Img src={data.img} height={imgSize} />
            </ContentItem>
            <ContentItem>
                <div>{data.label}</div>
            </ContentItem>
        </>
    );
    // 物品节点
    Item = (props: { position: number; data: RouletteSlotDataItem }) => (
        <Item>
            <Content
                active={this.isActive(props.position)}
                height={this.itemHeight}
            >
                <this.ItemContent {...props} />
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
