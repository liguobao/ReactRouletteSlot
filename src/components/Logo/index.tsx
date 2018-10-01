/*
 * @Author: wzi
 * @Date: 2018-03-05 10:34:41
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-17 18:04:11
 */
// import logo from '@assets/logo.png';
import { L } from '@config/LANG';
import React from 'react';
import styled from '@common/helper/styled-component';
import { shouldUpdate } from '@common/decorator/decorator';
// const LogoImg = styled.img.attrs({
//     src: logo,
// })`
//     width: 32px;
// `;
const WebName = styled.h1`
    color: #fff;
    font-family: Myriad Pro, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 100;
`;

const Wrapper = styled.div`
    height: 50px;
    position: relative;
    line-height: 50px;
    padding-left: 24px;
    transition: all 0.3s;
    background: ${(props) => props.theme.primary};
    overflow: hidden;
    > * {
        vertical-align: middle;
        display: inline-block;
    }
`;
@shouldUpdate({})
export default class Logo extends React.Component<{}, {}> {
    render() {
        return (
            <Wrapper>
                {/* <LogoImg /> */}
                <WebName>{L('WebName')}</WebName>
            </Wrapper>
        );
    }
}
