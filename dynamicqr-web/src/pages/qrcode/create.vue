<template>
    <div class="main-container">
        <div class="w-full max-w-screen-sm h-full mx-auto px-10 py-20">
            <v-card>
                <div class="px-5 py-10">
                    <v-card-title class="text-center">创建活码</v-card-title>
                    <vs-input v-model="qrcode.name" class="mb-5" label="活码名称" block></vs-input>
                    <vs-input v-model="qrcode.description" class="mb-5" label="活码描述" block></vs-input>
                    <div class="mb-10">
                        <file-pond ref="filepond" name="filepond" label-idle="点击此处选择原始二维码图片" accepted-file-types="image/jpeg, image/png" instant-upload="false" :files="inspectionFiles" @init="handleFilePondInit" @addfile="handleFilePondAddFile" />
                    </div>
                    <vs-input v-model="qrcode.url" class="mb-10" label="解析结果" block></vs-input>
                    <vs-button type="flat" block @click="create()">创建活码</vs-button>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
// 图片上传组件
// Import Vue FilePond
import vueFilePond from 'vue-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// 二维码解码组件
import QrcodeDecoder from 'qrcode-decoder';

export default {
    name: 'CreatePage',
    components: {
        FilePond: vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
    },
    data() {
        return {
            qrcode: {
                name: null,
                description: null,
                url: null
            }
        };
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        // 初始化图片上传控件
        handleFilePondInit() {
            console.log('FilePond has initialized');
        },
        // 添加文件到图片上传控件
        async handleFilePondAddFile() {
            console.log('FilePond has added a file');
            await this.upload();
        },
        // 上传解析二维码图片
        async upload() {
            // 从文件上传组件获取二维码图片
            const filepond = this.$refs.filepond.getFiles();
            const image = filepond[0].file;
            // 获取图片的 BLOB URL 地址
            const imgPath = URL.createObjectURL(image);
            // 解析图片中的二维码内容
            const qr = new QrcodeDecoder();
            const url = await qr.decodeFromImage(imgPath);
            // 将二维码内容赋值到表单
            this.qrcode.url = url.data;
        },
        // 创建二维码活码
        async create() {
            const result = await this.$api.qrcode.createQRCode(this.qrcode);
            if (result) {
                this.$router.push('/manage');
            }
        }
    }
};
</script>

<style scoped></style>
