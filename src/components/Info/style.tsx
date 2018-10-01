/*
 * @Author: wzi
 * @Date: 2018-09-17 17:42:15
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-30 11:27:17
 */

import styled from '@common/helper/styled-component';
import { Accordion, WhiteSpace, Flex } from 'antd-mobile';
import CustomIcon from '@components/CustomIcon';
export { WhiteSpace, Flex };
export const Info = styled(Accordion)``;
export const Panel = styled(Accordion.Panel)`
    font-size: 14px !important;
`;
export const Content = styled.div`
    padding: 15px;
`;
export const Icon = styled(CustomIcon).attrs({
    type: 'info',
})`
    font-size: 20px;
`;
