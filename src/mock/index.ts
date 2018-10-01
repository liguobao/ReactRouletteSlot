/*
 * @Author: wzi
 * @Date: 2018-02-26 16:38:07
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-30 16:33:11
 */
import URL from '@config/URL';
import Mock from 'mockjs';

import user from './user';
if (global.isJest) {
    Mock.mock(URL.getURL('LOGIN'), () => {
        return user.userInfo();
    }).mock(URL.getURL('GET_AUTH'), () => {
        return user.auth();
    });
}
