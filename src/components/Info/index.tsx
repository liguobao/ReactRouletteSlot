/*
 * @Author: wzi
 * @Date: 2018-09-26 16:59:27
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-30 11:31:26
 */
import React, { SFC } from 'react';
import {
    Info,
    Panel,
    Content,
    Icon,
    WhiteSpace,
    Flex,
} from '@components/Info/style';
import { compose } from '@common/helper/compose';
import errorBoundaryEnhancer from '@common/HOC/ErrorBoundary';

const Head = (title, icon) => (
    <Flex>
        {icon}
        {title}
    </Flex>
);

type InfoBarProp = {
    title: string;
    content: JSX.Element | string;
    icon?: JSX.Element | string;
};
const InfoBar: SFC<InfoBarProp> = ({ title, content, icon = <Icon /> }) => {
    return (
        <Info defaultActiveKey="1">
            <WhiteSpace />
            <Panel header={Head(title, icon)}>
                <Content>{content}</Content>
            </Panel>
        </Info>
    );
};

export default compose(errorBoundaryEnhancer('信息框展示错误'))(InfoBar);
