/*
 * @Author: wzi
 * @Date: 2018-03-02 10:04:09
 * @Last Modified by: wzi
 * @Last Modified time: 2018-06-26 09:46:25
 */

import { branch, renderComponent } from 'recompose';
import { compose } from '@common/helper/compose';
const Empty = () => {
    return null;
};

const emptyEnhancer = (condition, Holder = Empty) =>
    compose(branch(condition, renderComponent(Holder)));
export default emptyEnhancer;
