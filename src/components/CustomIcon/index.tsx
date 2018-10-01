/*
 * @Author: wzi
 * @Date: 2018-04-10 11:30:47
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-18 11:51:47
 */
import React from 'react';
import styled from '@common/helper/styled-component';
type CustomIconProp = {
    type: string;
    className?: string;
    size?: string;
    onClick?: any;
};

const CustomIcons: React.StatelessComponent<CustomIconProp> = ({
    type,
    className = '',
    ...restProps
}) => (
    <svg className={`icon ${className}`} aria-hidden={true} {...restProps}>
        <use xlinkHref={`#icon-${type}`} />
    </svg>
);
const CustomIcon = styled(CustomIcons)`
    width: ${(props) => (props.size ? props.size : '1.5em')} !important;
    height: ${(props) => (props.size ? props.size : '1.5em')} !important;
`;

export default CustomIcon;
