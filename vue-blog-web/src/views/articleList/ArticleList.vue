<template>
    <div class="article-list-container">
        <!--  左边的轮播图、及文章列表  -->
        <main>
            <!--   文章列表   -->
            <Articles
                :blogList="articleList"
                :total="total"
                @toArticleDetailHandle="toArticleDetailHandle"
                @loadMoreHandle="loadMoreHandle"
            />
        </main>

        <!--  右边的推荐文章、及标签友链等  -->
        <aside>
            <!--   关注我   -->
            <FollowUs
                title="关注我"
                :list="contactWayList"
            />
            <!--   特别推荐：三级推荐   -->
            <ThirdRecommend
                title="特别推荐"
                :list="level3List"
            />
            <!--   特别推荐：四级推荐   -->
            <FourthRecommend
                title="推荐文章"
                :list="level4List"
            />
            <!--   点击排行   -->
            <FourthRecommend
                title="点击排行"
                :list="hotArticleList"
            />
        </aside>
    </div>
</template>

<script>
import Articles from "../../components/Articles/Articles";
import FollowUs from "../../components/FollowUs/FollowUs";
import ThirdRecommend from "../../components/ThirdRecommend/ThirdRecommend";
import FourthRecommend from "../../components/FourthRecommend/FourthRecommend";


import {blogApi} from '/src/api/blog'
import {contactWayApi} from "../../api/contactWay";

export default {
    name: "ArticleList",
    props: {},
    components: {
        Articles,
        FollowUs,
        ThirdRecommend,
        FourthRecommend,
    },
    data() {
        return {
            level3List: [], // 三级推荐
            level4List: [], // 四级推荐
            contactWayList: [], // 关于我们
            hotArticleList: [], // 热门文章

            articleList: [], // 文章列表
            total: null, // 文章列表总条数
            searchParam: {
                blogStatus: 1,
                currentPage: 1, // 当前页
                pageSize: 20, // 列表总条数
                blogSortId: '', // 文章分类
                blogTag: '', // 文章标签
                isOriginal: '', // 1 原创，2 转载，3 翻译
            },
        }
    },
    methods: {
        toArticleDetailHandle(articleUid) {
            const routerData = this.$router.resolve({
                path: `/articleDetail/${articleUid}`
            })
            window.open(routerData.href,'_blank')
        },
        loadMoreHandle() {
            this.searchParam.currentPage++
            this.getArticleList()
        },
        async getArticleList() {
            let params = {
                blogStatus: this.searchParam.blogStatus,
                blogTag: this.searchParam.blogTag,
                blogSortId: this.searchParam.blogSortId,
                isOriginal: this.searchParam.isOriginal,
                currentPage: this.searchParam.currentPage, // 当前页
                pageSize: this.searchParam.pageSize, // 列表总条数
            }
            let {data} = await blogApi.queryArticlePage(params)
            this.articleList = [...this.articleList, ...data.data.result]
            this.total = data.data.total
        },
        async getRecommendArticleList(levelId) {
            let params = {
                recommendLevel: levelId,
                blogStatus: 1,
            }
            let {data} = await blogApi.queryArticleAll2(params)
            switch (levelId) {
                case 1:
                    this.level1List = data.data
                    break;
                case 2:
                    this.level2List = data.data
                    break;
                case 3:
                    this.level3List = data.data
                    break;
                case 4:
                    this.level4List = data.data
                    break;
            }
        },
        async getContactWayList() {
            let params = {
                isShow: 1,
            }
            let {data} = await contactWayApi.queryContactWayAll(params)
            this.contactWayList = data.data
        },
        async getHotArticleList() {
            let params = {
                currentPage: 1,
                pageSize: 5,
            }
            let {data} = await blogApi.queryHotArticlePage(params)
            this.hotArticleList = data.data
        },


    },
    computed: {},
    watch: {},
    mounted() {
        let {blogSort, blogTag, isOriginal} = this.$route.query
        this.searchParam.blogSortId = blogSort ? blogSort : ''
        this.searchParam.blogTag = blogTag ? blogTag : ''
        this.searchParam.isOriginal = isOriginal ? isOriginal : ''


        this.getRecommendArticleList(3)
        this.getRecommendArticleList(4)


        this.getContactWayList()

        this.getHotArticleList()

        this.getArticleList()
    }
}
</script>

<style scoped lang="scss">
@import "ArticleList";
</style>
