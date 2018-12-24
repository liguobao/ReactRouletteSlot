/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-04-27 15:32:26
 */
import React from 'react';
import { ReactRouletteSlot } from '@components/ReactRouletteSlot';
import '@common/helper/Alert';
import { mount } from 'enzyme';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';
const data = [
    { id: 1000, img: 'http://dummyimage.com/30x30', label: 'Larry' },
    { id: 1001, img: 'http://dummyimage.com/30x30', label: 'Joseph' },
    { id: 1003, img: 'http://dummyimage.com/30x30', label: 'Paul' },
    { id: 1004, img: 'http://dummyimage.com/30x30', label: 'Ronald' },
    { id: 1005, img: 'http://dummyimage.com/30x30', label: 'Helen' },
    { id: 1006, img: 'http://dummyimage.com/30x30', label: 'Maria' },
    { id: 1007, img: 'http://dummyimage.com/30x30', label: 'Mark' },
    { id: 1008, img: 'http://dummyimage.com/30x30', label: 'Mark' },
    { id: 1009, img: 'http://dummyimage.com/30x30', label: 'Carol' },
    { id: 1010, img: 'http://dummyimage.com/30x30', label: 'Ronald' },
    { id: 1011, img: 'http://dummyimage.com/30x30', label: 'Nancy' },
    { id: 1012, img: 'http://dummyimage.com/30x30', label: 'Michelle' },
];
jest.useFakeTimers();

describe('Loading', () => {
    let _wrapper;
    beforeAll(() => {
        const action = (cb) => {
            cb({ data: 1011 });
        };

        _wrapper = mount(<ReactRouletteSlot data={data} action={action} />);
    });
    test('整体', () => {
        expect(toJson(_wrapper)).toMatchSnapshot();
    });
    test('点击抽奖', () => {
        const instance = _wrapper.instance();
        instance.onClick();
        jest.advanceTimersByTime(20000);
    });
});
