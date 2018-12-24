/*
 * @Author: wzi
 * @Date: 2018-10-01 10:47:26
 * @Last Modified by: wzi
 * @Last Modified time: 2018-10-01 11:31:20
 */
declare namespace ReactRouletteSlot {
    interface RouletteSlotDataItem {
        // 名称
        label: string | JSX.Element;
        // 图片
        img: string;
        // 商品 ID
        id: number;
    }
    type RouletteSlotData = RouletteSlotDataItem[];
}
