/*
 * @Author: wzi
 * @Date: 2018-01-29 16:45:51
 * @Last Modified by: wzi
 * @Last Modified time: 2018-07-19 17:50:52
 */
import Utils from '@common/helper/utils';
import history from '@config/history';

describe('Util测试', () => {
    it('getLocalTime', async () => {
        const d = new Date();
        const offset = d.getTimezoneOffset() * 60000;
        const result = +Utils.Date.getLocalTime(8);
        const now = Utils.Date.getNowDate();
        expect(offset + now - result < 500).toBe(true);
    });

    it('String.zeroFill', async () => {
        const result = Utils.String.zeroFill('12', 5);
        expect(result).toBe('00012');

        const result1 = Utils.String.zeroFill('12345', 1);
        expect(result1).toBe('12345');

        const result2 = Utils.String.zeroFill('a', 1);
        expect(result2).toBe('a');

        const result3 = Utils.String.zeroFill('1');
        expect(result3).toBe('01');

        const result4 = Utils.String.zeroFill('1', 100);
        expect(result4).toBe('1');
    });
    it('String.getQueryString', async () => {
        const result = Utils.String.getQueryString(
            'playName=MARKSIX',
            'playName'
        );
        expect(result).toEqual('MARKSIX');
    });

    it('msToTime', async () => {
        const result = Utils.Date.msToTime(12);
        expect(result).toEqual({
            day: 0,
            hours: 0,
            mins: 0,
            sec: 0,
        });

        const result1 = Utils.Date.msToTime(12000);
        expect(result1).toEqual({
            day: 0,
            hours: 0,
            mins: 0,
            sec: 12,
        });

        const result2 = Utils.Date.msToTime(
            12000 + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 2
        );
        expect(result2).toEqual({
            day: 2,
            hours: 0,
            mins: 2,
            sec: 12,
        });
    });

    it('String.formatAmount', async () => {
        const result = Utils.String.formatAmount(1200);
        expect(result).toEqual('12.00');
    });

    it('String.formatAmount', async () => {
        const result = Utils.Date.formatDate(1520998978253);
        expect(result).toContain('2018-03-14 11:42');
        // @ts-ignore
        const result1 = Utils.Date.formatDate(undefined);
        expect(result1).toContain('1970-01-01 08:00');
    });

    it('sliceStrByNum', async () => {
        let result = Utils.String.sliceStrByNum('123456', 2);
        expect(result).toMatchObject(
            expect.arrayContaining(['12', '34', '56'])
        );

        result = Utils.String.sliceStrByNum('123456', 1);
        expect(result).toMatchObject(
            expect.arrayContaining(['1', '2', '3', '4', '5', '6'])
        );

        result = Utils.String.sliceStrByNum('123456', 7);
        expect(result).toMatchObject(expect.arrayContaining(['123456']));

        result = Utils.String.sliceStrByNum('123456', -1);
        expect(result).toMatchObject(expect.arrayContaining(['123456']));
    });

    it('String.getQueryString', async () => {
        let result = Utils.String.getQueryString('playName=123456', 'playName');
        expect(result).toBe('123456');
        result = Utils.String.getQueryString('playName=123456', 'haha');
        expect(result).toBe(null);
    });

    it('isObj', async () => {
        let result = Utils.Object.isObj({});
        expect(result).toBeTruthy();
        // @ts-ignore
        let result1 = Utils.Object.isObj('');
        expect(result1).not.toBeTruthy();
    });

    it('Object.isEmpty', async () => {
        let result = Utils.Object.isEmpty({});
        expect(result).toBeTruthy();
        let result1 = Utils.Object.isEmpty({ a: 123 });
        expect(result1).not.toBeTruthy();
        // @ts-ignore
        let result2 = Utils.Object.isEmpty(123);
        expect(result2).not.toBeTruthy();
    });

    it('count', async () => {
        let result = Utils.Object.count({});
        expect(result).toBe(0);
        // @ts-ignore
        let result1 = Utils.Object.count(123);
        expect(result1).toBe(0);
    });

    it('random', async () => {
        // @ts-ignore
        let result = Utils.String.random({}, 2);
        expect(result).toBe(0);
        let result1 = Utils.String.random(-1, 2);
        expect(result1 >= -1).toBeTruthy();
        expect(result1 <= 2).toBeTruthy();
    });

    it('propEq', async () => {
        const test = [{ test: 123 }, { test: 1 }];
        let result = test.find(Utils.Object.propEq('test', 1));
        expect(result).toEqual({ test: 1 });
        let result1 = test.find(Utils.Object.propEq('test', 12222));
        expect(result1).toEqual(undefined);

        let result2 = test.filter(Utils.Object.propEq('test', 1));
        expect(result2).toEqual([{ test: 1 }]);
    });
    it('prop 筛选某个属性', async () => {
        const test = [{ test: 123 }, { test: 1 }];
        let result = test.map(Utils.Object.prop('test'));
        expect(result).toEqual([123, 1]);

        let result1 = test.map(Utils.Object.prop('test1'));
        expect(result1).toEqual([null, null]);
    });
    it('formatMoney 格式化金额', async () => {
        const test = 123;
        let result = Utils.String.formatMoney(test);
        expect(result).toEqual('¥ 123');

        const test1 = 12345;
        let result1 = Utils.String.formatMoney(test1);
        expect(result1).toEqual('¥ 12,345');
        const test2 = 12345;
        let result2 = Utils.String.formatMoney(test2, '');
        expect(result2).toEqual('12,345');
    });
    it('getDate 获得日期', async () => {
        const test = '2018-04-26';
        let result = Utils.Date.getDate(+new Date(test));
        expect(result).toEqual(test);
    });
    it('locationHandler 处理路由', async () => {
        let result = Utils.String.locationHandler(-2, '/test/haha');
        expect(result).toEqual('test');

        let result1 = Utils.String.locationHandler(-1, 'hahahaha');
        expect(result1).toEqual('hahahaha');

        let result2 = Utils.String.locationHandler(-1, '/test/hahahaha');
        expect(result2).toEqual('hahahaha');
        let result4 = Utils.String.locationHandler(0, '/test/hahahaha');
        expect(result4).toEqual('test');

        let result3 = Utils.String.locationHandler(-1);
        expect(result3).toEqual('');
    });

    it('LocalStorageHelper', async () => {
        Utils.LocalStorage.setStorage('test', 'value');
        let result = Utils.LocalStorage.getStorage('test');
        expect(result).toBe('value');
    });

    it('LocalStorageHelper 异常测试', async () => {
        const target = { haha: 1 };
        // @ts-ignore
        localStorage.setItem('test1', target);
        let result = Utils.LocalStorage.getStorage('test1');
        expect(result).toBe('[object Object]');
    });

    it('formatBankNum 格式化银行卡', async () => {
        const target = '123412341234123';
        let result = Utils.String.formatBankNum(target);
        expect(result).toBe('1234 1234 1234 123');
        const target1 = '123';
        let result1 = Utils.String.formatBankNum(target1);
        expect(result1).toBe('123');
    });
    it('formatBankNum 格式化手机号码', async () => {
        const target = '13859999777';
        let result = Utils.String.formatPhone(target);
        expect(result).toBe('138 5999 9777');
        const target1 = '123';
        let result1 = Utils.String.formatPhone(target1);
        expect(result1).toBe('123');
    });
    it('trimBlank 去空格', async () => {
        const target = '138 5999 9777';
        let result = Utils.String.trimBlank(target);
        expect(result).toBe('13859999777');
        const target1 = '123';
        let result1 = Utils.String.trimBlank(target1);
        expect(result1).toBe('123');
    });
    it('trimStar 去星号*', async () => {
        const target = '*******123';
        let result = Utils.String.trimStar(target);
        expect(result).toBe('123');
        const target1 = '123';
        let result1 = Utils.String.trimStar(target1);
        expect(result1).toBe('123');
    });
    it('joinChar 插入字符', async () => {
        let result = Utils.String.joinChar(',', ['12', '34']);
        expect(result).toBe('12,34');
    });
    it('getCnCount 获得中文字符的个数', async () => {
        expect(Utils.String.getCnCount('123')).toBe(0);
        expect(Utils.String.getCnCount('测试')).toBe(2);
        expect(Utils.String.getCnCount('测试12312')).toBe(2);
        expect(Utils.String.getCnCount('hahaha测试12312')).toBe(2);
    });

    it('valuesHandler 提交数据统一处理方法', async () => {
        const target = {
            test: '123 12',
            phone: '123 456',
            amount: '100',
            money: '100',
            location: ['测试省', '测试市'],
            testLocation: ['测试1', '测试2'],
        };
        let result0 = Utils.String.valuesHandler({});
        expect(result0).toMatchObject({});
        let result = Utils.String.valuesHandler({ ...target }, ['test']);
        expect(result.test).toBe('12312');
        let result1 = Utils.String.valuesHandler({ ...target });
        expect(result1.phone).toBe('123456');
        expect(result1.amount).toBe(10000);
        expect(result1.location).toBe('测试省,测试市');
        let result2 = Utils.String.valuesHandler({ ...target }, undefined, [
            'testLocation',
        ]);
        expect(result2).toMatchObject({
            test: '123 12',
            phone: '123456',
            amount: 10000,
            money: '100',
            location: ['测试省', '测试市'],
            testLocation: '测试1,测试2',
        });
        let result3 = Utils.String.valuesHandler(
            { ...target },
            undefined,
            undefined,
            ['money']
        );
        expect(result3).toMatchObject({
            test: '123 12',
            phone: '123456',
            amount: '100',
            money: 10000,
            location: '测试省,测试市',
            testLocation: ['测试1', '测试2'],
        });
    });

    it('Route 路由', async () => {
        Utils.Route.goBack();
        expect(history.paths.length).toBe(0);
        Utils.Route.goRoute('test1');
        expect(history.paths[history.paths.length - 1]).toBe('test1');
        window.Alert = {
            fail: jest.fn(
                (_info: string, _duration?: number, _description?: string) =>
                    console.log('fail')
            ),
            success: (
                _info: string,
                _duration?: number,
                _description?: string
            ) => console.log('fail'),
            info: (_info: string, _duration?: number, _description?: string) =>
                console.log('info'),
        };
        Utils.Route.noLogin();
        expect(history.paths[history.paths.length - 1]).toBe('/login');
        expect(window.Alert.info.call.length).toBe(1);
    });
    it('judge 判断是否是手机', async () => {
        expect(Utils.judge()).toBeFalsy();
        expect(Utils.judge('iPhone OS 11_0 ')).toBeTruthy();
    });
    it('isMobile 判断是否是手机', async () => {
        expect(Utils.isMobile()).toBeFalsy();
        expect(Utils.isMobile('iPhone OS 11_0 ')).toBeFalsy();
        expect(Utils.isMobile('iPhone OS 11_0 ', true)).toBeTruthy();
    });
});
