/*
 * @Author: wzi
 * @Date: 2018-04-27 15:13:11
 * @Last Modified by: wzi
 * @Last Modified time: 2018-04-27 22:15:33
 */

import {
    Notice,
    Label,
    Horn,
    MalarqueeWrapper,
    MarqueeWrapper,
} from '../style';
import React from 'react';
import { render, shallow } from 'enzyme';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';
describe('Malarquee style', () => {
    test('Notice', () => {
        const wrapper = render(<Notice />);
        expect(wrapper).toMatchSnapshot();
    });
    test('Label', () => {
        const wrapper = shallow(<Label type="pc" />);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper).toHaveStyleRule('width', '8%');

        wrapper.setProps({ type: 'mobile' });
        expect(wrapper).toHaveStyleRule('width', '17%');
    });
    test('Horn', () => {
        const wrapper = render(<Horn type="pc" />);
        expect(wrapper).toMatchSnapshot();
    });
    test('MalarqueeWrapper', () => {
        const wrapper = shallow(<MalarqueeWrapper type="pc" />);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper).toHaveStyleRule('width', '90%');

        wrapper.setProps({ type: 'mobile' });
        expect(wrapper).toHaveStyleRule('width', '80%');
    });
    test('MarqueeWrapper', () => {
        const wrapper = render(<MarqueeWrapper />);
        expect(wrapper).toMatchSnapshot();
    });
});
