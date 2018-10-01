/*
 * @Author: wzi
 * @Date: 2018-03-02 10:04:09
 * @Last Modified by: wzi
 * @Last Modified time: 2018-04-25 15:56:27
 */

import ErrorBoundary from '@common/decorator/errorBoundaryDecorator';
import React from 'react';
import styled from '@common/helper/styled-component';
import ReactLoading from 'react-loading';
const width = 80;
const height = 40;
const Wrapper = styled.div`
    position: fixed;
    top: calc(50% - ${height / 2}px);
    left: calc(50% - ${width / 2}px);
    width: ${width}px;
    height: ${height}px;
`;
type LoadProps = {};
type LoadState = {};
@ErrorBoundary('Loading 加载失败')
export default class Load extends React.PureComponent<LoadProps, LoadState> {
    render() {
        return (
            <Wrapper>
                <ReactLoading
                    type="bars"
                    height={height}
                    width={width}
                    color="#ed6c44"
                />
            </Wrapper>
        );
    }
}
