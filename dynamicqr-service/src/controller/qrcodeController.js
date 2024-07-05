const router = require('express').Router();
module.exports = router;

const qrcodeService = require('../service/qrcodeService');

/**
 * @function list
 * @description 获取用户有权限访问的二维码列表
 * @method GET
 * @param {string} userId 用户ID
 * @return {List} qrcodeList 二维码列表
 */
router.get('/list', async (req, res, next) => {
    const { userId } = req.payload;
    const qrcodeList = await qrcodeService.getQRCodeList(userId);
    res.ResultVO(0, '获取二维码列表成功', qrcodeList);
});

/**
 * @function detail
 * @description 获取单个二维码详情信息
 * @method GET
 * @param {string} qrcodeId 二维码ID
 * @return {Object} qrcodeDetail 二维码详情
 */
router.get('/detail', async (req, res, next) => {
    const { qrcodeId } = req.query;
    const qrcodeDetail = await qrcodeService.getQRCodeDetail(qrcodeId);
    res.ResultVO(0, '获取单个二维码详情信息成功', qrcodeDetail);
});

/**
 * @function create
 * @description 创建二维码
 * @method POST
 * @param {string} name 二维码名称
 * @param {string} description 二维码描述
 * @param {string} url 二维码链接
 * @param {string} userId 用户ID
 * @return {Object} result 创建结果
 */
router.post('/create', async (req, res, next) => {
    const { name, description, url } = req.body;
    const { userId } = req.payload;
    const result = await qrcodeService.createQRCode(name, description, url, userId);
    res.ResultVO(0, '创建二维码成功', result);
});

/**
 * @function update
 * @description 更新二维码
 * @method POST
 * @param {string} qrcodeId 二维码ID
 * @param {string} name 二维码名称
 * @param {string} description 二维码描述
 * @param {string} url 二维码链接
 * @return {Object} result 更新结果
 */
router.post('/update', async (req, res, next) => {
    const { qrcodeId, name, description, url } = req.body;
    const result = await qrcodeService.updateQRCode(qrcodeId, name, description, url);
    res.ResultVO(0, '更新二维码成功', result);
});

/**
 * @function delete
 * @description 删除二维码
 * @method POST
 * @param {string} qrcodeId 二维码ID
 * @return {Object} result 删除结果
 */
router.delete('/delete', async (req, res, next) => {
    const { qrcodeId } = req.body;
    const result = await qrcodeService.deleteQRCode(qrcodeId);
    res.ResultVO(0, '删除二维码成功', result);
});
