/*
 * @Author: wzi
 * @Date: 2018-09-04 10:55:33
 * @Last Modified by: wzi
 * @Last Modified time: 2018-10-01 10:57:39
 */

import * as React from 'react';

import { MobileGlobalStyles, theme } from './global.style';
import { injectGlobal, ThemeProvider } from '@common/helper/styled-component';
import '@common/helper/Alert';
import rouletteSlotData from './mock/RRS';
import ReactRouletteSlot from '@components/ReactRouletteSlot';
injectGlobal`${MobileGlobalStyles}`;
const DATA = rouletteSlotData.rouletteSlotData();
const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <ReactRouletteSlot data={DATA.list} />
        </ThemeProvider>
    );
};

export default App;
