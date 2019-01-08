/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2018-11-30 11:25:07
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
`;
export const Line = styled.tr``;
type ItemProp = {
    active: boolean;
    height: number;
};
export const Item = styled.td`
    padding: 2px;
`;
export const ContentItem = styled.span`
    flex: 1;
    &:first-child {
        flex: 2;
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
export const Img = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
