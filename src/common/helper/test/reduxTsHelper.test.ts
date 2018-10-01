/*
 * @Author: wzi
 * @Date: 2018-01-29 16:45:51
 * @Last Modified by: wzi
 * @Last Modified time: 2018-03-06 17:58:29
 */
import * as ReduxTsHelper from '@common/helper/reduxTsHelper';
describe('reduxTsHelper', () => {
    enum BasicTypes {
        /** 加法 */
        add,
        /** 乘法 */
        multiple,
        /** 改变可见性 */
        changeVisible,
    }

    const prefix = 'test';

    test('createTypes 创建 actionType', () => {
        // tslint:disable-next-line:variable-name
        const Types = ReduxTsHelper.createTypes(prefix, BasicTypes);
        expect(Types.add).toBe('test/add');
    });

    test('createAction 创建 action', () => {
        // tslint:disable-next-line:variable-name
        const Types = ReduxTsHelper.createTypes(prefix, BasicTypes);
        const add = ReduxTsHelper.createAction(Types.add)<{ num: number }>();
        const result = add({ num: 100 });
        expect(result).toMatchObject({
            type: Types.add,
            payload: { num: 100 },
        });
    });

    test('returnActionType 获得联合的 action 类型', () => {
        // tslint:disable-next-line:variable-name
        const Types = ReduxTsHelper.createTypes(prefix, BasicTypes);
        const actions = {
            /** 加法 */
            add: ReduxTsHelper.createAction(Types.add)<{ num: number }>(),
            /** 乘法 */
            multiple: ReduxTsHelper.createAction(Types.multiple)<number>(),
            /** 改变可见性 */
            changeVisible: ReduxTsHelper.createAction(Types.changeVisible)<
                boolean
            >(),
        };
        const actionTypes = ReduxTsHelper.returnActionType(actions);
        const actionAdd = actions.add({ num: 123 });
        const actionmultiple = actions.multiple(123);
        const actionchangeVisible = actions.changeVisible(true);
        expect(typeof actionTypes).toBe(typeof actionAdd);
        expect(typeof actionTypes).toBe(typeof actionmultiple);
        expect(typeof actionTypes).toBe(typeof actionchangeVisible);
    });

    // class TestState {
    //     visible = false;
    //     num = 0;
    // }

    // test('returnStateType 获得联合的state', () => {
    //     function routeReducer(state = new TestState(), action): TestState {
    //         switch (action.type) {
    //             case 'LOCATION_CHANGE':
    //                 return { ...state, visible: false };
    //             default:
    //                 return state;
    //         }
    //     }

    //     const mockGlobalState = ReduxTsHelper.returnStateType({ routeReducer });
    //     type GlobalState = typeof mockGlobalState;
    //     const globalReducer: GlobalState = { routeReducer: { visible: true, num: 0} };

    //     expect(globalReducer.routeReducer.visible).toBe(true);
    // });
});
