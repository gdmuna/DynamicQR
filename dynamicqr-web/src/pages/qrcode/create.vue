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
                        <canvas id="canvasInput" class="hidden"></canvas>
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
import OpencvQr from 'opencv-qr';

export default {
    name: 'CreatePage',
    components: {
        FilePond: vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
    },
    setup() {
        // 加载 OpenCV 模型文件
        const cvQr = new OpencvQr({
            dw: `${window.location.origin}/models/detect.caffemodel`,
            sw: `${window.location.origin}/models/sr.caffemodel`
        });
        return {
            cvQr
        };
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
        // 图片上传控件 - 初始化句柄
        handleFilePondInit() {
            console.log('FilePond has initialized');
        },
        // 图片上传控件 - 添加文件句柄
        async handleFilePondAddFile() {
            console.log('FilePond has added a file');
            await this.imageProcessing();
        },
        // 将添加的图片文件进行处理与识别
        async imageProcessing() {
            // 从图片上传组件获取图片实体
            const filepond = this.$refs.filepond.getFiles();
            const image = filepond[0].file;
            // 读取图片的 BLOB URL 地址
            const imgPath = URL.createObjectURL(image);
            // 借助 Canvas 把图片转为 ImageData 对象
            await this.loadImageToCanvas(imgPath, 'canvasInput');
            // 根据 ImageData 对象解析二维码内容
            await this.decodeQRCode();
        },
        // 加载图片到 Canvas 画布，以便生成 ImageData 对象用于像素识别
        async loadImageToCanvas(blobUrl, cavansId) {
            let canvas = document.getElementById(cavansId);
            let ctx = canvas.getContext('2d');
            let img = new Image();
            img.crossOrigin = 'anonymous';
            await new Promise((resolve, reject) => {
                // 定义图片加载完成事件
                img.onload = () => {
                    const { width, height } = img;
                    canvas.width = width;
                    canvas.height = height;
                    // 将图片绘制到 Canvas 画布上
                    ctx?.drawImage(img, 0, 0, width, height);
                    // 图像加载和绘制完成后，resolve Promise
                    resolve();
                };
                // 定义图像加载错误事件
                img.onerror = () => reject(new Error('Image load error'));
                // 设置图像的源 URL 并开始执行加载图像
                img.src = blobUrl;
            });
        },
        // 解析 Canvas 中的二维码
        decodeQRCode() {
            // 加载 Canvas 中的图像内容到 OpencvQr
            const img = this.cvQr.load('canvasInput');
            // 以字符串列表的形式返回解析结果
            const infos = img?.getInfos();
            // 将解析结果传递给表单
            this.qrcode.url = infos[0];
            // 清除 OpencvQr 中的图片并释放内存
            img?.clear();
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
