<template>
    <div class="archive-container">
        <!--  座右铭  -->
        <p class="motto">不要轻易放弃。学习成长的路上，我们长路漫漫，只因学无止境。</p>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :before-leave="beforeLeaveHandle">
            <el-tab-pane label="网站首页" name="home" class="home-btn"/>
            <el-tab-pane label="时间" name="time">
                <Classify
                    :isTimeClassify="true"
                    :isTagClassify="false"
                    :isSortClassify="false"
                    :currentTime="currentTime"
                    :timeList="timeList"
                    :articleList="articleList"
                    :total="total"
                    :isInfiniteReady="isInfiniteReady"
                    @timeChange="timeChange"
                    @loadMore="loadMore"
                    @toArticleDetailHandle="toArticleDetailHandle"
                    @toArticleListHandle="toArticleListHandle"
                />
            </el-tab-pane>
            <el-tab-pane label="标签" name="tags">
                <Classify
                    :isTimeClassify="false"
                    :isTagClassify="true"
                    :isSortClassify="false"
                    :currentTag="currentTag"
                    :tagList="tagList"
                    :articleList="articleList"
                    :total="total"
                    :isInfiniteReady="isInfiniteReady"
                    @tagChange="tagChange"
                    @loadMore="loadMore"
                    @toArticleDetailHandle="toArticleDetailHandle"
                    @toArticleListHandle="toArticleListHandle"
                />
            </el-tab-pane>
            <el-tab-pane label="分类" name="sort">
                <Classify
                    :isTimeClassify="false"
                    :isTagClassify="false"
                    :isSortClassify="true"
                    :currentSort="currentSort"
                    :sortList="sortList"
                    :articleList="articleList"
                    :total="total"
                    :isInfiniteReady="isInfiniteReady"
                    @sortChange="sortChange"
                    @loadMore="loadMore"
                    @toArticleDetailHandle="toArticleDetailHandle"
                    @toArticleListHandle="toArticleListHandle"
                />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Classify from "../../components/Classify/Classify";
import {blogApi} from '/src/api/blog'
import {blogTagApi} from '/src/api/blogTag'
import {blogSortApi} from '/src/api/blogSort'

export default {
    name: "Archive",
    props: {},
    components: {
        Classify,
    },
    data() {
        return {
            activeName: 'time', // 默认先选中time

            articleList: [], // 文章列表
            searchParam: {
                blogStatus: 1, // 1 表示发布的文章
                currentPage: 1, // 当前页
                pageSize: 10, // 列表总条数
            },

            // time 按时间分类
            timeList: [], // 按时间归类，时间列表
            currentTime: '', // 当前选中的时间

            // tags 按标签分类
            tagList: [],
            currentTag: '', //当前选中的 tag

            // sort 按分类
            sortList: [],
            currentSort: '', //当前选中的 sort


            total: 0, // 当前总数

            isInfiniteReady: false,
        }
    },
    methods: {
        toArticleDetailHandle(articleUid) {
            const routerData = this.$router.resolve({
                path: `/articleDetail/${articleUid}`
            })
            window.open(routerData.href,'_blank')
        },
        toArticleListHandle(obj) {
            const routerData = this.$router.resolve({
                path: `/articleList?${obj.type}=${obj.uid}`
            })
            window.open(routerData.href,'_blank')
        },
        loadMore() {
            this.searchParam.currentPage++
            this.getArticleList(this.activeName)
        },
        async handleClick(e) {
            switch (e.name) {
                case 'time':
                    this.initParams()
                    await this.getCreateTimeList()
                    break
                case 'tags':
                    this.initParams()
                    await this.getTagList()
                    break
                case 'sort':
                    this.initParams()
                    await this.getSortList()
                    break
            }
        },
        initParams() {
            this.searchParam.currentPage = 1
            this.articleList = []
        },
        beforeLeaveHandle(activeName, oldActiveName) {
            if (activeName === 'home') {
                this.$router.push('/')
                return false
            }
        },
        async getCreateTimeList() {
            let {data} = await blogApi.queryAllArticleCreateTimeList()
            this.timeList = data.data

            // 默认获取第一个时间的文章列表
            this.currentTime = this.timeList[0].create_time
            await this.getArticleList(this.activeName)

        },
        async getTagList() {
            let {data} = await blogTagApi.queryBlogTagAll2()
            this.tagList = data.data

            // 默认获取第一个
            this.currentTag = this.tagList[0].uid
            await this.getArticleList(this.activeName)
        },
        async getSortList() {
            let {data} = await blogSortApi.queryArticleSortAll2()
            this.sortList = data.data

            // 默认获取第一个
            this.currentSort = this.sortList[0].uid
            await this.getArticleList(this.activeName)
        },

        async getArticleList(activeName) {
            let params = {
                blogStatus: '' + this.searchParam.blogStatus, // 发布状态为1的表示文章为发布状态
                currentPage: this.searchParam.currentPage, // 当前页
                pageSize: this.searchParam.pageSize, // 列表总条数
            }

            switch (activeName) {
                case 'time':
                    params.createTime = this.currentTime
                    break
                case 'tags':
                    params.blogTag = this.currentTag
                    break
                case 'sort':
                    params.blogSortId = this.currentSort
                    break
            }

            let {data} = await blogApi.queryArticlePage(params)
            this.articleList = [...this.articleList, ...data.data.result]
            this.total = data.data.total

            // 增加一个无限滚动显示隐藏控制器，为了销毁一下，重新加载数据
            this.isInfiniteReady = true
        },
        timeChange(val) {
            this.currentTime = val
            this.isInfiniteReady = false
            this.initParams()
            this.getArticleList(this.activeName)
        },
        tagChange(val) {
            this.currentTag = val
            this.isInfiniteReady = false
            this.initParams()
            this.getArticleList(this.activeName)
        },
        sortChange(val) {
            this.currentSort = val
            this.isInfiniteReady = false
            this.initParams()
            this.getArticleList(this.activeName)
        },

    },
    computed: {},
    watch: {},
    mounted() {
        this.getCreateTimeList()
    },
}
</script>

<style scoped lang="scss">
@import "Archive";
</style>
