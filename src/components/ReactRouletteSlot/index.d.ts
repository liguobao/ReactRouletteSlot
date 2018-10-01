/*
 * @Author: wzi
 * @Date: 2018-10-01 10:47:26
 * @Last Modified by: wzi
 * @Last Modified time: 2018-10-01 11:31:20
 */
declare namespace ReactRouletteSlot {
    interface RouletteSlotDataItem {
        label: string | JSX.Element;
        img: string;
        id: number;
    }
    type RouletteSlotData = RouletteSlotDataItem[];
}
