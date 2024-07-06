<template>
    <div class="main-container">
        <div class="w-full max-w-screen-sm h-full mx-auto px-10 py-10 flex flex-col justify-center">
            <v-card>
                <div class="flex flex-col justify-center items-center">
                    <v-card-title>{{ qrcode.name }}</v-card-title>
                    <v-card-text>{{ qrcode.description }}</v-card-text>
                    <v-avatar rounded="0" size="200">
                        <v-img :src="qrcode.img"></v-img>
                    </v-avatar>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="pink-accent-1" variant="tonal" icon="mdi-cards-heart" size="small"></v-btn>
                    <v-btn color="deep-purple-accent-1" variant="tonal" icon="mdi-arrow-down-bold-box" size="small" @click="download(qrcode.qrcodeId)"></v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
    name: 'ShowQRCodePage',
    components: {},
    data() {
        return {
            qrcode: {
                qrcodeId: this.$route.query.qrcodeId
            }
        };
    },
    async created() {
        await this.getQRCodeDetail(this.qrcode.qrcodeId);
    },
    mounted() {},
    updated() {},
    methods: {
        // 根据二维码内容生成二维码
        async generateQRCode(qrcodeContent) {
            return await QRCode.toDataURL(qrcodeContent, {
                margin: 1,
                width: 300,
                height: 300
            });
        },
        // 获取二维码信息
        async getQRCodeDetail(qrcodeId) {
            const qrcode = await this.$api.publicApi.getQRCodeDetail({ qrcodeId });
            // 生成二维码图像实体
            qrcode.img = await this.generateQRCode(qrcode.url);
            this.qrcode = qrcode;
        },
        // 下载保存二维码活码
        async download(qrcodeId) {
            // 拼接活码内容 = 域名 + url + 活码id
            const url = `${window.location.origin}/show?qrcodeId=${qrcodeId}`;
            // 生成二维码图像实体
            const img = await this.generateQRCode(url);
            // 创建锚点装载图像并触发点击下载
            const a = document.createElement('a');
            a.href = img;
            a.download = `qrcode_${this.qrcode.name}.png`;
            a.click();
        }
    }
};
</script>

<style scoped></style>
