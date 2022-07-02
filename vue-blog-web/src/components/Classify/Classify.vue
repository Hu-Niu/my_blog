<template>
    <div class="classify-container">
        <!--  有倒序功能  -->
        <aside v-if="isTimeClassify">
            <div style="margin-bottom:20px;">
                <el-switch
                    v-model="reverse"
                    active-text="正序"
                    inactive-text="倒序"
                    active-color="#000000"
                    inactive-color="#13ce66"
                ></el-switch>
            </div>
            <el-timeline :reverse="reverse">
                <el-timeline-item v-for="item in timeList" hide-timestamp :key="item.create_time">
          <span
              :class="currentTime === item.create_time ? 'active' : ''"
              @click="clickTimeHandle(item.create_time)"
          >{{ item.create_time }}（{{ item.total_num }}）</span>
                </el-timeline-item>
            </el-timeline>
        </aside>
        <!--  无倒序功能  -->
        <aside v-if="isTagClassify">
            <el-timeline>
                <el-timeline-item v-for="item in tagList" hide-timestamp :key="item.uid">
          <span
              :class="currentTag === item.uid ? 'active' : ''"
              @click="clickTagHandle(item.uid)"
          >{{ item.tag_name }}（{{ item.total_blog_num }}）</span>
                </el-timeline-item>
            </el-timeline>
        </aside>
        <aside v-if="isSortClassify">
            <el-timeline>
                <el-timeline-item v-for="item in sortList" hide-timestamp :key="item.uid">
          <span
              :class="currentSort === item.uid ? 'active' : ''"
              @click="clickSortHandle(item.uid)"
          >{{ item.sort_name }}（{{ item.total_blog_num }}）</span>
                </el-timeline-item>
            </el-timeline>
        </aside>
        <article
            v-infinite-scroll="loadMore"
            infinite-scroll-immediate="false"
            infinite-scroll-disabled="disabled"
            v-if="isInfiniteReady"
        >
            <el-timeline>
                <el-timeline-item
                    v-for="item in articleList"
                    :timestamp="item.create_time"
                    :key="item.uid"
                    placement="top"
                >
                    <el-card>
                        <h4 @click="toArticleDetailHandle(item.uid)">{{ item.blog_title }}</h4>

                        <el-tag
                            v-if="item.is_original==1"
                            type="danger"
                            @click="toArticleListHandle(1,'isOriginal')"
                        >原创
                        </el-tag>
                        <el-tag
                            v-if="item.is_original==2"
                            type="info"
                            @click="toArticleListHandle(2,'isOriginal')"
                        >转载
                        </el-tag>
                        <el-tag
                            v-if="item.is_original==3"
                            type="info"
                            @click="toArticleListHandle(3,'isOriginal')"
                        >翻译
                        </el-tag>

                        <!-- <el-tag>{{ item.nick_name }}</el-tag> -->

                        <el-tag type="success"
                                @click="toArticleListHandle(item.blog_sort_id,'blogSort')"
                        >{{ item.sort_name }}
                        </el-tag>

                        <el-tag
                            v-for="tagItem in item.blog_tags"
                            :key="tagItem.blog_tag_id"
                            type="warning"
                            @click="toArticleListHandle(tagItem.blog_tag_id,'blogTag')"
                        >{{ tagItem.tag_name }}
                        </el-tag>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <p class="load-tip" v-if="hasMore">加载中...</p>
            <p class="load-tip" v-else>没有更多了</p>
        </article>
    </div>
</template>

<script>
export default {
    name: "Tags",
    props: {
        isTimeClassify: {
            type: Boolean,
            default: () => false,
        },
        isTagClassify: {
            type: Boolean,
            default: () => false,
        },
        isSortClassify: {
            type: Boolean,
            default: () => false,
        },

        currentTime: {
            type: String,
            default: () => '',
        },
        currentTag: {
            type: String,
            default: () => '',
        },
        currentSort: {
            type: String,
            default: () => '',
        },


        timeList: {
            type: Array,
            default: () => [],
        },
        tagList: {
            type: Array,
            default: () => [],
        },
        sortList: {
            type: Array,
            default: () => [],
        },


        articleList: {
            type: Array,
            default: () => [],
        },

        total: {
            type: Number,
            default: () => 0,
        },

        // 增加一个无限滚动显示隐藏控制器，为了销毁一下，重新加载数据
        isInfiniteReady: {
            type: Boolean,
            default: () => false,
        },


    },
    components: {},
    data() {
        return {
            reverse: false,
        }
    },
    methods: {
        toArticleDetailHandle(uid) {
            this.$emit('toArticleDetailHandle', uid)
        },
        toArticleListHandle(uid, type) {
            this.$emit('toArticleListHandle', {uid, type})
        },
        clickTimeHandle(time) {
            this.$emit('timeChange', time)
        },
        clickTagHandle(tagId) {
            this.$emit('tagChange', tagId)
        },
        clickSortHandle(sortId) {
            this.$emit('sortChange', sortId)
        },
        loadMore() {
            this.$emit('loadMore')
        },
    },
    computed: {
        hasMore() {
            return this.total > this.articleList.length
        },
        disabled() {
            return !this.hasMore
        },

    },
    watch: {},
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import "Classify";
</style>
