const qrcodeDao = require('../dao/qrcodeDao');

// 获取二维码列表
exports.getQRCodeList = async (userId) => {
    const qrcodeList = await qrcodeDao.getQRCodeList(userId);
    return qrcodeList;
};

// 获取单个二维码详情信息
exports.getQRCodeDetail = async (qrcodeId) => {
    const qrcodeDetail = await qrcodeDao.getQRCodeDetail(qrcodeId);
    return qrcodeDetail[0];
};

// 创建二维码
exports.createQRCode = async (name, description, url, userId) => {
    const result = await qrcodeDao.createQRCode(name, description, url, userId);
    return result;
};

// 更新二维码
exports.updateQRCode = async (qrcodeId, name, description, url) => {
    const result = await qrcodeDao.updateQRCode(qrcodeId, name, description, url);
    return result;
};

// 删除二维码
exports.deleteQRCode = async (qrcodeId) => {
    const result = await qrcodeDao.deleteQRCode(qrcodeId);
    return result;
};
