<template>
    <div class="public-account-dialog-container">
        <div class="reward-dialog-container">
            <el-dialog
                :visible.sync="isShowRewardDialog"
            >
                <p class="tip">微信号</p>
                <div class="img-box">
                    <el-image
                        style="width: 100%;height: 100%;"
                        :src="imgUrl"
                    ></el-image>
                </div>
                <p class="tip">扫码添加</p>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: "PublicAccountDialog",
    props: {},
    components: {},
    data() {
        return {
            isShowRewardDialog: false,
            paymentMode: 'alipay',
        }
    },
    methods: {
        showDialog(){
            this.isShowRewardDialog = true
        }
    },
    computed: {
        imgUrl(){
            return require('@/assets/public_account.jpg')
        },
    },
    watch: {},
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import "PublicAccountDialog";
</style>
