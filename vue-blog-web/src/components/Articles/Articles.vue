<template>
    <div class="articles-container">
        <article v-for="item in blogList " :key="item.uid">
            <h3 @click="toArticleDetailHandle(item.uid)">{{ item.blog_title }}</h3>
            <div class="info-box">
                <!--    左侧封面图    -->
                <div
                    v-if="item.cover_url"
                    class="left-img"
                    @click="toArticleDetailHandle(item.uid)"
                >
                    <el-image
                        :alt="item.blog_title"
                        :src="item.cover_url"
                        style="width: 100%;height: 100%;"
                    ></el-image>
                </div>
                <div class="right-info">
                    <!--    摘要      -->
                    <p>{{ item.blog_summary }}</p>
                    <ul>
                        <!--    作者        -->
                        <li class="author">
                            <svg-icon icon-class="author"></svg-icon>
                            <span>{{ item.nick_name }}</span>
                        </li>
                        <!--    文章类别        -->
                        <li class="type">
                            <svg-icon icon-class="type"></svg-icon>
                            <span
                                @click="toArticleListHandle(item.blog_sort_id,'blogSort')"
                            >{{ item.sort_name }}</span>
                        </li>
                        <!--    点击量        -->
                        <li class="visited">
                            <svg-icon icon-class="eye"></svg-icon>
                            <span>{{ item.clicks }}</span>
                        </li>
                        <!--    点赞数量        -->
                        <li class="liked">
                            <svg-icon icon-class="heart"></svg-icon>
                            <span>{{ item.like_count ? item.like_count : 0 }}</span>
                        </li>
                        <!--    创建时间        -->
                        <li class="createTime">
                            <svg-icon icon-class="clock"></svg-icon>
                            <span>{{ item.create_time }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </article>

        <div v-if="hasMore" class="load-more-container">
            <span @click="loadMoreHandle">查看更多</span>
        </div>

        <div v-else class="no-more-container">
            <span>没有更多了</span>
        </div>


    </div>
</template>

<script>

export default {
    name: "Articles",
    props: {
        total: {
            type: Number,
            default: () => 0,
        },
        blogList: {
            type: Array,
            default: () => [],
        },
    },
    components: {},
    data() {
        return {}
    },
    methods: {
        loadMoreHandle() {
            this.$emit('loadMoreHandle')
        },
        toArticleDetailHandle(uid) {
            this.$emit('toArticleDetailHandle', uid)
        },
        toArticleListHandle(uid, type) {
            this.$emit('toArticleListHandle', {uid, type})
        },


    },
    computed: {
        hasMore() {
            return this.blogList.length < this.total
        },
    },
    watch: {},
    mounted() {

    }
}
</script>

<style scoped lang="scss">
@import "Articles";
</style>
