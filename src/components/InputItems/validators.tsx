/*
 * @Author: wzi
 * @Date: 2018-09-28 10:41:15
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-29 17:59:06
 */
export const defaultValidator = (_rule, _value, callback) => {
    callback();
};

export const validator = (length: number, errorInfo: string) => (
    _rule,
    value,
    callback
) => {
    if (value && value.length !== length) {
        callback(new Error(errorInfo));
    } else {
        callback();
    }
};
export const realNameValidator = (length: number, errorInfo: string) => (
    _rule,
    value,
    callback
) => {
    if (value && value.length > length) {
        callback(new Error(errorInfo));
    } else {
        callback();
    }
};
const confirmPassWordValidator = (form) => (_rule, value, callback) => {
    const password = form.getFieldValue('password');
    if (value !== password) {
        callback(new Error('两个密码不一致!'));
    } else {
        callback();
    }
};
export const getValidator = (name, form) => {
    switch (name) {
        case 'confirm':
            return confirmPassWordValidator(form);
        default:
            return defaultValidator;
    }
};
