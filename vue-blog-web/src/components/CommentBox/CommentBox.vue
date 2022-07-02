<template>
    <div class="comment-box-container">
        <div class="top-box">
            <div v-if="!isLogin" class="profile">
                <svg-icon icon-class="user"></svg-icon>
            </div>
            <div v-else class="profile">
                <el-image
                    :src="loginUserInfo.user_profile"
                    alt="头像"
                />
            </div>
            <div class="input-box">
                <el-input
                    type="textarea"
                    placeholder="既然来了，那就留下些什么吧~"
                    @focus="commentInputFocus"
                    @input="commentInputHandle"
                    :value="content"
                    :maxlength="maxlength"
                    :autosize="{minRows: 6, maxRows: 6 }"
                />
            </div>
        </div>
        <div class="btns">
            <div class="remanent">还能输入{{ remanentNum }}个字符</div>
            <div class="face-smile" v-if="remanentNum>1">
                <div @click="openEmojis">
                    <svg-icon icon-class="smile"/>
                </div>
                <ul v-if="isShowEmoji">
                    <li v-for="(item, index) in faceList" :key="index" @click="insertEmoji(item)">{{ item }}</li>
                </ul>
            </div>
            <div class="face-smile no-smile" v-else>
                <div>
                    <svg-icon icon-class="no-smile"/>
                </div>
            </div>
            <el-button type="info" @click="cancelMessageHandle">取消评论</el-button>
            <el-button type="primary" @click="sendMessageHandle">发送评论</el-button>
        </div>

    </div>
</template>

<script>
import faceList from './emojis'

export default {
    name: "CommentBox",
    props: {
        // 当前登录人的信息 https://cn.vuejs.org/v2/guide/components-props.html
        // 设置多种数据类型
        loginUserInfo: [String, Object],
        // 是否登录
        isLogin: {
            type: Boolean,
            default: () => false
        },
        content: {
            type: String,
            default: () => ''
        },

        // 评论来源：-1，关于我；1，留言板；2，专题；3，文章
        commentSource: [String, Number],
        // 来源的id：存放对应来源的id，专题有专题uid，文章有文章uid，留言板uid给个默认值1，关于我默认给个-1
        sourceId: [String, Number],

    },
    components: {},
    data() {
        return {
            faceList,
            isShowEmoji: false,
            maxlength: 500
        }
    },
    methods: {
        openEmojis() {
            this.isShowEmoji = !this.isShowEmoji
        },
        insertEmoji(emoji) {
            if (!this.isLogin) {
                this.$emit('goToLogin')
            } else {
                this.$emit('insertEmoji', emoji)
            }
        },
        commentInputHandle(val) {
            this.$emit('commentInputHandle', val)
        },
        commentInputFocus() {
            if (!this.isLogin) {
                this.$emit('goToLogin')
            }
            this.isShowEmoji = false
        },
        sendMessageHandle() {
            if (!this.isLogin) {
                this.$emit('goToLogin')
            } else {
                this.$emit('sendMessageHandle')
            }
        },
        cancelMessageHandle() {
            this.$emit('cancelMessageHandle')
        },
    },
    computed: {
        remanentNum() {
            if (!this.content) return this.maxlength

            return this.maxlength - this.content.length
        },
    },
    watch: {},
    mounted() {
    },
    created() {
    },
}
</script>

<style scoped lang="scss">
@import "CommentBox";
</style>
