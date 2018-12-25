/*
 * @Author: wzi
 * @Date: 2018-01-29 16:55:49
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-30 16:27:22
 * 该文件用于记录与业务相关的通用代码
 */
import history from '@config/history';

let _isMobile: boolean = null;
const audio = {};
const NEED_TRIM = ['phone', 'bankNum', 'lastPhone'];
const NEED_JOIN = ['location', 'bankName', 'id'];
const MONEY = ['amount'];
const JOIN_CHAR = {
    location: ',',
    bankName: '',
};
type FormValuesObject = {
    [key: string]: string | string[] | number;
};
type DateValue = {
    day: number;
    hours: number;
    mins: number;
    sec: number;
};
class DateHelper {
    /**
     * @returns 当前时间戳
     */
    static getNowDate = () => +DateHelper.getLocalTime(8);

    /**
     * 参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
     * @param {number} i: 时区
     * @return {Date} 获取某个时区的当前时间
     */
    static getLocalTime = (i: number): Date => {
        const d = new Date();
        // 得到1970年一月一日到现在的秒数
        const len = d.getTime();
        // 本地时间与GMT时间的时间偏移差
        const offset = d.getTimezoneOffset() * 60000;
        // 得到现在的格林尼治时间
        const utcTime = len + offset;
        return new Date(utcTime + 3600000 * i);
    };
    /**
     * 将毫秒转化成 时间
     * @param  {number} ms [毫秒]
     * @return {DateValue}    [含有天数,小时,分钟,秒钟数据的对象]
     */
    static msToTime = (ms: number): DateValue => {
        let second = parseInt(`${ms / 1000}`, 10),
            day = parseInt(`${second / (60 * 60 * 24)}`, 10),
            hours = parseInt(
                `${(second - 60 * 60 * 24 * day) / (60 * 60)}`,
                10
            ),
            mins = parseInt(
                `${(second - 60 * 60 * 24 * day - 60 * 60 * hours) / 60}`,
                10
            ),
            sec = second % 60;
        return {
            day,
            hours,
            mins,
            sec,
        };
    };
    /**
     * 获得时间戳对应的日期
     * @param {number}  value   [时间戳]
     * @returns {string}        [日期字符串]
     */
    static getDate(value: number): string {
        return DateHelper.formatDate(value).slice(0, 10);
    }
    /**
     * 格式化日期, 固定为东八区的时间格式
     * @param value 时间戳
     */
    static formatDate(value: number) {
        const timeZone = 8 * 60 * 60 * 1000;
        const targetValue = isNaN(value) ? null : value;
        const offset = new Date().getTimezoneOffset() * 60000;
        let date = new Date(targetValue + timeZone + offset),
            month = date.getMonth() + 1,
            d = date.getDate(),
            hours = date.getHours(),
            year = date.getFullYear(),
            minutes = date.getMinutes();
        console.log(date);
        return `${year}-${Utils.String.zeroFill(
            `${month}`
        )}-${Utils.String.zeroFill(`${d}`)} ${Utils.String.zeroFill(
            `${hours}`
        )}:${Utils.String.zeroFill(`${minutes}`)}`;
    }
}
class LocalStorageHelper {
    static getStorage(name) {
        const target = localStorage.getItem(name);
        let item = null;
        try {
            item = JSON.parse(target);
        } catch (error) {
            item = target;
        }

        return item;
    }

    /**
     * set Storage
     */
    static setStorage(name, data) {
        try {
            return localStorage.setItem(name, JSON.stringify(data));
        } catch (e) {
            alert('请关闭隐身模式/无痕浏览模式');
        }
    }
}
class ObjectHelper {
    /**
     * 判断是否是对象
     * @param  {object}  obj [需要判断的对象]
     * @return {Boolean}     [true为是对象]
     */
    static isObj(obj: any): boolean {
        return typeof obj === 'object' && !(obj instanceof Array);
    }
    /**
     *
     * @param obj 对象
     */
    static isEmpty(obj: object) {
        if (ObjectHelper.isObj(obj)) {
            return ObjectHelper.count(obj) === 0 ? true : false;
        }
        return false;
    }

    /**
     * 计算属性个数
     * @param  {object} obj [需要计算的对象]
     * @return {number}     [属性个数]
     */
    static count(obj: object): number {
        if (ObjectHelper.isObj(obj)) {
            let hasProp = false,
                count = 0;
            for (let _prop in obj) {
                hasProp = true;
                count++;
            }
            return hasProp ? count : 0;
        }
        return 0;
    }
    /**
     * 判断属性值是否等于目标值
     * @param prop 属性名
     * @param value 目标值
     */
    static propEq(prop: string, value: any) {
        return (obj: object) => {
            return obj && obj[prop] === value;
        };
    }
    /**
     * 获取属性值
     * @param key 要获取得属性值
     */
    static prop(key: string) {
        return (obj: object) => {
            return obj && obj[key] ? obj[key] : null;
        };
    }
}
class StringHelper {
    /**
     * 补0
     * @param  {string} num  [要操作的源值]
     * @param  {Number} size [位数]
     * @return {string}      [返回补0后的字符串]
     */
    static zeroFill = (num: string, size: number = 2): string => {
        let reg = /[^\d]/;
        if (+num < 0 || reg.test(num)) {
            return num;
        }

        if (reg.test(num) || `${num}`.length > size) {
            return num;
        }

        const s = `00000000${num}`;

        if (s.length < size) {
            return num;
        }
        return s.substr(s.length - size);
    };

    /**
     * 格式化金额 123 -> 1.23
     * @param {string|number} value [需要格式化的数值]
     * @returns {string}            [格式化后的金额]
     */
    static formatAmount(value: number | string): string {
        return value && Number(+value / 100).toFixed(2);
    }
    /**
     * 为金额添加逗号和前缀
     * @param value 金额
     * @param prefix 前缀,默认为¥
     */
    static formatMoney(value: number | string, prefix = '¥ ') {
        return `${prefix}${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    /**
     * 每length 位切割字符串
     * @param {string} str [需要切割的字符串]
     * @param {number} length [长度]
     */
    static sliceStrByNum(str: string, length: number) {
        if (length < 1) {
            return [str];
        }
        let re = new RegExp(`\[0-9*]{1,${length}}`, 'g');
        return str.match(re);
    }
    /**
     * 格式化银行卡, 每4位插入一个空格
     */
    static formatBankNum = (num: string) =>
        Utils.String.sliceStrByNum(num, 4).join(' ');

    /**
     * 格式化手机号码, *** **** ****
     */
    static formatPhone = (num: string) => {
        if (num.length !== 11) {
            return num;
        }
        const phones: string[] = [];
        phones[0] = num.slice(0, 3);
        const phoneTemp: string[] = Utils.String.sliceStrByNum(`0${num}`, 4);
        phones[1] = phoneTemp[1];
        phones[2] = phoneTemp[2];
        return phones.join(' ');
    };

    /**
     * 对特定的属性的值去空格
     */
    static trimBlank = (value: string) => value.replace(/\ +/g, '');
    // 去星号
    static trimStar = (value: string) => value.replace(/\*+/g, '');
    // 插入字符
    static joinChar = (char: string, value: string[]) => value.join(char);

    /**
     * 提交数据统一处理方法
     * @param values 需要处理的数据
     * @param needTrim 需要去空格
     * @param needJoin 需要插入字符
     * @param money 表示金额的字段 需要乘以100
     */
    static valuesHandler(
        values: FormValuesObject,
        needTrim: string[] = NEED_TRIM,
        needJoin: string[] = NEED_JOIN,
        money: string[] = MONEY
    ) {
        for (const key in values) {
            if (needJoin.indexOf(key) !== -1 && values[key] instanceof Array) {
                values[key] = Utils.String.joinChar(JOIN_CHAR[key], values[
                    key
                ] as string[]);
            } else if (needTrim.indexOf(key) !== -1) {
                values[key] = Utils.String.trimBlank(values[key] as string);
            } else if (money.indexOf(key) !== -1) {
                values[key] = +values[key] * 100;
            }
        }

        return values;
    }

    /**
     * 从地址中获得某个参数的值
     * @param {string} url [需要解析的地址]
     * @param {string} name [需要从地址中获得的参数名称]
     * @returns {string} [参数的值]
     */
    static getQueryString(url: string, name: string): string {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        const r = url.match(reg);
        if (r !== null) {
            return unescape(r[2]);
        }
        return null;
    }

    /**
     * 获得随机数
     * @param under 随机数上限
     * @param over 随机数下限
     */
    static random(under: number, over: number) {
        if (isNaN(under) || isNaN(over)) {
            return 0;
        }
        return parseInt(`${Math.random() * (over - under + 1) + under}`, 10);
    }
    /**
     * 取得地址中倒数第 index 个 / 中的参数
     * @param idx 第几个/
     * @param pathname 路径名称
     */
    static locationHandler(
        idx: number,
        pathname: string = history.location.pathname
    ) {
        if (!pathname.match(/^\//)) {
            return pathname;
        }
        let pathArray = pathname.slice(1).split('/');

        let result = null;
        if (idx < 0) {
            result = pathArray[pathArray.length + idx];
        } else {
            result = pathArray[idx];
        }

        return result;
    }
    /**
     * 获得中文字符的个数
     */
    static getCnCount = (cns: string) => {
        const result = cns.match(/[\u4e00-\u9fa5]/gm);
        return result ? result.length : 0;
    };
}
class RouteHelper {
    static noLogin() {
        window.Alert.info('您还没有登录哦~');
        Utils.Route.goRoute('/login');
        return null;
    }
    static goRoute(url: string) {
        history.push(url);
    }
    static goBack() {
        history.goBack();
    }
}
class Utils {
    static Date = DateHelper;
    static Object = ObjectHelper;
    static String = StringHelper;
    static LocalStorage = LocalStorageHelper;
    static Route = RouteHelper;
    /**
     * 判断是否是手机
     * @returns {boolean} 是否是手机
     * @memberof Utils
     */
    static judge(ua = navigator.userAgent): boolean {
        const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        const isAndroid = ua.match(/(Android)\s+([\d.]+)/);

        return !!isIphone || !!isAndroid;
    }

    /**
     * 判断是否是手机
     * @returns {boolean} 是否手机
     * @memberof Utils
     */
    static isMobile(ua = navigator.userAgent, recount = false): boolean {
        if (_isMobile === null || recount) {
            _isMobile = Utils.judge(ua);
        }
        return _isMobile;
    }

    static audioPlayer(ele, src = '', isLoop = false) {
        function playAudio(element) {
            console.log('playAudio');
            const result = element.play();
            // 如果播放失败
            result.catch(() => {
                console.log('catch');
                const play = () => {
                    element.play();
                    document.removeEventListener('click', play);
                    document.removeEventListener('tap', play);
                };
                document.addEventListener('tap', play);
                document.addEventListener('click', play);
            });
        }
        if (!audio[ele]) {
            audio[ele] = document.createElement('audio');
            audio[ele].classList.add(ele);
            audio[ele].src = src;
            audio[ele].preload = true;
            audio[ele].loop = isLoop;
            audio[ele].volume = 0.5;
            document.querySelector('body').appendChild(audio[ele]);
        }
        playAudio(audio[ele]);
    }
}

export default Utils;
