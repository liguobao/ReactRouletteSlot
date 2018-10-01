/*
 * @Author: wzi
 * @Date: 2018-01-30 15:53:16
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-17 18:01:45
 */
import React from 'react';
import { L, templ, replace } from '@config/Lang';
import { mount } from 'enzyme';
describe('Lang config', () => {
    test('L', () => {
        expect(L('Trade.nextTrade')).toBe('下期:');
        expect(L('Trade.nextTrade1')).toBe('Trade.nextTrade1');
        expect(L('Trade1.nextTrade1')).toBe('Trade1.nextTrade1');
        expect(() => {
            // @ts-ignore
            L({});
        }).toThrow('transData type Error');
    });

    test('templ', () => {
        const result = templ('Trade.termCode', 123, 'yellow');
        const comp = mount(<div>{result}</div>);
        expect(comp.html()).toBe(
            `<div>第<span class="yellow">123</span>期</div>`
        );

        const result1 = templ('Trade.termCode', 123);
        const comp1 = mount(<div>{result1}</div>);
        expect(comp1.html()).toBe(
            `<div>第<span class="red">123</span>期</div>`
        );

        const result2 = templ('Trade.nextTrade', 223);
        expect(result2).toEqual(['下', '期', ':']);
    });

    test('replace', () => {
        const result = replace('Trade.termCode', [123]);
        expect(result).toBe('第123期');

        const result1 = replace('Trade.termCode');
        expect(result1).toBe('第%期');

        expect(() => {
            replace('Trade.termCode', [123, 4, 5, 6]);
        }).toThrow('replace over support length:  Trade.termCode 123,4,5,6');

        expect(replace('Trade.termCode1', [123])).toBe('Trade.termCode1');
    });
});
