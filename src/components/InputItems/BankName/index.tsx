/*
 * @Author: wzi
 * @Date: 2018-09-28 15:18:38
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-29 16:31:20
 */
import React from 'react';
import { Item, BankNamePicker } from '@components/InputItems/BankName/style';
import CONSTANTS from '@common/constants';

const getBankName = () =>
    Object.keys(CONSTANTS.BANK).map((value) => ({
        label: value,
        value,
    }));

type BankNameProp = {
    form: any;
    initialValue?: string;
};
const BankName: React.SFC<BankNameProp> = ({
    form,
    initialValue = getBankName()[0].value,
}) => {
    return (
        <BankNamePicker
            cols={1}
            extra="请选择"
            data={getBankName()}
            title="选择银行"
            {...form.getFieldProps('bankName', {
                initialValue: [initialValue],
            })}
            onOk={(e) => console.log('ok', e)}
            onDismiss={(e) => console.log('dismiss', e)}
        >
            <Item arrow="horizontal">银行名称</Item>
        </BankNamePicker>
    );
};
export default BankName;
