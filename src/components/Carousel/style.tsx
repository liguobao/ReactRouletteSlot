/*
 * @Author: wzi
 * @Date: 2018-07-19 16:51:24
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-17 18:08:51
 */

import styled from '@common/helper/styled-component';
import { Carousel } from 'antd-mobile';
import CustomIcon from '@components/CustomIcon';

export const Img = styled(CustomIcon)`
    font-size: 100px;
`;
export const CarouselWrapper = styled(Carousel)`
    background: white;
    overflow: hidden;
`;
export const Wrapper = styled.div`
    min-height: 185px;
    transition: height 0.6s;

    ul {
        transition: height 0.6s;
        text-align: center;

        li a {
            min-height: 185px;
            img {
                width: 100%;
                max-width: 100%;
            }
        }
    }
`;

export const Holder = styled.div`
    height: 185px !important;
    text-align: center;
`;
