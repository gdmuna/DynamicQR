import request from '@/utils/request';

const moduleUrl = '/user';

const user = {
    // 查询某个用户的详细信息
    getUserInfo(data) {
        return request.get(`${moduleUrl}/userInfo`, data);
    }
};

export default user;
