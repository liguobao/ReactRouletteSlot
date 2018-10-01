/*
 * @Author: wzi
 * @Date: 2018-01-30 15:53:16
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-17 18:01:46
 */
import URL from '@config/URL';
const dn = '/shop/';
describe('URL config', () => {
    test('getURL', () => {
        expect(URL.getURL('TESTURL')).toBe(`${dn}%/+/-`);
    });

    test('replaceURL', () => {
        expect(URL.replaceURL('TESTURL', ['1', '2', '3'])).toBe(`${dn}1/2/3`);
        expect(URL.replaceURL('TESTURL', '1')).toBe(`${dn}1/+/-`);
        expect(URL.replaceURL('TESTURL')).toBe(`${dn}%/+/-`);
        expect(() => URL.replaceURL('TESTURL', ['1', '2', '3', '4'])).toThrowError(
            'replace over support length: TESTURL, 1,2,3,4'
        );
    });
});
