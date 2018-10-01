/*
 * @Author: wzi
 * @Date: 2018-01-30 10:32:05
 * @Last Modified by: wzi
 * @Last Modified time: 2018-07-25 09:54:32
 */
import ProxyPolyFill from './Proxy.min';
// type Reducer<S> = (state: S, action: any) => S;

// type ReducersMap<FullState> = {
//     [key in keyof FullState]: Reducer<FullState[key]>
// };

// export function returnStateType<FullState>(
//     _reducersMap: ReducersMap<FullState>
// ): FullState {
//     return ({} as any) as FullState;
// }

type ReturnTypes<EnumTypes> = { [key in keyof EnumTypes]: key };

/**
 * 这里是一个拦截器, 重构 enumtype 的 get 方法
 */
export function createTypes<EnumTypes>(
    prefix: string,
    enumTypes: EnumTypes
): ReturnTypes<EnumTypes> {
    return new ProxyPolyFill(enumTypes as any, {
        get(_target, property: any) {
            return prefix + '/' + property;
        },
    });
}

/**
 *  return function<Payload>(payload: Payload) {
 *  return {
 *       type: type as Type,
 *       payload,
 *       };
 *   };
 *   下文写成了一个高阶函数
 *   这里不写成这样,是为了在调用createAction的时候,可以马上指定 Payload 的类型
 *   如果写成上面这样, Payload 就需要在使用的时候指定.
 *   smart!~
 */
export function createAction<Type = string>(type: Type) {
    return <Payload>() => (payload: Payload) => {
        return {
            type: type as Type,
            payload,
        };
    };
}

type ActionCreatorMap<ActionMap> = {
    [key in keyof ActionMap]: (
        payload?: any,
        arg2?: any,
        arg3?: any,
        arg4?: any
    ) => ActionMap[key]
};
type ValueOf<ActionMap> = ActionMap[keyof ActionMap];

export function returnActionType<ActionMap>(
    _actions: ActionCreatorMap<ActionMap>
) {
    type Action = ValueOf<ActionMap>;
    return ({} as any) as Action;
}

export type ComponentProps<
    T extends (...args: any[]) => any,
    P extends (...args: any[]) => any,
    U extends object
> = ReturnType<T> & ReturnType<P> & U;
export type ComponentProp<
    T extends (...args: any[]) => any,
    P extends (...args: any[]) => any
> = ReturnType<T> & ReturnType<P>;
