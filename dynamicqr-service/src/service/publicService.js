const publicDao = require('../dao/publicDao');

// 免认证获取单个二维码详情信息
exports.getQRCodeDetail = async (qrcodeId) => {
    const qrcodeDetail = await publicDao.getQRCodeDetail(qrcodeId);
    return qrcodeDetail[0];
};
