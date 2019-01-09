/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-08 16:49:18
 */

import styled from '@common/helper/styled-component';
type WrapperProps = {
    width: number;
    height: number;
};
export const Wrapper = styled.table`
    width: ${(props: WrapperProps) => props.width}px;
    height: ${(props: WrapperProps) => props.height}px;
    text-align: center;
    table-layout: fixed;
    background: #ae184e;
    position: absolute;
    top: 20px;
    left: 20px;
    border-spacing: 0px;
`;
export const Line = styled.tr``;
type ItemProp = {
    active: boolean;
    height: number;
};
export const Item = styled.td``;
export const ContentItem = styled.div`
    flex: 1;
    &:first-child {
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    position: relative;
`;

export const Content = styled.div`
    background: ${(props: ItemProp) => (props.active ? '#f7b36c' : '#fdf29a')};
    height: ${(props: ItemProp) => props.height}px;
    width: 100%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`;

type LuckyButtonProp = {
    x: number;
    y: number;
    disable: boolean;
};
export const LuckyButton = styled.td.attrs<LuckyButtonProp>(
    (props: LuckyButtonProp) => ({
        colSpan: props.x,
        rowSpan: props.y,
    })
)`
    &:hover {
        cursor: pointer;
    }
    opacity: ${(props: LuckyButtonProp) => (props.disable ? 0.8 : 1)};

    padding: 2px;
`;
export const LuckyLabel = styled.div`
    width: 100%;
    height: 100%;
    background: #f64222;
    color: white;
    font-size: 40px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;
type ImgProp = {
    height: number;
};
export const Img = styled.img`
    height: ${(props: ImgProp) => (props.height ? props.height : 'auto')}px;
`;
export const BingoItem = styled.div`
    height: ${(props: ImgProp) => props.height}px;
    display: flex;
    flex-direction: column;
`;
