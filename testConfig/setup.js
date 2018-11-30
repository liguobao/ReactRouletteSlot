/*
 * @Author: wzi
 * @Date: 2018-09-04 10:36:01
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-04 11:29:20
 */
const chalk = require('chalk');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

module.exports = async function() {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 200,
        // executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
    });
    global.__BROWSER__ = browser;
    mkdirp.sync(DIR);
    fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
