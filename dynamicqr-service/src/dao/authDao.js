const db = require('../utils/dbConnPool/mariadb');

// 用户登录
exports.login = async (account) => {
    const sql = `
        SELECT
            id AS userId,
            account,
            password AS passwordHash
        FROM
            userinfo
        WHERE
            account = ?
    `;
    const sqlParams = [account];
    return await db.query(sql, sqlParams);
};
