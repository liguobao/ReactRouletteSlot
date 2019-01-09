/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-08 17:01:39
 */
import React from 'react';
import ReactRouletteSlot from '@components/ReactRouletteSlot';
import APP, { data, action } from '../app';
import { mount } from 'enzyme';
import '../index';
jest.useFakeTimers();
describe('APP', () => {
    test('APP', () => {
        const wrapper = mount(<APP />);

        expect(
            wrapper.contains(
                <ReactRouletteSlot
                    data={data}
                    action={action}
                    width={300}
                    height={300}
                />
            )
        ).toBeTruthy();

    });
});
