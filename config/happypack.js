/*
 * @Author: wzi
 * @Date: 2018-09-07 18:11:21
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-10 16:21:47
 */

const path = require('path');
const HappyPack = require('happypack');
var ROOT_PATH = path.join(__dirname, '../');
const ts = new HappyPack({
    id: 'ts',
    loaders: [
        {
            loader: 'ts-loader',
            options: {
                happyPackMode: true,
                configFile: path.join(ROOT_PATH, './tsconfig.json'),
                getCustomTransformers: path.join(ROOT_PATH, './config/webpack.ts-transformer.js'),
            },
        },
    ],
});

module.exports = [ts];
