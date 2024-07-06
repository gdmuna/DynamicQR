import request from '@/utils/request';

const moduleUrl = '/qrcode';

const qrcode = {
    // 获取用户有权限访问的二维码列表
    getQRCodeList(data) {
        return request.get(`${moduleUrl}/list`, data);
    },
    // 获取单个二维码详情信息
    getQRCodeDetail(data) {
        return request.get(`${moduleUrl}/detail`, data);
    },
    // 创建二维码
    createQRCode(data) {
        return request.post(`${moduleUrl}/create`, data);
    },
    // 更新二维码
    updateQRCode(data) {
        return request.post(`${moduleUrl}/update`, data);
    },
    // 删除二维码
    deleteQRCode(data) {
        return request.delete(`${moduleUrl}/delete`, data);
    }
};

export default qrcode;
