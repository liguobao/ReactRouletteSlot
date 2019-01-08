/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-04-27 15:32:26
 */
import React from 'react';
import Border from '@components/ReactRouletteSlot/Border';
import { mount } from 'enzyme';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';
import { Ball } from '@components/ReactRouletteSlot/Border/style';
jest.useFakeTimers();
class Child extends React.Component {
    render() {
        return <div>测试子组件</div>;
    }
}
describe('Border', () => {
    test('整体', () => {
        const wrapper = mount(
            <Border row={4} col={4} isRun={false} width={300} height={300}>
                <Child />
            </Border>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.contains(<Child />)).toBeTruthy();
        expect(wrapper.find(Ball).length).toBe(36);
    });
    test('size 为3', () => {
        const wrapper = mount(
            <Border row={3} col={3} isRun={false} width={300} height={300}>
                <Child />
            </Border>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(Ball).length).toBe(28);
    });
    test('running', () => {
        const wrapper = mount(
            <Border row={3} col={3} isRun={true} width={300} height={300}>
                <Child />
            </Border>
        );

        jest.advanceTimersByTime(250);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
