/*
 * @Author: wzi
 * @Date: 2018-09-29 14:49:01
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-29 14:50:46
 */
declare namespace Constants {
    type BankConfig = {
        name: string;
        color: string;
    };
    type BankInfo = {
        [name: string]: BankConfig;
    };
    type ConstantsProp = {
        BANK: BankInfo;
    };
}
