/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-17 18:15:46
 */
import CountDown from '@components/CountDown';
import { mount } from 'enzyme';
import * as React from 'react';
import Utils from '@common/helper/Utils';
jest.useFakeTimers();
describe('CountDown', () => {
    test('不同模式 mode', () => {
        let onComplete = jest.fn(() => {
            console.log('timeOut');
        });

        const targetDate = Utils.Date.getNowDate() + 10 * 1000;
        const wrapper = mount(
            <CountDown
                timeStamp={+targetDate}
                mode="Num"
                onComplete={onComplete}
            />
        );
        // expect(onComplete).not.toBeCalled();

        expect(wrapper.text()).toEqual('00:09');
        const wrapper1 = mount(
            <CountDown
                timeStamp={+targetDate + 60 * 1000 + 60 * 1000 * 60 * 24 * 2}
                mode="Cn"
                onComplete={onComplete}
            />
        );
        expect(wrapper1.contains('2 天0 时1 分9 秒')).toBe(true);

        const wrapper2 = mount(
            <CountDown timeStamp={0} mode="Cn" onComplete={onComplete} />
        );
        expect(wrapper2.contains('截止')).toBe(true);
        const wrapper3 = mount(
            <CountDown
                timeStamp={Utils.Date.getNowDate() + 60 * 1000 * 60 * 24}
                mode="Cn"
                onComplete={onComplete}
            />
        );
        // expect(onComplete).not.toBeCalled();

        expect(
            wrapper3.contains('23 时59 分59 秒') ||
                wrapper3.contains('1 天0 时0 分0 秒')
        ).toBe(true);

        const wrapper4 = mount(
            <CountDown
                type="normal"
                timeStamp={Utils.Date.getNowDate() + 60 * 1000 * 60 * 24}
                onComplete={onComplete}
            />
        );
        expect(wrapper4.text()).toEqual('23:59:59');
        const wrapper5 = mount(
            <CountDown type="digital" timeStamp={-10} onComplete={onComplete} />
        );
        wrapper5.unmount();
        expect(onComplete).toHaveBeenCalledTimes(0);
    });
    test('定时任务', () => {
        let onComplete = jest.fn(() => {
            console.log('timeOut');
        });

        const targetDate = Utils.Date.getNowDate() + 10 * 1000;
        const wrapper = mount(
            <CountDown
                timeStamp={+targetDate}
                mode="Num"
                onComplete={onComplete}
            />
        );
        expect(['00:10', '00:09']).toContainEqual(wrapper.text());
        jest.advanceTimersByTime(1000);
        expect(wrapper.text()).not.toBe('截止');
        jest.advanceTimersByTime(10000);
        expect(wrapper.text()).toBe('截止');
        expect(onComplete).toBeCalled();
        expect(onComplete).toHaveBeenCalledTimes(1);
        // expect(wrapper.contains('00:09')).toBe(true);
    });

    test('update Props', () => {
        let onComplete = jest.fn(() => {
            console.log('timeOut');
        });

        const targetDate = Utils.Date.getNowDate() + 10 * 1000;
        const wrapper = mount(
            <CountDown
                timeStamp={+targetDate}
                mode="Num"
                onComplete={onComplete}
            />
        );
        expect(['00:10', '00:09']).toContainEqual(wrapper.text());
        // 过了1S
        jest.advanceTimersByTime(1000);
        expect(wrapper.text()).not.toBe('截止');
        // 过了10S
        jest.advanceTimersByTime(10000);
        expect(wrapper.text()).toBe('截止');
        expect(onComplete).toBeCalled();
        expect(onComplete).toHaveBeenCalledTimes(1);

        const sec20 = targetDate + 10 * 1000;
        const sec30 = targetDate + 20 * 1000;
        // 设置目标为20S
        wrapper.setProps({ timeStamp: sec20 });
        expect(wrapper.text()).not.toBe('截止');
        // 在未完成倒计时前,设置目标30S
        wrapper.setProps({ timeStamp: sec30 });
        // 过了30S
        jest.advanceTimersByTime(40000);
        expect(wrapper.text()).toBe('截止');
        expect(onComplete).toHaveBeenCalledTimes(2);
    });
});
