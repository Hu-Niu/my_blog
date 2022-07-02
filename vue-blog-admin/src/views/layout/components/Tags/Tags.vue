<template>
    <div class="tags-view-container">
        <div class="left-btn" @click="scrollLeftHandle(-200)">
            <div class="scroll-left">
                <i class="el-icon-arrow-left"></i>
            </div>
        </div>
        <div class="right-btn">
            <div class="scroll-right" @click="scrollLeftHandle(200)">
                <i class="el-icon-arrow-right"></i>
            </div>
            <el-dropdown trigger="click">
                <div class="scroll-left">
                    <i class="el-icon-close"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="closeAllTags">关闭所有</el-dropdown-item>
                    <el-dropdown-item @click.native="closeOtherTags">关闭其他</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="inner-box" ref="innerBox">
            <div
                v-for=" item in tagNavList"
                :key="item.name"
                class="tags-view-item"
                :class="current === item.name ? 'active' : '' "
                @click="toPathHandle(item)"
            >
                {{ item.meta.title }}
                <i
                    v-if="item.meta.title!=='首页'"
                    class='el-icon-close'
                    @click.stop="deleteTagByName(item.name)"
                ></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Tags",
    props: {
        tagNavList: {
            type: Array,
            default: () => []
        },
    },
    components: {},
    data() {
        return {}
    },
    methods: {
        closeAllTags(){
            this.$emit('closeAllTags')
        },
        closeOtherTags(){
            this.$emit('closeOtherTags')
        },
        scrollLeftHandle(offset){
            const innerBox = this.$refs['innerBox']
            console.log(innerBox.scrollLeft)
            innerBox.scrollTo({
                left: innerBox.scrollLeft + offset,
                top: 0,
                behavior: 'smooth'
            })
        },
        deleteTagByName(name) {
            this.$emit('deleteTagByName', name)
        },
        toPathHandle(item) {
            // 多加一个url参数，为了传出去的时候和侧边导航共用一个事件函数
            item.url = item.path
            this.$emit('toPathHandle', item)
        },
    },
    computed: {
        current() {
            return this.$route.name
        },
    },
    watch: {},
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import './Tags';
</style>
