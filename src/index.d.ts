/*
 * @Author: wzi
 * @Date: 2018-01-30 15:13:09
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-20 09:45:10
 */
/// <reference path="./typings/globalType.d.ts" />
/// <reference path="./typings/redux.d.ts" />
/// <reference path="./store/modules/user/index.d.ts" />
declare var EASY_ENV_IS_NODE: boolean;
declare var EASY_ENV_IS_BROWSER: boolean;
declare var EASY_ENV_IS_DEV: boolean;
declare var IS_IN_JEST: boolean;
declare interface IAlert {
    fail(info: string, duration?: number, description?: string): void;
    success(info: string, duration?: number, description?: string): void;
    info(info: string, duration?: number, description?: string): void;
}


declare namespace NodeJS {
    interface Global {
        __BROWSER__: any;
        isJest: boolean;
    }
}

declare module '*.png' {
    const value: any;
    export = value;
}
declare module '*.mp3' {
    const value: any;
    export = value;
}

declare module '*.svg' {
    const value: any;
    export = value;
}

declare module '*.ttf' {
    const value: any;
    export = value;
}

declare interface Window {
    __INITIAL_STATE__: boolean;
    judge: any;
    isMobile: any;
    devToolsExtension: any;
    Alert: IAlert;
}
declare interface NodeModule {
    hot: any;
}
declare var require: any;
declare interface ObjectConstructor {
    /**
     * Returns an array of values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    values<T>(o: { [s: string]: T } | ArrayLike<T>): T[];

    /**
     * Returns an array of values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    values(o: {}): any[];
}
