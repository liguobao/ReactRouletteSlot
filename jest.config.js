/*
 * @Author: wzi
 * @Date: 2018-12-03 17:39:17
 * @Last Modified by: wzi
 * @Last Modified time: 2018-12-03 17:52:00
 */
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');
module.exports = {
    verbose: true,
    preset: 'ts-jest',
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths),
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|)$':
            '<rootDir>/config/fileMock.js',
    },
    modulePaths: ['<rootDir>/src/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['**/*.test.tsx', '**/*.test.ts', '**/*.test.js'],
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json',
        },
        isJest: true,
    },
    coveragePathIgnorePatterns: ['index.d.ts', 'src/typings', 'src/mock'],
    collectCoverage: true,
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleDirectories: ['.', 'src', 'node_modules'],
    transformIgnorePatterns: ['<rootDir>/src/common/helper/Proxy.min.js'],
    setupFiles: ['<rootDir>/testConfig/setup.js'],
    // 每个测试启动前需要加载的js 脚本
    setupTestFrameworkScriptFile: '<rootDir>/testConfig/setupTests.js',
};
