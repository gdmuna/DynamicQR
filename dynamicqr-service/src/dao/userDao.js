const db = require('../utils/dbConnPool/mariadb');

// 获取用户信息
exports.getUserInfo = async (account) => {
    const sql = `
        SELECT
            id AS userId,
            account,
            nickname AS nickName
        FROM
            userinfo
        WHERE
            account = ?
    `;
    const sqlParams = [account];
    return await db.query(sql, sqlParams);
};
