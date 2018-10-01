/*
 * @Author: wzi
 * @Date: 2018-09-20 08:45:00
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-30 15:57:16
 */
declare namespace InputItems {
    interface ItemProps {
        form: any;
        initialValue?: any;
        validator?: (_rule, _value, callback) => void;
        placeholder?: string;
        name?: string;
        label?: string | JSX.Element;
        rules?: any[];
    }
    interface ConfigType extends GlobalType.Omit<ItemProps, 'form'> {
        clear?: boolean;
        type?: string;
        extra?: string | JSX.Element;
    }
}
