/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-04-27 15:32:26
 */
import React from 'react';
import Loading from '@components/Loading';
import { mount } from 'enzyme';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';
describe('Loading', () => {
    let _wrapper;
    beforeEach(() => {
        _wrapper = mount(<Loading />);
    });
    test('整体', () => {
        expect(toJson(_wrapper)).toMatchSnapshot();
    });
});
