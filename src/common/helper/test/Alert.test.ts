/*
 * @Author: wzi
 * @Date: 2018-01-29 16:45:51
 * @Last Modified by: wzi
 * @Last Modified time: 2018-07-19 17:50:52
 */

import PCAlert from '@common/helper/Alert/pc';

describe('Alert 测试', () => {
    it('当设备为 PC 时', async () => {
        await import('@common/helper/Alert');
        expect(window.Alert).toMatchObject(new PCAlert());
    });
    it('测试PCAlert 的方法', async () => {
        jest.spyOn(PCAlert.prototype, 'success');
        jest.spyOn(PCAlert.prototype, 'fail');
        jest.spyOn(PCAlert.prototype, 'info');
        window.Alert.success('测试');
        window.Alert.success('测试', 2);
        expect(PCAlert.prototype.success).toHaveBeenCalled();
        window.Alert.fail('测试');
        window.Alert.fail('测试', 2);
        expect(PCAlert.prototype.success).toHaveBeenCalled();
        window.Alert.info('测试');
        window.Alert.info('测试', 2);
        expect(PCAlert.prototype.success).toHaveBeenCalled();
    });
});
