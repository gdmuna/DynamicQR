const userDao = require('../dao/userDao');

// 获取用户信息
exports.getUserInfo = async (account) => {
    const userInfo = await userDao.getUserInfo(account);
    return userInfo[0];
};
