/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2018-11-30 11:25:07
 */

import styled from '@common/helper/styled-component';
type WrapperProps = {
    size?: number;
};
export const Wrapper = styled.table`
    width: ${(props: WrapperProps) =>
        props.size ? props.size + 'px' : '100%'};
    height: ${(props: WrapperProps) =>
        props.size ? props.size + 'px' : '100%'};
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
};
export const Item = styled.td`
    padding: 2px;
`;
export const ContentItem = styled.span`
    flex: 1;
    &:first-child {
        flex: 2;
    }
`;

export const Content = styled.span`
    background: ${(props: ItemProp) => (props.active ? '#f7b36c' : '#fdf29a')};
    height: 100%;
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
export const LuckyButton = styled.td.attrs<LuckyButtonProp>({
    colSpan: (props: LuckyButtonProp) => props.x,
    rowSpan: (props: LuckyButtonProp) => props.y,
})`
    &:hover {
        cursor: pointer;
    }
    opacity: ${(props: LuckyButtonProp) => (props.disable ? 0.6 : 1)};

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
`;
export const Img = styled.img`
    margin-top: 20%;
`;
