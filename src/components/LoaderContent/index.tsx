/*
 * @Author: wzi
 * @Date: 2018-09-27 15:56:38
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-27 16:26:34
 */
import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';

const MARGIN = 15;
const MARGIN_RIGHT = 30;
const RADIUS = 4;
const ROW_HEIGHT = 8;
const ROW_SPACING = 23;
const RANDOM_MIN = 1;
const RANDOM_MAX = 60;
const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 130;
type LoaderContentProp = {
    width?: number;
    height?: number;
    rows?: number;
    spacing?: number;
    rowHeight?: number;
    rowWidth?: number;
    type?: string;
    loaders?: any[];
};
// 用法
// <LoaderContent type="list" width={230} height={373} />
// <LoaderContent width={230} height={373} loaders={[{}, {}]} />
class LoaderContent extends Component<LoaderContentProp, {}> {
    static defaultProps = {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        spacing: ROW_SPACING,
        rowHeight: ROW_HEIGHT,
        loaders: [{ x: 15, y: 15, width: 400 }],
        type: 'list',
    };
    clearInlineBlockStyle = {
        display: 'inline',
        verticalAlign: 'top',
    };

    getWidth = () => this.props.width;
    getHeight = () => this.props.height;
    getSpacing = () => this.props.spacing;
    getRowHeight = () => this.props.rowHeight;
    getLoaders = () => this.props.loaders;

    getRowWidth = (index) =>
        this.getWidth() - MARGIN_RIGHT - this.getRandom(index);
    getRandom = (start = RANDOM_MIN, end = RANDOM_MAX) =>
        Math.floor(Math.random() * (end - start) + start);

    getDefaultRows = () => Math.floor(this.getHeight() / 24.5);
    getRowsData = () =>
        Array(this.props.rows || this.getDefaultRows()).fill('');
    getY = (index) => index * this.getSpacing() + MARGIN;

    LoaderListMap = (_value, index) => (
        <rect
            x={MARGIN}
            y={this.getY(index)}
            width={this.getRowWidth(index)}
            height={this.getRowHeight()}
            rx={RADIUS}
            ry={RADIUS}
            key={index}
        />
    );

    // 列表类型
    LoaderList = () => this.getRowsData().map(this.LoaderListMap);

    // 默认自定义，传入配置
    // <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    LoaderCustom = () =>
        this.getLoaders().map((items, index) => (
            <rect rx={RADIUS} ry={RADIUS} height={ROW_HEIGHT} {...items} key={index} />
        ));

    isList = () => this.props.type === 'list';
    render() {
        return (
            <ContentLoader
                width={this.getWidth()}
                height={this.getHeight()}
                style={this.clearInlineBlockStyle}
            >
                {this.isList() ? this.LoaderList() : this.LoaderCustom()}
            </ContentLoader>
        );
    }
}

export default LoaderContent;
