<template>
    <div class="article-feature-btn-container">
        <div class="feature-box">
            <el-badge
                :value="likeCountList.length"
                :class="['btn-box',{'active': isAlreadyLike}]"
                :hidden="likeCountList.length === 0"
                @click.native="likeArticleHandle"
            >
                <svg-icon icon-class="heart"/>
            </el-badge>

            <el-badge
                :value="commentTotal"
                class="btn-box"
                @click.native="toComment"
                :hidden="commentTotal === 0"
            >
                <svg-icon icon-class="comment"/>
            </el-badge>
        </div>
    </div>
</template>

<script>
export default {
    name: "ArticleFeatureBtn",
    props: {
        likeCountList: {
            type: Array,
            default: () => []
        },
        commentTotal: {
            type: Number,
            default: 0
        },
        // 设置多种数据类型
        loginUserInfo: [String, Object],
        // 是否登录
        isLogin: {
            type: Boolean,
            default: () => false
        },
    },
    components: {},
    data() {
        return {}
    },
    methods: {
        toComment() {
            this.$emit('toComment')
        },
        likeArticleHandle() {
            this.$emit('likeArticleHandle', this.isAlreadyLike)
        },

    },
    computed: {
        isAlreadyLike() {
            if (!this.isLogin) return false
            return this.likeCountList.findIndex(item => item.like_person_id === this.loginUserInfo.uid) > -1
        }
    },
    watch: {},
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import "ArticleFeatureBtn";
</style>
