/*
 * @Author: wzi
 * @Date: 2018-09-28 15:18:38
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-29 16:05:28
 */
import React from 'react';
import data from '@common/constants/provinces.json';
import { Item, LocationPicker } from '@components/InputItems/Location/style';

const getData = (location: string = '北京市,市辖区,朝阳区') =>
    location.split(',');

type LocationProp = {
    form: any;
    location: string;
};
const Location: React.SFC<LocationProp> = ({ form, location }) => {
    return (
        <LocationPicker
            extra="请选择"
            data={data}
            title="选择所在的省市区"
            {...form.getFieldProps('location', {
                initialValue: getData(location),
            })}
            onOk={(e) => console.log('ok', e)}
            onDismiss={(e) => console.log('dismiss', e)}
        >
            <Item arrow="horizontal">省市区</Item>
        </LocationPicker>
    );
};
export default Location;
