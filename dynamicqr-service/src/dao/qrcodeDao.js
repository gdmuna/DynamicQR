const db = require('../utils/dbConnPool/mariadb');

// 引入 UUIDv7 生成器
const { v7: uuidv7 } = require('uuid');

// 获取二维码列表
exports.getQRCodeList = async (userId) => {
    const sql = `
        SELECT
            id AS qrcodeId,
            name,
            description,
            url,
            create_time AS createTime,
            update_time AS updateTime
        FROM
            qrcode
        WHERE
            create_by = ?
        ORDER BY
            update_time DESC,
            create_time DESC
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};

// 获取单个二维码详情信息
exports.getQRCodeDetail = async (qrcodeId) => {
    const sql = `
        SELECT
            id AS qrcodeId,
            name,
            description,
            url,
            create_time AS createTime,
            update_time AS updateTime,
            create_by AS createBy
        FROM
            qrcode
        WHERE
            id = ?
    `;
    const sqlParams = [qrcodeId];
    return await db.query(sql, sqlParams);
};

// 创建二维码
exports.createQRCode = async (name, description, url, userId) => {
    const sql = `
        INSERT INTO
            qrcode (id, name, description, url, create_time, create_by)
        VALUES
            (?, ?, ?, ?, NOW(), ?)
    `;
    const sqlParams = [uuidv7(), name, description, url, userId];
    return await db.query(sql, sqlParams);
};

// 更新二维码
exports.updateQRCode = async (qrcodeId, name, description, url) => {
    const sql = `
        UPDATE
            qrcode
        SET
            name = ?,
            description = ?,
            url = ?,
            update_time = NOW()
        WHERE
            id = ?
    `;
    const sqlParams = [name, description, url, qrcodeId];
    return await db.query(sql, sqlParams);
};

// 删除二维码
exports.deleteQRCode = async (qrcodeId) => {
    const sql = `
        DELETE FROM
            qrcode
        WHERE
            id = ?
    `;
    const sqlParams = [qrcodeId];
    return await db.query(sql, sqlParams);
};
