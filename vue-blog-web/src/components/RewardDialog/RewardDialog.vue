<template>
    <div class="reward-dialog-container">
        <el-dialog
            :visible.sync="isShowRewardDialog"
        >
            <p class="tip">暂未开发！</p>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "RewardDialog",
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
        
    },
    watch: {},
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import "RewardDialog";
</style>
