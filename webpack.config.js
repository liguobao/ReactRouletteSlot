const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const tsImportPluginFactory = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const happyConfig = require('./config/happypack');
const theme = require('./config/theme');
const ROOT_PATH = path.resolve(__dirname);
const NODE_PATH = path.join(ROOT_PATH, 'node_modules');

const antdImportPlugin = tsImportPluginFactory({
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
});

module.exports = {
    entry: './src',
    output: {
        path: path.join(ROOT_PATH, './dist'),
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
        libraryTarget: 'var',
    },
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
        runtimeChunk: 'single',
    },
    plugins: [
        ...happyConfig,
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/dev': {
                target: 'http://192.168.0.116:8080/essmweb',
                pathRewrite: { '^/dev': '' }
            }
        },
    },
};
