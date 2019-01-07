/*
 * @Author: wzi
 * @Date: 2018-09-04 10:55:33
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-07 17:57:02
 */

import * as React from 'react';

import { MobileGlobalStyles, theme } from './global.style';
import { createGlobalStyle, ThemeProvider } from '@common/helper/styled-component';
import '@common/helper/Alert';
import rouletteSlotData from './mock/RRS';
import ReactRouletteSlot from '@components/ReactRouletteSlot';
createGlobalStyle`${MobileGlobalStyles}`;
const DATA = rouletteSlotData.rouletteSlotData();
const action = (cb) => {
    cb({ data: 1010 });
};
const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    margin: '10px auto',
                }}
            >
                <ReactRouletteSlot
                    data={DATA.list}
                    action={action}
                    size={300}
                />
            </div>
        </ThemeProvider>
    );
};

export default App;
export { DATA, action };
