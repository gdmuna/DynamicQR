const router = require('express').Router();
module.exports = router;

const userService = require('../service/userService');

/**
 * @function userInfo
 * @description 获取用户信息
 * @method GET
 * @param {string} userId 用户ID
 * @return {Object} userInfo 用户信息
 */
router.get('/userInfo', async (req, res, next) => {
    const { userId } = req.payload;
    const userInfo = await userService.getUserInfo(userId);
    res.ResultVO(0, '成功', userInfo);
});
