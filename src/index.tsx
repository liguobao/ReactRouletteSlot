/*
 * @Author: wzi
 * @Date: 2018-09-13 18:21:21
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-07 16:55:35
 */

/// <reference path="./index.d.ts" />
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

const render = (Apps: any) => {
    ReactDOM.render(
        process.env.NODE_ENV === 'development' ? (
            <AppContainer>
                <Apps />
            </AppContainer>
        ) : (
            <Apps />
        ),
        document.getElementById('app') || document.createElement('div')
    );
};

const Wrapper = () => <App />;

const clientRender = () => {
    // tslint:disable-next-line:variable-name
    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept(render(Wrapper));
    }
    render(Wrapper);
};

export default clientRender();
