/*
 * @Author: wzi
 * @Date: 2018-12-25 18:28:49
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-03 11:11:35
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const happyConfig = require('./config/happypack');
const theme = require('./config/theme');
const ROOT_PATH = path.resolve(__dirname);
const NODE_PATH = path.join(ROOT_PATH, 'node_modules');

const isDemo = process.env.target === 'demo';
const isPro = !isDemo &&  process.env.NODE_ENV === 'production';
const getDevEntry = () =>
    isPro ? './src/components/ReactRouletteSlot' : './src';

const getOutput = () => {
    return Object.assign(
        {
            path: isDemo ? path.join(ROOT_PATH, './dist') : path.join(ROOT_PATH, './lib'),
        },
        isPro
            ? {
                  filename: 'index.js',
                  libraryTarget: 'umd',
                  library: 'ReactRouletteSlot',
              }
            : {
                  filename: '[name].js',
                  chunkFilename: '[name].[chunkhash].js',
                  libraryTarget: 'var',
              }
    );
};
module.exports = {
    entry: getDevEntry(),
    output: getOutput(),
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@assets': path.join(ROOT_PATH, './src/assets'),
            '@store': path.join(ROOT_PATH, './src/store'),
            '@common': path.join(ROOT_PATH, './src/common'),
            '@config': path.join(ROOT_PATH, './src/config'),
            '@routes': path.join(ROOT_PATH, './src/routes'),
            '@modules': path.join(ROOT_PATH, './src/store/modules'),
            '@components': path.join(ROOT_PATH, './src/components'),
            '@src': path.join(ROOT_PATH, './src'),
        },
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'happypack/loader?id=ts',
                exclude: NODE_PATH,
            },

            {
                test: /\.less$/,
                include: NODE_PATH,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },

                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    browsers: [
                                        'last 2 versions',
                                        'Firefox ESR',
                                        '> 1%',
                                        'ie >= 8',
                                        'iOS >= 8',
                                        'Android >= 4',
                                    ],
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            javascriptEnabled: true,
                            sourceMap: true,
                            modifyVars: theme,
                        },
                    },
                ],
            },

            {
                test: /\.(png|jpg|gif|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 128,
                            name: 'img/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(mp3|wav)(\?t=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'img/[name].[ext]' },
                    },
                ],
                exclude: NODE_PATH,
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
        ],
    },
    optimization: {
        runtimeChunk: isPro ? false : 'single',
    },
    plugins: [
        ...happyConfig,

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(
                isPro ? 'production' : 'development'
            ),
        }),
    ].concat(
        isPro
            ? []
            : [
                  new HtmlWebpackPlugin({
                      template: './public/index.html',
                  }),
              ]
    ),
    externals: isPro ? { React: 'React', 'react-dom': 'react-dom' } : {},
    devServer: {
        host: '0.0.0.0',
        port: 9999,
        hot: true,
        historyApiFallback: true,
    },
};
