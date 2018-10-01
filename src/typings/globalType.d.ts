/*
 * @Author: wzi
 * @Date: 2018-02-27 10:21:53
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-30 18:11:23
 */

declare namespace GlobalType {
    interface Respond {
        status: 0 | 1;
        msg: string;
        data?: any;
    }
    type LightStore = { getState: Function; dispatch: Function };
    type VoidFunc = () => void;
    type RouteType = {
        path: string;
        component: React.ComponentType<any>;
    };
    interface Page {
        total: number; // 记录条数
        pageSize: number; // 每页个数
        current: number; // 当前页
    }
    interface ListData {
        // 分页信息
        pagination: GlobalType.Page;
        // 数据信息
        list: any[];
    }
    interface FetchListParameter {
        startDate: string;
        endDate: string;
        page: number;
        pageSize: number;
    }
    type DeviceType = 'mobile' | 'pc';
    type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
}
