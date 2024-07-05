const db = require('../utils/dbConnPool/mariadb');

// 免认证获取单个二维码详情信息
exports.getQRCodeDetail = async (qrcodeId) => {
    const sql = `
        SELECT
            id AS qrcodeId,
            name,
            description,
            url
        FROM
            qrcode
        WHERE
            id = ?
    `;
    const sqlParams = [qrcodeId];
    return await db.query(sql, sqlParams);
};
