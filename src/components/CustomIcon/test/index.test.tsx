/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-04-25 17:19:28
 */
import React from 'react';
import CustomIcon from '@components/CustomIcon';
import { mount } from 'enzyme';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';
describe('CustomIcon', () => {
    let _props, _spies, _wrapper;
    beforeEach(() => {
        _spies = {};
        _props = {
            onClick: (_spies.onClick = jest.fn(() => {
                console.log('Icon被点击了');
            })),
            type: 'test',
            size: null,
            className: 'haha',
        };
        _wrapper = mount(<CustomIcon {..._props} />);
    });
    test('整体', () => {
        expect(toJson(_wrapper)).toMatchSnapshot();
        expect(_wrapper.find('use').prop('xlinkHref')).toBe(
            `#icon-${_props.type}`
        );
    });
    test('无 size', () => {
        expect(_wrapper).toHaveStyleRule('width', '1.5em !important');
        expect(_wrapper).toHaveStyleRule('height', '1.5em !important');
    });
    test('设置 size', () => {
        _wrapper.setProps({ size: '100px' });
        expect(_wrapper).toHaveStyleRule('width', '100px !important');
        expect(_wrapper).toHaveStyleRule('height', '100px !important');
    });
    test('设置 className', () => {
        _wrapper.setProps({ className: 'test' });
        expect(_wrapper.prop('className')).toContain('test');
    });
});
