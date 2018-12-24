/*
 * @Author: wzi
 * @Date: 2018-01-29 16:45:51
 * @Last Modified by: wzi
 * @Last Modified time: 2018-07-19 17:50:52
 */

import Utils from '@common/helper/utils';

describe('audioPlayer 测试', () => {
    it('audioPlayer', async () => {
        const map = {};
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
        // @ts-ignore
        window.HTMLMediaElement.prototype.play = () => {
            return new Promise((_resolve, reject) => {
                reject('1');
            });
        };
        Utils.audioPlayer('testAudio', '123', false);
        Utils.audioPlayer('testAudio');
        const target = document.querySelector('.testAudio');
        expect(!!target).toBeTruthy();
    });
});
