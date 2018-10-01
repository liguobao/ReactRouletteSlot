/*
 * @Author: wzi
 * @Date: 2018-09-04 11:29:39
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-04 11:39:43
 */
"use strict";
exports.__esModule = true;

require('raf/polyfill');
require('jsdom-global/register');
var enzyme = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
// for fucking jsdom-global
window = global;
// tslint:disable-next-line:no-any
// Temporary hack to suppress error
// https://github.com/facebookincubator/create-react-app/issues/3199
window.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
  return 0;
};
enzyme.configure({ adapter: new Adapter() });
