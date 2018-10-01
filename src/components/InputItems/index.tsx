/*
 * @Author: wzi
 * @Date: 2018-09-27 17:48:19
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-30 16:28:44
 */
import React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import CommonItem from '@components/InputItems/common';
import { validator, realNameValidator, getValidator } from './validators';
import { Icon } from './style';
const CARD_ID_SIZE = 18;
const ORG_SIZE = 4;
const PHONE_SIZE = 13;
const REAL_NAME_SIZE = 4;
const USERNAME_SIZE = 10;
type TypeProp =
    | 'password'
    | 'userName'
    | 'cardId'
    | 'supAgentId'
    | 'phone'
    | 'common'
    | 'bankCard'
    | 'amount'
    | 'realName';
type InputItemProps = {
    type: TypeProp;
    initialValue?: any;
    label?: string | JSX.Element;
    form: WrappedFormUtils;
    clear?: boolean;
    rules?: any[];
    name?: string;
    placeholder?: string;
};

type ConfigType = {
    [name: string]: InputItems.ConfigType;
};

const getIcon = (type) => {
    return <Icon type={type} />;
};

const InputItem: React.SFC<InputItemProps> = ({
    form,
    type,
    initialValue,
    placeholder,
    clear = true,
    rules,
    name = type,
    label = getIcon(name),
}) => {
    const CONFIG: ConfigType = {
        cardId: {
            name: 'cardId',
            rules: [
                {
                    required: true,
                    message: '请输入身份证号码',
                },
                {
                    validator: validator(
                        CARD_ID_SIZE,
                        '请输入正确的身份证号码'
                    ),
                },
            ],
            placeholder: '请输入身份证号码',
        },
        supAgentId: {
            name: 'supAgentId',
            rules: [{ validator: validator(ORG_SIZE, '机构码是4位') }],
            placeholder: '请输入机构码',
            type: 'number',
        },
        phone: {
            name: 'phone',
            type: 'phone',
            placeholder: '请输入手机号码',
            rules: [
                {
                    required: true,
                    message: placeholder,
                },
                { validator: validator(PHONE_SIZE, '请输入正确的手机号码') },
            ],
        },
        password: {
            name: 'password',
            type: 'password',
            placeholder: '请输入密码',
            rules: [
                {
                    required: true,
                    message: '请输入密码',
                },
                {
                    validator: getValidator(name, form),
                },
            ],
        },
        realName: {
            name: 'realName',
            placeholder: '请输入姓名',
            rules: [
                {
                    required: true,
                    message: '姓名不可为空',
                },
                {
                    validator: realNameValidator(
                        REAL_NAME_SIZE,
                        '真实姓名不能超过4个字符'
                    ),
                },
            ],
        },
        userName: {
            name: 'userName',
            placeholder: '请输入用户名',
            rules: [
                {
                    required: true,
                    message: '用户名不可为空',
                },
                {
                    validator: validator(
                        USERNAME_SIZE,
                        '用户名不能超过10个字符'
                    ),
                },
            ],
        },
        bankCard: {
            rules: [
                {
                    required: true,
                    message: '不可为空',
                },
            ],
            type: 'bankCard',
        },
        amount: {
            rules: [
                {
                    required: true,
                    message: '金额不可为空',
                },
            ],
            name: 'amount',
            extra: '¥',
        },
        common: {
            rules: [
                {
                    required: true,
                    message: '不可为空',
                },
            ],
        },
    };
    clear = clear || CONFIG[type].clear;
    placeholder = placeholder || CONFIG[type].placeholder;
    rules = rules || CONFIG[type].rules;
    const config = Object.assign({}, CONFIG[type], {
        initialValue,
        form,
        getFieldProps: form.getFieldProps,
        getFieldError: form.getFieldError,
        clear,
        rules,
        name,
        placeholder,
        label,
    });
    return <CommonItem {...config} />;
};
export default InputItem;
