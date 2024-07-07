import request_freeauth from '@/utils/request_freeauth';

const moduleUrl = '/public';

const publicApi = {
    // 免认证获取单个二维码详情信息
    getQRCodeDetail(data) {
        return request_freeauth.get(`${moduleUrl}/qrcodeDetail`, data);
    }
};

export default publicApi;
