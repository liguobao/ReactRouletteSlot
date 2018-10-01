/*
 * @Author: wzi
 * @Date: 2018-09-18 10:11:20
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-28 11:19:42
 */
/*
 * @Author: wzi
 * @Date: 2018-09-17 16:44:44
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-17 18:18:48
 */
import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { shouldUpdate } from '@common/decorator/decorator';
import { locationSelector } from '@modules/router/selectors';
import { ComponentProp } from '@common/helper/reduxTsHelper';
import { L } from '@config/LANG';
import Utils from '@common/helper/utils';
import history from '@config/history';
import { HeaderBar, LeftIcon } from './style';
const BLANK_LIST = [];
type HeaderProps = ComponentProp<
    typeof mapStateToProps,
    typeof mapDispatchToProps
>;
type HeaderState = {};

const mapStateToProps = createStructuredSelector({
    location: locationSelector(),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({}, dispatch);

@shouldUpdate({
    props: ['location'],
})
class Header extends React.Component<HeaderProps, HeaderState> {
    getPathName = (index = -1) =>
        Utils.String.locationHandler(index, this.props.location as any);
    hasHeader = () => BLANK_LIST.indexOf(this.getPathName()) === -1;
    isSpecial = () => this.getPathName().match(/\d/);
    Title = () =>
        L(`RouterTitle.${this.getPathName(this.isSpecial() ? -2 : -1)}`);
    onLeftClick = () => {
        switch (this.getPathName()) {
            default: {
                return history.goBack();
            }
        }
    };
    LeftIcon = () => {
        switch (this.getPathName()) {
            default: {
                return <LeftIcon />;
            }
        }
    };
    public render() {
        if (!this.hasHeader()) {
            return null;
        }
        return (
            <HeaderBar
                mode="light"
                icon={this.LeftIcon()}
                onLeftClick={this.onLeftClick}
                rightContent={[]}
            >
                <this.Title />
            </HeaderBar>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
