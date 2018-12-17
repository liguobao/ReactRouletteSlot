/*
 * @Author: wzi
 * @Date: 2018-09-20 16:39:07
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-20 16:39:37
 */
import { createHashHistory } from 'history';
const mockHistory = {
    location: { pathname: '' },
    paths: [],
    push: (path) => mockHistory.push(path),
};
export default (global.isJest ? mockHistory : createHashHistory());
