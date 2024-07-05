import authentication from '@/utils/authentication';

const auth = {
    // 用户登录
    login(data) {
        return authentication.login(data);
    }
};

export default auth;
