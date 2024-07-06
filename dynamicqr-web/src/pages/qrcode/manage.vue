<template>
    <div class="main-container">
        <div class="w-full max-w-screen-sm h-full mx-auto px-10 py-10">
            <div v-for="item in qrcodeList" :key="item.qrcodeId" class="py-2">
                <v-card>
                    <div class="flex flex-row justify-start items-start">
                        <v-avatar class="m-3" rounded="0" size="100">
                            <v-img :src="item.img"></v-img>
                        </v-avatar>
                        <div>
                            <v-card-title>{{ item.name }}</v-card-title>
                            <v-card-text>{{ item.description }}</v-card-text>
                        </div>
                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="medium-emphasis" icon="mdi-download" size="small" @click="download(item)"></v-btn>
                        <v-btn color="medium-emphasis" icon="mdi-eye" size="small" @click="preview(item)"></v-btn>
                        <v-btn color="medium-emphasis" icon="mdi-pencil" size="small"></v-btn>
                        <v-btn color="medium-emphasis" icon="mdi-delete" size="small"></v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
        <v-dialog v-model="dialog" width="auto">
            <v-card max-width="400">
                <iframe width="100%" height="400" :src="dialogUrl"></iframe>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import QRCode from 'qrcode';

export default {
    name: 'ManagePage',
    components: {},
    data() {
        return {
            qrcodeList: [],
            dialog: false,
            dialogUrl: null
        };
    },
    created() {},
    async mounted() {
        await this.getQRCodeList();
    },
    updated() {},
    methods: {
        // 时间格式化
        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
        },
        // 判断显示创建时间还是更新时间
        timeShow(createTime, updateTime) {
            const time = updateTime != null ? updateTime : createTime;
            return this.formatDate(time);
        },
        // 根据二维码内容生成二维码
        async generateQRCode(qrcodeContent) {
            return await QRCode.toDataURL(qrcodeContent, {
                margin: 1,
                width: 300,
                height: 300
            });
        },
        // 获取二维码列表
        async getQRCodeList() {
            let qrcodeList = await this.$api.qrcode.getQRCodeList();
            // 将二维码内容转换为二维码图片
            for (let i = 0; i < qrcodeList.length; i++) {
                // 拼接活码内容 = 域名 + url + 活码id
                const url = `${window.location.origin}/show?qrcodeId=${qrcodeList[i].qrcodeId}`;
                // 生成二维码图像实体
                qrcodeList[i].img = await this.generateQRCode(url);
            }
            this.qrcodeList = qrcodeList;
        },
        // 下载保存二维码活码
        async download(qrcode) {
            // 拼接活码内容 = 域名 + url + 活码id
            const url = `${window.location.origin}/show?qrcodeId=${qrcode.qrcodeId}`;
            // 生成二维码图像实体
            const img = await this.generateQRCode(url);
            // 创建锚点装载图像并触发点击下载
            const a = document.createElement('a');
            a.href = img;
            a.download = `qrcode_${qrcode.name}.png`;
            a.click();
        },
        // 预览二维码活码页面
        preview(qrcode) {
            this.dialogUrl = `${window.location.origin}/show?qrcodeId=${qrcode.qrcodeId}`;
            this.dialog = true;
        }
    }
};
</script>

<style scoped></style>
