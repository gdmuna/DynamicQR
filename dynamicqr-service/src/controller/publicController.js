const router = require('express').Router();
module.exports = router;

const publicService = require('../service/publicService');

/**
 * @function qrcodeDetail
 * @description 免认证获取单个二维码详情信息
 * @method GET
 * @param {string} qrcodeId 二维码ID
 * @return {Object} qrcodeDetail 二维码详情
 */
router.get('/qrcodeDetail', async (req, res, next) => {
    const { qrcodeId } = req.query;
    const qrcodeDetail = await publicService.getQRCodeDetail(qrcodeId);
    res.ResultVO(0, '免认证获取单个二维码详情信息成功', qrcodeDetail);
});
