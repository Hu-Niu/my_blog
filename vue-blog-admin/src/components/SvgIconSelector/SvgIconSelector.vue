<template>
    <div class="svg-icon-selector-container">
        <el-dialog
            title="双击选择icon"
            :visible.sync="isShowDialog"
            width="700px"
        >
            <el-row justify="space-around" class="icon-box">
                <el-col @dblclick.native="chooseSvgIconHandle(item)" :span="4" v-for="item in svgIconList" :key="item">
                    <div class="item">
                        <svg-icon :icon-class="item"></svg-icon>
                    </div>
                    <div style="font-size: 12px;cursor: pointer">{{ item }}</div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowDialog = false">取 消</el-button>
                <el-button type="primary" @click="isShowDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "SvgIconSelector",
    props: {},
    components: {},
    data() {
        return {
            isShowDialog: false,
            svgIconList: [],
        }
    },
    methods: {
        chooseSvgIconHandle(name) {
            console.log(name, 'chooseSvgIconHandle')
            this.$emit('chooseSvgIconHandle',name)
        },
        showDialog() {
            this.isShowDialog = true
        },
        closeDialog() {
            this.isShowDialog = false
        },

        handleClose(done) {
            console.log('已关闭')
            done()
        },
    },
    computed: {},
    watch: {},
    mounted() {
        /**
         * require.context('需要读取的文件路径', false, /.svg$/)
         *  require.context接收三个参数，第一个是文件路径，第二个是是否读取子文件。false不读取，
         *  第三个参数 是个正则表达式： .svg匹配以.svg文件结尾的文件
         */

            // 得到的都是 ./xxx.svg 格式 需要再替换一下
        const filesString = require.context('@/icons/svg', false, /.svg$/).keys().toString()
        const reg = /\.\/([\w|-]+)\.svg/g
        filesString.replace(reg, (_, $1) => {
            this.svgIconList.push($1)
        })
    }
}
</script>

<style scoped lang="scss">
@import "SvgIconSelector";
</style>
