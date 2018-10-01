/*
 * @Author: wzi
 * @Date: 2018-02-27 10:39:46
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-30 16:43:28
 */
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
const dn = '/dev';
const prod = 'essmweb/';
const URL_CONFIG = {
    LOGIN: '/site/login',
    LOGOUT: '/site/logout',
    AUTH: '/user/auth/setRealName',
    REGISTER: '/site/reg',
    FORGET: '/user/forgetPassWord',
    WITHDRAWAL: '/user/auth/withdrawal',
    UPDATE_PASSWORD: '/user/auth/setUserPwd',
    UPDATE_HEAD_PIC: '/user/auth/setUserHeadImg',
    UPDATE_PHONE: '/user/auth/setUserPhone',
    UPDATE_ADDRESS: '/user/auth/setUserShipSite',
    UPDATE_BANKCARD: '/user/auth/setUserBank',
    GET_AUTH: '/user/auth/getRealName',
    GET_CASH_MALL_LIST: '/mallSite/findCashGoods',
    GET_VCODE: '/site/getPhoneCode',
    GET_ADDRESS: '/user/auth/findUserShipSite',
    GET_BANKCARD: '/user/auth/findUserBank',
    DELETE_ADDRESS: '/user/auth/deleteUserShipSite',
    DEFAULT_ADDRESS: '/user/auth/setUserShipSiteSort',
    DELETE_BANKCARD: '/user/auth/deleteUserBank',
    DEFAULT_BANKCARD: '/user/auth/setUserBankSort',
};
// 需要自己处理错误的请求
const WHITE_LIST = ['USER'];
type URLType = keyof typeof URL_CONFIG;
const SUCCESS_INFO = {
    LOGIN: '登录成功!',
    LOGOUT: '登出成功!',
    AUTH: '实名认证成功!',
    GET_VCODE: '短信发送成功, 请注意查收!',
    REGISTER: '注册成功! 自动登录中...',
    FORGET: '找回密码成功, 请用新密码重新登录!',
    WITHDRAWAL: '提现请求发起成功!',
    UPDATE_HEAD_PIC: '上传成功!',
    UPDATE_PASSWORD: '密码修改成功!',
    UPDATE_PHONE: '手机换绑成功!',
    UPDATE_ADDRESS: '地址更新成功!',
    DELETE_ADDRESS: '地址删除成功!',
    DEFAULT_ADDRESS: '默认地址设置成功!',
    UPDATE_BANKCARD: '银行卡更新成功!',
    DELETE_BANKCARD: '银行卡删除成功!',
    DEFAULT_BANKCARD: '默认银行卡设置成功!',
};
const UPLOAD = '//www.zlcbet.com:8080/websocket/file/file/receiveFile';
export default class URLManager {
    /**
     * 获得 targetStr 对应的地址
     * ts 对输入参数做了限制
     * @param {URLType} targetStr
     * @returns {string} 返货地址
     * @memberof URLManager
     */
    static getURL = (targetStr: URLType): string => {
        const url = `${URLManager.getDomain()}${URL_CONFIG[targetStr]}`;
        return url;
    };

    /**
     * 替换目标字符串中的%/+/-符号为指定的字符串
     *
     * @param {URLType}   targetStr 目标字符串
     * @param {string[]} [replaceValues=[]] 需要被替换的字符串
     * @returns {string} 返回替换后的地址
     * @memberof URLManager
     */
    static replaceURL = (
        targetStr: URLType,
        replaceValues: string[] | string = []
    ): string => {
        let targetArr = [];
        replaceValues instanceof Array
            ? (targetArr = targetArr.concat(replaceValues))
            : targetArr.push(replaceValues);
        const length = targetArr.length;
        const flags = ['%', '+', '-'];

        if (flags.length < length || length < 0) {
            throw Error(
                `replace over support length: ${targetStr}, ${replaceValues}`
            );
        }
        return `${targetArr.reduce(
            (pre: string, _cur: string, idx: number) =>
                pre.replace(flags[idx], targetArr[idx]),
            `${URLManager.getDomain()}${URL_CONFIG[targetStr]}`
        )}`;
    };
    /**
     * 根据环境判断返回开发地址或者线上地址
     *
     * @returns {string}
     * @memberof URLManager
     */
    static getDomain = (): string => {
        return process.env.NODE_ENV !== 'production' ? dn : prod;
    };

    static request = (url: URLType, body: Object = {}) => {
        return ajax
            .post(URLManager.getURL(url), JSON.stringify(body), {
                responseType: 'json',
                'Content-Type': 'application/json',
            })
            .pipe(
                catchError((e) => {
                    console.log(e);
                    return of({ status: 0, msg: '未知异常!' });
                }),
                map((response) => URLManager.responseHandler(response, url))
            );
    };
    static responseHandler(json: any, url) {
        json = json.response || json;
        const aJson: GlobalType.Respond =
            typeof json === 'string' ? JSON.parse(json) : json;
        if (aJson.status === 1) {
            URLManager.successCb(url);
            return aJson.data;
        }
        if (WHITE_LIST.indexOf(url) === -1) {
            window.Alert.fail(aJson.msg);
        }
        throw Error(aJson.msg);
    }
    static successCb = (url: URLType) => {
        SUCCESS_INFO[url] && window.Alert.success(SUCCESS_INFO[url]);
    };
    static getUpload = () => UPLOAD;
}
