/*
 * @Author: wzi
 * @Date: 2018-09-04 11:29:39
 * @Last Modified by: wzi
 * @Last Modified time: 2018-12-03 17:46:16
 */


var enzyme = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");

window.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
  return 0;
};
enzyme.configure({ adapter: new Adapter() });
