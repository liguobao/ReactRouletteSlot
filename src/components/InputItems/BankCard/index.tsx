/*
 * @Author: wzi
 * @Date: 2018-09-28 15:18:38
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-30 16:08:57
 */
import React from 'react';
import { Item, BankCardPicker } from '@components/InputItems/BankCard/style';
import Utils from '@common/helper/utils';

const getBankLabel = (bankCard: UserType.BankCard[]) =>
    bankCard.map((bank) => ({
        label: `${bank.bankName} 尾号为 ${Utils.String.trimStar(bank.bankNum)}`,
        value: bank.id,
    }));

type BankCardProp = {
    form: any;
    initialValue?: string;
    bankCard: UserType.BankCard[];
};
const BankCard: React.SFC<BankCardProp> = ({
    form,
    bankCard,
    initialValue = getBankLabel(bankCard)[0].value,
}) => {
    return (
        <BankCardPicker
            cols={1}
            extra="请选择银行卡号"
            data={getBankLabel(bankCard)}
            title="选择银行卡号"
            {...form.getFieldProps('id', {
                initialValue: [initialValue],
            })}
            onOk={(e) => console.log('ok', e)}
            onDismiss={(e) => console.log('dismiss', e)}
        >
            <Item arrow="horizontal">银行卡</Item>
        </BankCardPicker>
    );
};
export default BankCard;
