/*
 * @Author: wzi
 * @Date: 2018-09-13 18:21:21
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-18 15:52:06
 */

/// <reference path="./index.d.ts" />
import 'babel-polyfill';
import history from '@config/history';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app';
import store, { persistor } from '@store';

const render = (Apps: any) => {
    ReactDOM.render(
        process.env.NODE_ENV === 'development' ? (
            <AppContainer>
                <Apps />
            </AppContainer>
        ) : (
            <Apps />
        ),
        document.getElementById('app')
    );
};

const Wrapper = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </PersistGate>
    </Provider>
);

const clientRender = () => {
    // tslint:disable-next-line:variable-name
    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept(render(Wrapper));
    }
    render(Wrapper);
};

export default clientRender();
