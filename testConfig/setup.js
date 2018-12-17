/*
 * @Author: wzi
 * @Date: 2018-12-03 17:56:20
 * @Last Modified by: wzi
 * @Last Modified time: 2018-12-03 17:56:58
 */
var { JSDOM } = require('jsdom');

var exposedProperties = ['window', 'navigator', 'document'];

const { document } = (new JSDOM('')).window;
global.document = document;

global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js',
};
