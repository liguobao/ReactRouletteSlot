/*
 * @Author: wzi
 * @Date: 2018-07-09 16:10:04
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-18 16:02:48
 */

import { Toast } from 'antd-mobile';

export default class MobileAlert implements IAlert {
    fail(info: string, duration: number = 2, _description: string) {
        Toast.fail(info, duration);
    }
    success(info: string, duration: number = 2, _description: string) {
        Toast.success(info, duration);
    }
    info(info: string, duration: number = 2, _description: string) {
        Toast.info(info, duration);
    }
}
