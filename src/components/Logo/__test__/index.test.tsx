/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-04-27 21:52:21
 */
import React from 'react';
import Logo from '@components/Logo';
import { mount } from 'enzyme';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';
describe('Logo', () => {
    let _props, _spies, _wrapper;
    beforeEach(() => {
        _spies = {};
        _props = {};
        _wrapper = mount(<Logo {..._props} />);
    });
    test('整体', () => {
        expect(toJson(_wrapper)).toMatchSnapshot();
    });
});
