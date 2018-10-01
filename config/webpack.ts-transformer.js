/*
 * @Author: wzi
 * @Date: 2018-09-10 15:18:32
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-18 17:55:34
 */

const tsImportPluginFactory = require('ts-import-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const antdImportPlugin = tsImportPluginFactory([
    {
        libraryName: 'antd',
        style: true,
    },
    {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
    },
]);


const getCustomTransformers = () => ({ before: [styledComponentsTransformer,antdImportPlugin] });

module.exports = getCustomTransformers;