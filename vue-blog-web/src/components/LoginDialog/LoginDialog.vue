<template>
    <div class="login-dialog-container">
        <el-dialog
            :modal-append-to-body='false'
            title="登录"
            :visible.sync="isShow"
            width="300px"
            :close-on-click-modal="false"
            :before-close="beforeCloseHandle"
            custom-class="login-dialog-custom"
        >
            <div class="icon-btns-box">

                <el-tooltip content="微博" effect="light" placement="bottom">
                    <div class="icon-box microblog" @click="microBlogClickHandle">
                        <svg-icon icon-class="microblog"></svg-icon>
                    </div>
                </el-tooltip>

                <el-tooltip content="QQ" effect="light" placement="bottom">
                    <div class="icon-box qq" @click="qqClickHandle">
                        <svg-icon icon-class="qq-login"></svg-icon>
                    </div>
                </el-tooltip>

                <el-tooltip content="Gitee" effect="light" placement="bottom">
                    <div class="icon-box gitee" @click="giteeClickHandle">
                        <svg-icon icon-class="gitee"></svg-icon>
                    </div>
                </el-tooltip>

            </div>

            <div class="tip-message-box">
                <p>注册登录即表示同意 <a href="javascript:;" onClick="return false;">用户协议</a>、<a href="javascript:;" onClick="return false;">隐私政策</a></p>
                <p>当前仅支持Gitee登录</p>
            </div>

        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "LoginDialog",
    props: {},
    components: {},
    data() {
        return {
            isShow: true
        }
    },
    methods: {
        beforeCloseHandle(done) {
            this.$emit('closeLoginHandle')
            done()
        },
        giteeClickHandle() {
            this.$emit('giteeClickHandle')
        },
        qqClickHandle() {
            this.$emit('qqClickHandle')
        },
        microBlogClickHandle() {
            this.$emit('microBlogClickHandle')
        },


    },
    computed: {},
    watch: {},
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import "LoginDialog";
</style>
