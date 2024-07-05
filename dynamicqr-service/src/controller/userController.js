const router = require('express').Router();
module.exports = router;

const userService = require('../service/userService');

/**
 * @function getUserInfo
 * @description 获取用户信息
 * @param {string} userId 用户ID
 * @return {Object} userInfo 用户信息
 */
router.get('/userInfo', async (req, res, next) => {
    const { account } = req.query;
    const userInfo = await userService.getUserInfo(account);
    res.ResultVO(0, '成功', userInfo);
});
