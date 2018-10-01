/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-04-27 22:08:09
 */
import React from 'react';
import Marquee from '@components/Marquee';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';
import {  } from '../style';
describe('UserInfo', () => {
    let _props, _spies, _wrapper;
    beforeEach(() => {
        _spies = {};
        _props = {
            content: '哈哈哈',
            type: 'pc',
            fetchUrgentNotice: (_spies.fetchUrgentNotice = jest.fn(() => {
                console.log('更新紧急公告');
            })),
        };
        _wrapper = shallow(<Marquee {..._props} />);
    });
    test('整体', () => {
        expect(toJson(_wrapper)).toMatchSnapshot();
        expect(_spies.fetchUrgentNotice).toHaveBeenCalledTimes(0);
    });
    test('无内容时, 自动发出请求', () => {
        _wrapper = shallow(<Marquee {..._props} content={''} />);
        expect(_spies.fetchUrgentNotice).toHaveBeenCalledTimes(1);
    });
});
