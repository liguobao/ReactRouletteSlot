/*
 * @Author: wzi
 * @Date: 2018-03-06 14:25:42
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-20 16:42:48
 */
import React from 'react';
import Chinese from './Chinese';
export default class Lang {
    _lang: {};
    constructor(language) {
        this._lang = language;
    }
    L = (str: string) => {
        if (typeof str !== 'string') {
            throw Error('transData type Error');
        }

        try {
            const strArray = str.split('.');
            return strArray.reduce((previous, cur, index) => {
                return index === 0
                    ? this._lang[cur]
                    : previous[cur]
                        ? previous[cur]
                        : (() => {
                              throw new Error();
                          })();
            }, 0);
        } catch (e) {
            return str;
        }
    };
    templDiv = (className: string, value: string) => {
        return (
            <span key={className} className={className}>
                {value}
            </span>
        );
    };
    /**
     * 可以获得一串字符串，字符串中字符可以修改为其他颜色
     * @param  {[string]} name      [在翻译表中的位置]
     * @param  {[string]} value     [要修改的值]
     * @param  {String} className [要强调的内容的样式名称]
     * @return {[type]}           [转化后的结果]
     */
    templ = (name: string, value: any, className = 'red') => {
        const strArray = this.L(`${name}`).split('');
        const idx = strArray.indexOf('%');
        if (idx === -1) {
            return strArray;
        }
        return [
            ...strArray.slice(0, idx),
            this.templDiv(className, value),
            ...strArray.slice(idx + 1),
        ];
    };
    /**
     * 按照 %+-的顺序替换字符串里的内容
     * @params {string} 参数1     要替换%位置的字符串
     * @params {string} 参数2     要替换+位置的字符串
     * @params {string} 参数3     要替换-位置的字符串
     * @return {string} 返回替换完成的字符串
     */
    replace = (sourceStr: string, target: string[] | number[] = []) => {
        let targetArr = [...target];
        let length = targetArr.length;
        const flags = ['%', '+', '-'];
        if (flags.length < length) {
            throw new Error(
                `replace over support length:  ${sourceStr} ${target}`
            );
        }

        return targetArr.reduce(
            (pre, _cur, idx) => pre.replace(flags[idx], targetArr[idx]),
            this.L(sourceStr)
        );
    };
}
const lang = new Lang(Chinese);
const L = lang.L;
const templ = lang.templ;
const replace = lang.replace;
export { L, templ, replace };
