import auth from '@/api/auth';
import user from '@/api/user';
import qrcode from '@/api/qrcode';
import publicApi from '@/api/public';

// 注入所有 api 模块到 Vue 实例
export default {
    install(app) {
        app.config.globalProperties.$api = {
            auth,
            user,
            qrcode,
            publicApi
        };
    }
};
