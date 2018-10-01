/*
 * @Author: wzi
 * @Date: 2018-09-26 18:28:36
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-29 10:37:42
 */
import styled from '@common/helper/styled-component';
import CustomIcon from '@components/CustomIcon';

import { Button, List } from 'antd-mobile';
export { Button };
const size = ` font-size: 15px`;
export const CodeIcon = styled(CustomIcon).attrs({
    type: 'code',
})`
    ${size};
`;
export const Item = styled(List.Item)`
    && {
        padding-left: 0px;
    }
`;
