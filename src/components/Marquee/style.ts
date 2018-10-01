/*
 * @Author: wzi
 * @Date: 2018-04-08 17:03:52
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-18 17:20:17
 */
import styled from '@common/helper/styled-component';
import CustomIcon from '@components/CustomIcon';
type LabelType = {
    type: 'pc' | 'mobile';
};
export const Notice = styled.span`
    vertical-align: super;
    margin-left: 1px;
`;
export const Label = styled.span`
    text-align: center;
    width: ${(props: LabelType) => (props.type === 'pc' ? '8%' : '20%')};
    background: #ed6b44;
    float: left;
    color: white;
    border-radius: 4px 0px 0px 4px;
`;

export const Horn = styled(CustomIcon)`
    margin-top: 0px;
`;
export const MalarqueeWrapper = styled.span`
    display: inline-block;
    width: ${(props: LabelType) => (props.type === 'pc' ? '90%' : '80%')};
`;
type MarqueeWrapperProp = {
    className?: string;
};
export const MarqueeWrapper = styled.div.attrs<MarqueeWrapperProp>({
    className: (props: MarqueeWrapperProp) => `${props.className} layout-width`,
})`
    background: white;
    border-radius: 5px;
`;
