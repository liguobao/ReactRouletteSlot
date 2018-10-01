/*
 * @Author: wzi
 * @Date: 2018-09-19 16:10:35
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-29 16:59:20
 */
/// <reference path="./index.d.ts" />
import React, { SFC } from 'react';
import { InputItem } from 'antd-mobile';

type InputItemProps = {
    getFieldProps: any;
    getFieldError: any;
    initialValue?: any;
    label?: string | JSX.Element;
    rules: any[];
    name: string;
    type?: string;
    placeholder: string;
    clear: boolean;
    extra?: JSX.Element | string;
    style?: any;
    className?: string;
};

const CommonItem: SFC<InputItemProps> = ({
    getFieldProps,
    getFieldError,
    initialValue,
    label,
    rules,
    name,
    type,
    placeholder,
    clear = false,
    extra,
    className,
}) => {
    return (
        <InputItem
            className={className}
            {...getFieldProps(name, {
                initialValue,
                rules,
            })}
            type={type}
            clear={clear}
            error={!!getFieldError(name)}
            onErrorClick={() => {
                window.Alert.fail(getFieldError(name).join('、'));
            }}
            placeholder={placeholder}
            extra={extra}
        >
            {label}
        </InputItem>
    );
};
export default CommonItem;
