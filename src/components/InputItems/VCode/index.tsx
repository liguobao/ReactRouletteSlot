/*
 * @Author: wzi
 * @Date: 2018-09-19 16:10:35
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-29 18:01:55
 */
import React from 'react';
import CommonItem from '@components/InputItems/common';
import * as userActions from '@modules/user/actions';
import { CodeIcon, Button } from '@components/InputItems/VCode/style';
import Utils from '@common/helper/utils';
const VCODE_SIZE = 4;
const TIME = 180;

const validateVCode = (_rule, value, callback) => {
    if (value && value.length !== VCODE_SIZE) {
        callback(new Error('请输入正确的验证码!'));
    } else {
        callback();
    }
};

type VCodeState = {
    time: number;
};
interface VCodeProp extends InputItems.ItemProps {
    action: typeof userActions.getVCode;
    type: UserType.GetVCodeType;
}
class VCode extends React.Component<VCodeProp, VCodeState> {
    state = {
        time: 0,
    };

    updateTime = () => {
        this.setState({ time: TIME });
        const timer = setInterval(() => {
            if (this.state.time > 0) {
                this.setState({
                    time: this.state.time - 1,
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);
    };

    getPhoneNumber = (form, name) => {
        return Utils.String.trimBlank(form.getFieldValue(name));
    };
    onGetVCode = (form, name, action) => (_e) => {
        const phone = this.getPhoneNumber(form, name);
        if (!phone || phone.length !== 11) {
            window.Alert.fail('请输入正确的手机号码');
        } else {
            this.updateTime();
            action({ phone, type: this.props.type });
        }
    };
    ButtonTitle = () => {
        return this.state.time > 0
            ? `${this.state.time}s 后再获取`
            : '获取验证码';
    };
    GetVCode = ({ form, name, action }) => (
        <Button
            onClick={this.onGetVCode(form, name, action)}
            type="warning"
            size="small"
            disabled={this.state.time > 0}
        >
            {this.ButtonTitle()}
        </Button>
    );
    Extra = ({ name = 'phone' }) => (
        <this.GetVCode
            form={this.props.form}
            name={name}
            action={this.props.action}
        />
    );
    render() {
        const config = {
            form: this.props.form,
            getFieldProps: this.props.form.getFieldProps,
            getFieldError: this.props.form.getFieldError,
            name: 'verifyCode',
            rules: [
                {
                    required: true,
                    message: '请输入手机验证码',
                },
                { validator: validateVCode },
            ],
            type: 'number',
            clear: true,
            placeholder: '请输入手机验证码',
            label: <CodeIcon />,
            extra: <this.Extra name={this.props.name} />,
            className: 'VCode',
        };
        return <CommonItem {...config} />;
    }
}

export default VCode;
