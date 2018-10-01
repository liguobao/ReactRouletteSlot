/*
 * @Author: wzi
 * @Date: 2018-09-28 10:43:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-29 10:10:23
 */
import styled from '@common/helper/styled-component';
import CustomIcon from '@components/CustomIcon';

type PassWordProp = {
    type: string;
};
const size = `font-size: 15px`;
export const Icon = styled(CustomIcon).attrs<PassWordProp>({
    type: (props: PassWordProp) => props.type,
})`
    ${size};
`;
