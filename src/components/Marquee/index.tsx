/*
 * @Author: wzi
 * @Date: 2018-03-01 10:01:16
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-18 10:10:59
 */
import React from 'react';
import Malarquee from 'react-malarquee';
import { shouldUpdate } from '@common/decorator/decorator';
import errorBoundaryDecorator from '@common/decorator/errorBoundaryDecorator';
import { MarqueeWrapper, Label, Horn, Notice, MalarqueeWrapper } from './style';
type MarqueeProp = {
    content: string;
    fetchUrgentNotice: GlobalType.VoidFunc;
    className?: string;
    type?: 'pc' | 'mobile';
};
@shouldUpdate({
    props: ['content'],
})
@errorBoundaryDecorator('公告展示错误')
class Marquee extends React.Component<MarqueeProp> {
    componentDidMount() {
        this.fetch();
    }
    fetch = () => {
        const { content, fetchUrgentNotice } = this.props;
        if (!content.length) {
            fetchUrgentNotice();
        }
    };
    render() {
        const { content, type = 'pc', className } = this.props;
        return (
            <MarqueeWrapper className={className}>
                <Label type={type}>
                    <Horn type="horn" />
                    <Notice> 公告 : </Notice>
                </Label>
                <MalarqueeWrapper type={type}>
                    <Malarquee
                        fill={false}
                        hoverToPause
                        rate={50}
                        children={content || '暂无公告'}
                    />
                </MalarqueeWrapper>
            </MarqueeWrapper>
        );
    }
}
export default Marquee;
