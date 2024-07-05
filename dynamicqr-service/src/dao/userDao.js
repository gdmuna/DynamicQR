const db = require('../utils/dbConnPool/mariadb');

// 获取用户信息
exports.getUserInfo = async (userId) => {
    const sql = `
        SELECT
            id AS userId,
            account,
            nickname AS nickName
        FROM
            userinfo
        WHERE
            id = ?
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};
