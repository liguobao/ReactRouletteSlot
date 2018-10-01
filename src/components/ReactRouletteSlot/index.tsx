/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2018-10-01 12:15:24
 */
/// <reference path='index.d.ts' />
import React from 'react';
import { Wrapper, Item, LuckyButton, Line } from './style';
import { shouldUpdate } from '@common/decorator/decorator';
import { compose } from '@common/helper/compose';
import emptyEnhancer from '@common/HOC/Empty';
import errorBoundaryEnhancer from '@common/HOC/ErrorBoundary';
const ROW = 4;
type ReactRouletteSlotProps = {
    data: ReactRouletteSlot.RouletteSlotData;
    // 每行个数
    row?: number;
};
type ReactRouletteSlotState = {
    // 几行
    col: number;
    // 处理过后的数据
    data: JSX.Element[][];
    // 每行几个
    row: number;
};
@shouldUpdate({
    props: ['data'],
    state: ['col'],
})
class ReactRouletteSlot extends React.Component<
    ReactRouletteSlotProps,
    ReactRouletteSlotState
> {
    state = {
        col: 4,
        data: [],
        row: 4,
    };
    componentWillMount() {
        this.dataHandler();
    }
    componentWillReceiveProps(nextProps: ReactRouletteSlotProps) {
        if (nextProps.data !== this.props.data) {
            this.dataHandler(nextProps.data);
        }
    }

    getX = (index: number, row: number) => {
        if (index < row) {
            // 第一行
            return 0;
        } else if (
            index > this.props.data.length - row - 1 &&
            index < this.props.data.length
        ) {
            // 最后一行
            return row;
        } else {
            console.log(Math.floor((index - row) / 2) + 1);
            return Math.floor((index - row) / 2) + 1;
        }
    };
    getRow = (data: any[]) => {
        let row = 3;
        if (data.length < 9) {
            row = 3;
        } else if (data.length < 14) {
            row = 4;
        }
        return row;
    };
    getCol = (row) => (this.props.data.length - 2 * row) / 2 + 2;
    dataHandler = (initData = this.props.data) => {
        const data: JSX.Element[][] = [];
        const row = this.getRow(initData);
        const col = this.getCol(row);
        console.log(row);
        initData.map((cur, index) => {
            const X = this.getX(index, row);

            if (!data[X]) {
                data[X] = [];
            }
            data[X].push(<this.Item data-id={index} item={cur} />);
            if (X === 1 && data[X].length === 1) {
                data[X].push(<this.LuckyButton data={initData} row={row} />);
            }
        });
        this.setState({
            data,
            col,
            row,
        });
    };
    LuckyButton = ({
        data,
        row,
    }: {
        data: ReactRouletteSlot.RouletteSlotData;
        row: number;
    }) => {
        const x = row - 2;
        const y = (data.length - row * 2) / 2;
        return (
            <LuckyButton x={x} y={y}>
                点击抽奖
            </LuckyButton>
        );
    };
    Item = ({ item }: { item: ReactRouletteSlot.RouletteSlotDataItem }) => (
        <Item data-id={item.id}>
            <img src={item.img} />
            <div>{item.label}</div>
        </Item>
    );
    Line = (line) => <Line>{line.map((v) => v)}</Line>;
    Board = () => <Wrapper>{this.state.data.map(this.Line)}</Wrapper>;

    render() {
        console.log(this.props.data);
        console.log(this.state.data);
        return <this.Board />;
    }
}
export default compose(
    emptyEnhancer(
        ({ data }: { data: ReactRouletteSlot.RouletteSlotData }) =>
            !data || data.length === 0 || data.length % 2 !== 0,
        () => window.Alert.fail('数据不符合要求')
    ),
    errorBoundaryEnhancer('底部菜单栏载入失败')
)(ReactRouletteSlot);
