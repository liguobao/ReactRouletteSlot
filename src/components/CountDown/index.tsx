/*
 * @Author: wzi
 * @Date: 2018-03-02 10:04:09
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-17 18:04:24
 */

// import Countdown from 'react-countdown-now';
import ErrorBoundary from '@common/decorator/errorBoundaryDecorator';
import React from 'react';
import Utils from '@common/helper/utils';
import styled from 'styled-components';
import { shouldUpdate } from '@common/decorator/decorator';
import { L, replace } from '@config/LANG';
type CountDownProp = {
    className?: string;
    timeStamp: number; // 目标时间戳
    onComplete?: GlobalType.VoidFunc;
    offsetTime?: number; // 偏移毫秒数
    type?: 'digital' | 'normal'; // 时间显示样式 digital 为时钟效果
    mode?: 'Num' | 'Cn'; // 时间显示模式 Number为 01:23; Cn 为: 1分23秒
    children?: React.ReactChild;
};
type CountDownState = {
    timer: NodeJS.Timer; // 定时器句柄
    leftTime: number; // 剩余时间 ms
    preProps: CountDownProp;
};

@shouldUpdate({
    state: ['timer', 'leftTime', 'error'],
    props: ['timeStamp'],
})
@ErrorBoundary('倒计时加载失败')
class CountDown extends React.Component<CountDownProp, CountDownState> {
    state = {
        timer: null,
        leftTime: 0,
        preProps: { timeStamp: 0 },
    };

    componentDidMount() {
        this.setUp();
    }
    componentWillUnmount() {
        this.clear();
    }
    static getDerivedStateFromProps(
        nextProps: CountDownProp,
        prevState: CountDownState
    ) {
        if (prevState.preProps.timeStamp !== nextProps.timeStamp) {
            return {
                leftTime: nextProps.timeStamp - Utils.Date.getNowDate(),
                preProps: nextProps,
            };
        }
        return null;
    }
    componentDidUpdate() {
        if (this.state.leftTime > 0 && this.state.timer === null) {
            this.setUp();
        }
    }
    setUp = () => {
        let leftTime = this.props.timeStamp - Utils.Date.getNowDate();
        if (leftTime < 0) {
            leftTime = 0;
        }
        if (this.state.timer !== null) {
            clearInterval(this.state.timer);
        }
        this.setState({
            timer: setInterval(this.afterOneSecond, 1000),
            leftTime,
        });
    };
    clear = () => {
        clearInterval(this.state.timer);
        this.setState({ timer: null });
    };
    cnTime = (day, hours, mins, sec) => {
        return `${day !== 0 ? replace('Time.DAY', [day]) : ''}${
            hours !== 0 || day ? replace('Time.HOUR', [hours]) : ''
        }${mins !== 0 || (hours || day) ? replace('Time.MINS', [mins]) : ''}${
            sec !== 0 || (mins || hours || day)
                ? replace('Time.SEC', [sec])
                : ''
        }`;
    };
    numberTime = (day, hours, mins, sec) => {
        return `${
            hours !== 0 || day
                ? `${Utils.String.zeroFill(day * 24 + hours, 2)}:`
                : ''
        }${`${Utils.String.zeroFill(mins, 2)}:`}${`${Utils.String.zeroFill(
            sec,
            2
        )}`}`;
    };
    split = (time: string) => {
        return time.split('').map((cur, key) => <i key={key}>{cur}</i>);
    };
    time(time, mode = 'Num') {
        const { day, hours, mins, sec } = time;
        if (day === 0 && hours === 0 && mins === 0 && sec === 0) {
            return L('Time.END');
        }
        if (isNaN(day) || isNaN(hours) || isNaN(mins) || isNaN(sec)) {
            return L('Time.END');
        }
        return mode === 'Num'
            ? this.split(this.numberTime(day, hours, mins, sec))
            : this.cnTime(day, hours, mins, sec);
    }
    afterOneSecond = () => {
        const { onComplete, offsetTime = 0 } = this.props;
        let { leftTime } = this.state;
        if (!leftTime) {
            this.clear();
            return;
        }

        // if (leftTime > 0) {
        leftTime -= 1000;
        if (leftTime < 0 || leftTime === 0) {
            // 定时时间到
            onComplete &&
                setTimeout(() => {
                    onComplete();
                }, offsetTime);
            leftTime = 0;
        }
        // }
        this.setState({
            leftTime,
        });
    };
    render() {
        const { className, mode } = this.props;

        return (
            <span className={className}>
                {this.time(Utils.Date.msToTime(this.state.leftTime), mode)}
            </span>
        );
    }
}

const CountDownStyled = styled(CountDown)`
    font-family: ${(props) => (props.type !== 'digital' ? '' : 'Digital')};
    i {
        font-style: normal;
    }
`;
export default CountDownStyled;
