/*
 * @Author: wzi
 * @Date: 2018-02-26 16:38:07
 * @Last Modified by: wzi
 * @Last Modified time: 2018-10-01 17:30:51
 */
import URL from '@config/URL';
import Mock from 'mockjs';

if (!global.isJest) {
    // Mock.mock(URL.getURL('LOGIN'), () => {
    //     return user.userInfo();
    // }).mock(URL.getURL('GET_AUTH'), () => {
    //     return user.auth();
    // });
    Mock.mock('test', () => {
        return JSON.stringify({
            status: 1,
            data: 10,
        });
    });
}
