/*
 * @Author: wzi
 * @Date: 2018-07-19 16:50:34
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-17 18:09:03
 */

import React, { SFC } from 'react';
import { CarouselWrapper, Wrapper, Holder, Img } from './style';
import { compose } from '@common/helper/compose';
import emptyEnhancer from '@common/HOC/Empty';
import errorBoundaryEnhancer from '@common/HOC/ErrorBoundary';
import { shouldUpdate } from '@common/decorator/decorator';
type CarouselProps = {
    images: any[];
};
const Carousel: SFC<CarouselProps> = ({ images }) => {
    return (
        <Wrapper>
            <CarouselWrapper autoplay infinite selectedIndex={images.length}>
                {images.map((v, k) => (
                    <a key={k} href={v.link}>
                        <img src={v.url} style={{ height: 185 }} />
                    </a>
                ))}
            </CarouselWrapper>
        </Wrapper>
    );
};
const Empty = () => (
    <Holder>
        <Img type="img" />
    </Holder>
);
export default compose(
    emptyEnhancer(({ images }) => !images.length, Empty),
    errorBoundaryEnhancer('焦点图载入失败'),
    shouldUpdate({
        props: ['images'],
    })
)(Carousel);
