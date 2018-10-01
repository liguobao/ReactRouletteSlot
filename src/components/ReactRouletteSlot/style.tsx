/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2018-10-01 16:54:28
 */

import styled from '@common/helper/styled-component';

export const Wrapper = styled.table`
    width: 100%;
    height: 400px;
    text-align: center;
    table-layout: fixed;
`;
export const Line = styled.tr``;
type ItemProp = {
    active: boolean;
};
export const Item = styled.td`
    border: 1px solid #e8dede;
    background: green;
    border-right: 1px solid #d4d8da;
    border-bottom: 1px solid #d4d8da;
    padding: 5px;
    box-shadow: ${(props: ItemProp) =>
        props.active ? 'rgb(235, 207, 11) 0px 0px 10px 6px inset' : ''};
`;

export const Content = styled.span`
    height: 100%;
    background: ${(props) => props.theme.green};
`;

type LuckyButtonProp = {
    x: number;
    y: number;
};
export const LuckyButton = styled.td.attrs<LuckyButtonProp>({
    colSpan: (props: LuckyButtonProp) => props.x,
    rowSpan: (props: LuckyButtonProp) => props.y,
})`
    &:hover {
        cursor: pointer;
    }
`;
