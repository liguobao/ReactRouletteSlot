/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2018-11-30 14:57:02
 */

import React from 'react';
import { Border, Ball } from './style';
import { shouldUpdate } from '@common/decorator/decorator';
enum BallPositionType {
    'top',
    'bottom',
    'left',
    'right',
}
type BoardProps = {
    children: JSX.Element;
    size?: number;
    row: number;
    col: number;
    isRun: boolean;
};
type BoardState = {};
@shouldUpdate({
    props: ['children', 'row', 'col', 'isRun'],
})
export default class Board extends React.Component<BoardProps, BoardState> {
    getTotalSize = () => this.props.size + 20 * 2;
    getTop = (index: number, type: BallPositionType) => {
        switch (type) {
            case BallPositionType.left:
            case BallPositionType.right:
                return (
                    ((this.getTotalSize() - 20) / this.props.col / 2) * index +
                    5
                );
            case BallPositionType.top:
                return 5;
            default:
                return null;
        }
    };
    getLeft = (index: number, type: BallPositionType) => {
        switch (type) {
            case BallPositionType.bottom:
            case BallPositionType.top:
                return (
                    ((this.getTotalSize() - 20) / this.props.row / 2) * index +
                    5
                );
            case BallPositionType.left:
                return 5;
            default:
                return null;
        }
    };

    getBottom = (_index: number, type: BallPositionType) =>
        type === BallPositionType.bottom ? 5 : null;
    getRight = (_index: number, type: BallPositionType) =>
        type === BallPositionType.right ? 5 : null;

    getBalls = (size: number, type: BallPositionType) => {
        const result = [];
        for (let value = 0; value < size; value++) {
            result.push(
                <Ball
                    top={this.getTop(value, type)}
                    left={this.getLeft(value, type)}
                    isOdd={value % 2 === 0}
                    bottom={this.getBottom(value, type)}
                    right={this.getRight(value, type)}
                    isRun={this.props.isRun}
                    key={value}
                />
            );
        }
        return result;
    };
    TopBalls = (size: number) => this.getBalls(size, BallPositionType.top);
    BottomBalls = (size: number) =>
        this.getBalls(size, BallPositionType.bottom);
    LeftBalls = (size: number) => this.getBalls(size, BallPositionType.left);
    RightBalls = (size: number) => this.getBalls(size, BallPositionType.right);
    Balls = () => {
        const hSize = this.props.row * 2 + 1;
        const vSize = this.props.col * 2 + 1;
        const result = [
            this.TopBalls(hSize),
            this.BottomBalls(hSize),
            this.LeftBalls(vSize),
            this.RightBalls(vSize),
        ];
        return <React.Fragment>{result}</React.Fragment>;
    };
    render() {
        return (
            <React.Fragment>
                <Border size={this.props.size}>
                    <this.Balls />
                    {this.props.children}
                </Border>
            </React.Fragment>
        );
    }
}
