/*
 * @Author: wzi
 * @Date: 2018-11-29 17:09:30
 * @Last Modified by: wzi
 * @Last Modified time: 2018-11-30 16:46:30
 */

import styled, { css } from '@common/helper/styled-component';
const animation = css`
    @keyframes blueWinkle {
        0% {
            background: #4999da;
            box-shadow: 0px 0px 10px 1px #a8c0d4;
        }
        49% {
            background: #4999da;
            box-shadow: 0px 0px 10px 1px #a8c0d4;
        }
        50% {
            background: yellow;
            box-shadow: 0px 0px 10px 1px white;
        }
        100% {
            background: yellow;
            box-shadow: 0px 0px 10px 1px white;
        }
    }
    @keyframes yellowWinkle {
        0% {
            background: yellow;
            box-shadow: 0px 0px 10px 1px white;
        }
        49% {
            background: yellow;
            box-shadow: 0px 0px 10px 1px white;
        }
        50% {
            background: #4999da;
            box-shadow: 0px 0px 10px 1px #a8c0d4;
        }
        100% {
            background: #4999da;
            box-shadow: 0px 0px 10px 1px #a8c0d4;
        }
    }
`;
type Props = {
    height: number;
    width: number;
};
export const Border = styled.div`
    border-radius: 10px;
    border-collapse: separate;
    position: relative;
    width: ${(props: Props) =>
        props.width ? props.width + 40 + 'px' : 'calc(100% + 40px)'};
    height: ${(props: Props) =>
        props.height ? props.height + 40 + 'px' : 'calc(100% + 40px)'};
    margin: 0 auto;
    background: #fc5a38;
`;

type BallProps = {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    isOdd: boolean;
    isRun: boolean;
};
export const Ball = styled.div`
    ${animation};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    top: ${(props: BallProps) => props.top}px;
    left: ${(props: BallProps) => props.left}px;
    bottom: ${(props: BallProps) => props.bottom}px;
    right: ${(props: BallProps) => props.right}px;

    background: ${(props: BallProps) =>
        props.isRun ? '' : props.isOdd ? '#4999da' : 'yellow'};
    animation: ${(props: BallProps) =>
        props.isRun
            ? props.isOdd
                ? 'blueWinkle 1s infinite alternate'
                : 'yellowWinkle 1s infinite alternate'
            : ''};
`;
