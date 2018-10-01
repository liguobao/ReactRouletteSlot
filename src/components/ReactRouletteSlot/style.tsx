/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2018-10-01 12:06:53
 */

import styled from '@common/helper/styled-component';

export const Wrapper = styled.table`
    width: 100%;
    height: 400px;
    text-align: center;
    table-layout: fixed;
`;
export const Line = styled.tr``;

export const Item = styled.td`
    background: ${(props) => props.theme.green};
    border: 1px solid white;
    .active {
        border: 1px solid red;
    }
`;
type LuckyButtonProp = {
    x: number;
    y: number;
};
export const LuckyButton = styled.td.attrs<LuckyButtonProp>({
    colSpan: (props: LuckyButtonProp) => props.x,
    rowSpan: (props: LuckyButtonProp) => props.y,
})``;
