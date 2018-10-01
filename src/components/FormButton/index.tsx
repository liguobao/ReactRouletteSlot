/*
 * @Author: wzi
 * @Date: 2018-09-17 16:44:44
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-27 10:02:04
 */
import * as React from 'react';
import { shouldUpdate } from '@common/decorator/decorator';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

type FormButtonProps = {
    loading?: boolean;
    onClick: GlobalType.VoidFunc;
    content: string;
};
type FormButtonState = {};

@shouldUpdate({
    props: ['loading'],
})
export default class FormButton extends React.Component<
    FormButtonProps,
    FormButtonState
> {
    public render() {
        const { loading = false } = this.props;
        return (
            <WingBlank>
                <WhiteSpace />
                <Button
                    type="warning"
                    loading={loading}
                    onClick={this.props.onClick}
                    disabled={loading}
                >
                    {this.props.content}
                </Button>
                <WhiteSpace />
            </WingBlank>
        );
    }
}
