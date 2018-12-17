/*
 * @Author: wzi
 * @Date: 2018-03-02 10:04:09
 * @Last Modified by: wzi
 * @Last Modified time: 2018-12-05 16:49:02
 */

import { Alert } from 'antd';
import React, { SFC } from 'react';
import { lifecycle, branch, renderComponent } from 'recompose';
import { compose } from '@common/helper/compose';

type ErrorBoundaryProp = {
    error: Error;
    description?: string;
};
const ErrorBoundary: SFC<ErrorBoundaryProp> = ({ error, description }) => {
    return (
        <Alert
            style={{ margin: 20, overflow: 'hidden' }}
            showIcon
            type="error"
            message="🤣 出错了"
            description={description || error.message || error.toString()}
        />
    );
};

const errorBoundaryEnhancer = (description: string) =>
    compose(
        // @ts-ignore
        branch(({ error }) => error, renderComponent(ErrorBoundary)),
        lifecycle({
            // @ts-ignore
            componentDidCatch(error: Error) {
                this.setState({ error, description });
            },
        })
    );
export default errorBoundaryEnhancer;
