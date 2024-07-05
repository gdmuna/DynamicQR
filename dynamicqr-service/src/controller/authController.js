const router = require('express').Router();
module.exports = router;

const authService = require('../service/authService');

/**
 * @function login
 * @description 用户登录
 * @method POST
 * @param {string} account 用户账号
 * @param {string} password 用户密码
 * @return {string} token 登录凭证
 */
router.post('/login', async (req, res, next) => {
    const { account, password } = req.body;
    const token = await authService.login(account, password);
    if (token) {
        res.ResultVO(0, '登录成功', token);
    } else {
        res.ResultVO(1, '登录失败');
    }
});

/**
 * @function verify
 * @description 凭证校验
 * @method POST
 * @param {string} token 登录凭证
 * @return {Object} payload 凭证负载
 */
router.post('/tokenVerify', async (req, res, next) => {
    const { token } = req.body;
    const payload = await authService.tokenVerify(token);
    if (payload) {
        res.ResultVO(0, '凭证有效', payload);
    } else {
        res.ResultVO(1, '凭证无效');
    }
});
