const userDao = require('../dao/userDao');

// 获取用户信息
exports.getUserInfo = async (userId) => {
    const userInfo = await userDao.getUserInfo(userId);
    return userInfo[0];
};
