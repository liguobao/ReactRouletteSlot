/*
 * @Author: wzi
 * @Date: 2018-07-09 16:08:51
 * @Last Modified by: wzi
 * @Last Modified time: 2018-07-09 17:15:49
 */
import { notification } from 'antd';
export default class PCAlert implements IAlert {
    fail(info: string, duration: number = 2, description: string) {
        notification.error({
            message: info,
            duration,
            description: description,
        });
    }
    success(info: string, duration: number = 3, description: string) {
        notification.success({ message: info, duration, description });
    }
    info(info: string, duration: number = 3, description: string) {
        notification.info({
            message: info,
            duration,
            description: description,
        });
    }
}
