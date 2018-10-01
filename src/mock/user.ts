// /*
//  * @Author: wzi
//  * @Date: 2018-02-26 16:38:51
//  * @Last Modified by: wzi
//  * @Last Modified time: 2018-09-17 16:23:25
//  * 用户的模拟数据
//  */
import Mock from 'mockjs';
interface UserRespond extends GlobalType.Respond {
    data: UserType.User;
}
const userInfo = (): UserRespond =>
    Mock.mock({
        status: 1,
        data: {
            userName: '@first',
            // 余额
            'balance|0-1234567.2': 1,
            // 手机号码
            phone: '@string("number", 11)',
            // 积分
            'point|1-1000000': 100,
            id: '123456,',
            // 用户等级 0 普通用户, 1 VIP, 2 合伙人
            'userType|1': [0, 1, 2],
            // 是否团长 0 否 1 是
            'isRC|1': [0, 1],
            // 是否实名认证
            'isAuth|1': [0, 1],
            // 头像
            headImg: '@image(200x200)',
        },
    });
const password = (): GlobalType.Respond =>
    Mock.mock({
        status: 1,
    });
interface AuthResponse extends GlobalType.Respond {
    data: UserType.AuthInfo;
}
const auth = (): AuthResponse =>
    Mock.mock({
        status: 1,
        data: {
            realName: '*一某',
            cardId: '3*******************6',
        },
    });

export default { userInfo, password, auth };
