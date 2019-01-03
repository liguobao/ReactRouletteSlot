/*
 * @Author: wzi
 * @Date: 2018-10-01 10:47:26
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-03 14:19:00
 */

export interface RouletteSlotDataItem {
    // 名称
    label: string | JSX.Element;
    // 图片
    img: string;
    // 商品 ID
    id: number;
}
export type RouletteSlotData = RouletteSlotDataItem[];

export type ReactRouletteSlotProps = {
    data: RouletteSlotData;
    // 每行个数
    row?: number;
    action: ActionType;
    // 宽跟高
    size?: number;
};
export type DataItem = {
    type: 'item' | 'button';
    data?: RouletteSlotDataItem;
    // 实际上数据的顺序
    position?: number;
};
export type ActionType = (
    cb: ({ data, isWin }: { data: number | string; isWin?: boolean }) => void
) => void;

type ReactRouletteSlotState = {
    // 处理过后的数据
    board: DataItem[][];
    boardData: DataItem[];
    // 记录当前的active 位置
    pointer: number;
    // 记录转了几圈
    round: number;
    // 记录结束时转了几圈
    endRound: number;
    // 记录目标
    target: number | string;
    // 是否在运行中
    run: boolean;
    // 抽奖按钮的坐标
    luckyButtonPosition: {
        x: number;
        y: number;
    };
    // 列
    row: number;
    // 行
    col: number;
};
export class ReactRouletteSlot extends React.Component<
    ReactRouletteSlotProps,
    ReactRouletteSlotState
> {}

