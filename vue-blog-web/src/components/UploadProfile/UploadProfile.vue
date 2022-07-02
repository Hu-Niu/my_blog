<template>
    <div class="upload-profile-container">
        <el-upload
            :action="action"
            :headers="headers"
            :multiple="false"
            :data="extraData"
            :show-file-list="false"
            accept=".jpg,.png,.jpeg"
            :on-success="uploadSuccessHandle"
            :on-error="uploadErrorHandle"
            :before-upload="beforeUploadHandle"
            class="upload-box"
        >
            <!--    图片展示区    -->
            <div class="img-box">
                <el-image
                    v-if="noProfileWaitToUpload"
                    :src="currentProfileUrl">
                </el-image>
                <el-image
                    v-else
                    :src="waitToUploadProfileUrl">
                </el-image>
                <div class="mask">
                    <div class="icon-box">
                        <svg-icon icon-class="plus"></svg-icon>
                    </div>
                    <div class="icon-tip">点击修改头像</div>
                </div>
            </div>
            <!--    提示内容    -->
            <div v-if="noProfileWaitToUpload" slot="tip" class="el-upload__tip">
                <div class="profile-title">我的头像</div>
                <div class="profile-tip">支持jpg、png、jpeg格式大小1M以内的图片</div>
            </div>
            <!--   提示撤销   -->
            <div v-else slot="tip" class="el-upload__tip">
                <div class="cancel-upload" @click="cancelUploadProfileHandle">撤销上传</div>
                <div class="profile-tip">点击下方保存修改后生效</div>
            </div>
        </el-upload>
    </div>
</template>

<script>
import {MessageBox} from "element-ui";

export default {
    name: "UploadProfile",
    props: {},
    components: {},
    data() {
        return {
            // 上传图片时携带的额外参数
            extraData: {},

            // 上传标识，没有头像等待上传，默认为true，当上传头像成功后，改为false
            noProfileWaitToUpload: true,

            // 等待上传的图片url地址
            waitToUploadProfileUrl: '',
            // 当前的图片地址
            currentProfileUrl: ''

        }
    },
    methods: {
        cancelUploadProfileHandle() {
            this.waitToUploadProfileUrl = ''
            this.noProfileWaitToUpload = true
        },
        beforeUploadHandle(file) {
            const isLt1M = file.size / 1024 / 1024 < 1;

            if (!isLt1M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isLt1M;
        },
        uploadSuccessHandle(res, file) {
            if (res.code === 1) {
                this.waitToUploadProfileUrl = res.data[0].url
                this.noProfileWaitToUpload = false
            } else {
                this.uploadErrorHandle(res)
            }
        },
        uploadErrorHandle(err, file) {
            if (err.status === 401) {
                MessageBox.confirm(
                    'token已过期',
                    '重新登录',
                    {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        showClose: false,
                        closeOnClickModal: false,
                        showCancelButton: false,
                        type: 'warning'
                    }
                ).then(async () => {
                    //1、清除已过期token
                    //2、跳转到登录页
                    await this.$store.dispatch('clearAll')
                    await this.$router.push('/')
                })
            } else {
                this.$message({
                    message: err.extendInfo ? err.extendInfo : err.message,
                    type: 'error',
                    duration: 1500,
                })
            }
        },

    },
    computed: {
        // 图片上传的地址
        action() {
            let baseURL
            if(process.env.NODE_ENV === 'development'){ // 开发环境
                baseURL = myConfig.apiUrlDevelopment
            } else { // 生产环境
                if(this.isDemoVersion){
                    baseURL = myConfig.apiUrlDemo
                } else {
                    baseURL = myConfig.apiUrlProduction
                }
            }

            return `${baseURL}/file/uploadFile`
        },
        // 是否是演示版本
        isDemoVersion() {
            return isDemoVersion // 加载到了全局，直接获取
        },
        // 图片上传的携带的请求头
        headers() {
            return {
                Authorization: this.$store.state.user.token
            }
        },

    },
    watch: {},
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import "UploadProfile";
</style>
