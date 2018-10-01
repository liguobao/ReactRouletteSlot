// /*
//  * @Author: wzi
//  * @Date: 2018-02-26 16:38:51
//  * @Last Modified by: wzi
//  * @Last Modified time: 2018-09-17 16:23:25
//  * 用户的模拟数据
//  */
import Mock from 'mockjs';
interface ReactRouletteSlotRespond {
    list: ReactRouletteSlot.RouletteSlotData;
}
const rouletteSlotData = (): ReactRouletteSlotRespond =>
    Mock.mock({
        'list|8': [
            {
                'id|1000-2000': 1,
                img: '@image(30x30)',
                label: '@first',
            },
        ],
    });

export default { rouletteSlotData };
