/*
 * @Author: wzi
 * @Date: 2018-09-04 10:36:01
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-04 11:29:20
 */
const chalk = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function() {
    console.log(chalk.green('Setup Puppeteer'));
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 200,
        // executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
    });
    global.__BROWSER__ = browser;
    mkdirp.sync(DIR);
    fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
