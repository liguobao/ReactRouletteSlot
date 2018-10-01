/*
 * @Author: wzi
 * @Date: 2018-09-04 10:55:33
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-29 15:46:34
 */

import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MobileGlobalStyles, theme } from './global.style';
import { injectGlobal, ThemeProvider } from '@common/helper/styled-component';
import ROUTES, { REDIRECTS } from './routes';
import '@common/helper/Alert';
import './mock';
import Header from '@components/Header';
import BottomBar from '@components/BottomBar';
injectGlobal`${MobileGlobalStyles}`;

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Header />
                <Switch>
                    {ROUTES.map(
                        ({ component: Component, props, ...reset }, idx) => (
                            <Route
                                key={idx}
                                exact
                                {...reset}
                                render={(prop) => (
                                    <Component {...prop} {...props} />
                                )}
                            />
                        )
                    )}
                    {REDIRECTS.map((redirect, idx) => (
                        <Redirect
                            key={idx}
                            from={redirect.from}
                            to={redirect.to}
                        />
                    ))}
                </Switch>
                <BottomBar />
            </div>
        </ThemeProvider>
    );
};

export default App;
