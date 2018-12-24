/*
 * @Author: wzi
 * @Date: 2018-07-09 15:45:27
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-18 16:03:07
 */
import Utils from '@common/helper/utils';
if (Utils.isMobile()) {
    import('./mobile').then((MobileAlert) => {
        window.Alert = new MobileAlert.default();
    });
} else {
    import('./pc').then((PCAlert) => {
        window.Alert = new PCAlert.default();
    });
}
