/*
 * @Author: wzi
 * @Date: 2018-01-29 16:45:51
 * @Last Modified by: wzi
 * @Last Modified time: 2018-07-19 17:50:52
 */

import MobileAlert from '@common/helper/Alert/mobile';
import Utils from '@common/helper/utils';
describe('Alert 测试', () => {
    it('当设备为 Mobile 时', async () => {
        // 这里分出这个文件是 因为import同一个文件, 会放到内存中, 第二次import 的时候直接读缓存, 所以Alert 还是旧的
        Utils.isMobile('iPhone OS 11_0 ', true);
        await import('@common/helper/Alert');
        expect(window.Alert).toMatchObject(new MobileAlert());
    });
    it('测试MobileAlert 的方法', async () => {
        jest.spyOn(MobileAlert.prototype, 'success');
        jest.spyOn(MobileAlert.prototype, 'fail');
        jest.spyOn(MobileAlert.prototype, 'info');
        window.Alert.success('测试');
        window.Alert.success('测试, 2');
        expect(MobileAlert.prototype.success).toHaveBeenCalled();
        window.Alert.fail('测试');
        window.Alert.fail('测试', 2);
        expect(MobileAlert.prototype.success).toHaveBeenCalled();
        window.Alert.info('测试');
        window.Alert.info('测试', 2);
        expect(MobileAlert.prototype.success).toHaveBeenCalled();
    });
});
