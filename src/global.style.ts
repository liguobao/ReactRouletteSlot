/*
 * @Author: wzi
 * @Date: 2018-02-10 10:57:14
 * @Last Modified by: wzi
 * @Last Modified time: 2018-11-30 14:59:11
 */

import { css } from '@common/helper/styled-component';

const primary = '#ed6c44';
export const theme = {
    primary: primary,
    red: '#e84330',
    blue: '#108ee9',
    green: '#0aa50a',
    yellow: '#ffde2a',
    gray: '#626262',
    orange: '#ff821b',
    sky: '#37e3e3',
    purple: '#8e5df5',
    lightGray: '#bfbfbf',
    brown: '#d04e4e',
    bingo: '#c7f3c9',
};

const ball = `
    display: inline-block;
    margin: 1px;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    overflow: hidden;
    background: ${theme.primary};
    vertical-align: top;
    `;

const GlobalStyle = css`
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    .ball {
        width: 28px;
        height: 28px;
        background: #eb6c3f;
        line-height: 28px;
        font-size: 20px;
        ${ball};
    }
    .red {
        color: ${theme.red} !important;
    }
    .green {
        color: ${theme.green} !important;
    }
    .blue {
        color: ${theme.blue} !important;
    }
    .bingo {
        background-color: ${theme.bingo};
    }
    .yellow {
        color: ${theme.yellow} !important;
    }
    .gray {
        color: ${theme.gray} !important;
    }
    .orange {
        color: ${theme.orange} !important;
    }
    .sky {
        color: ${theme.sky} !important;
    }
    .purple {
        color: ${theme.purple} !important;
    }
    .lightGray {
        color: ${theme.lightGray} !important;
    }

    .brown {
        color: ${theme.brown} !important;
    }

    @keyframes twinkling {
        /*透明度由0到1*/
        0% {
            opacity: 0.1; /*透明度为0*/
        }
        100% {
            opacity: 1; /*透明度为1*/
        }
    }

   
    @keyframes slide-right {
        0% {
            transform: translateX(-10px);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

export const MobileGlobalStyles = css`
    ${GlobalStyle};
    /* 修复 IOS 弹出层的问题 */
    .am-picker-popup-wrap {
        transform: translateZ(2px);
    }
    a {
        text-decoration: none !important;
    }
    .VCode {
        .am-input-extra {
            overflow: initial !important;
        }
        .am-button {
            margin-top: -5px;
        }
    }
`;
