/*
 * @Author: wzi
 * @Date: 2018-07-09 15:45:27
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-18 16:03:07
 */
import Utils from '@common/helper/utils';

if (Utils.isMobile()) {

    require.ensure(
        [],
        function(require) {
            const MobileAlert = require('./mobile').default;
            window.Alert = new MobileAlert();
        },
        'mobile'
    );
} else {
    require.ensure(
        [],
        function(require) {
            const PCAlert = require('./pc').default;
            window.Alert = new PCAlert();
        },
        'pc'
    );
}
