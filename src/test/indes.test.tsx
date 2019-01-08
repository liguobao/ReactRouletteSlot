/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-03-02 11:23:04
 */
import React from 'react';
import ReactRouletteSlot from '@components/ReactRouletteSlot';
import APP, { DATA, action } from '../app';
import { mount } from 'enzyme';
import '../index';
describe('APP', () => {
    test('APP', () => {
        const wrapper = mount(<APP />);
        console.log(
            wrapper.contains(
                <ReactRouletteSlot
                    data={DATA.list}
                    action={action}
                    width={300}
                    height={300}
                />
            )
        );
        expect(
            wrapper.contains(
                <ReactRouletteSlot
                    data={DATA.list}
                    action={action}
                    width={300}
                    height={300}
                />
            )
        ).toBeTruthy();
    });
});
