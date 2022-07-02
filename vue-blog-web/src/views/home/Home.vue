<template>
    <div class="home-container">
        <!--  左边的轮播图、及文章列表  -->
        <main>
            <!--   轮播图：一级推荐   -->
            <FirstRecommend
                :list="level1List"
                @toArticleDetailHandle="toArticleDetailHandle"
            />
            <!--   文章列表   -->
            <Articles
                :blogList="articleList"
                :total="total"
                @toArticleDetailHandle="toArticleDetailHandle"
                @toArticleListHandle="toArticleListHandle"
                @loadMoreHandle="loadMoreHandle"
            />
        </main>

        <!--  右边的推荐文章、及标签友链等  -->
        <aside>
            <!--   二级推荐文章：只显示两篇，在轮播图的右侧   -->
            <SecondRecommend
                :list="level2List"
                @toArticleDetailHandle="toArticleDetailHandle"
            />
            <!--   热门标签   -->
            <HotTags
                title="热门标签"
                :list="hotArticleTagList"
                @toArticleListHandle="toArticleListHandle"
            />
            <!--   关注我   -->
            <FollowUs
                title="关注我"
                :list="contactWayList"
            />
            <!--   特别推荐：三级推荐   -->
            <ThirdRecommend
                title="特别推荐"
                :list="level3List"
                @toArticleDetailHandle="toArticleDetailHandle"
            />
            <!--   特别推荐：四级推荐   -->
            <FourthRecommend
                title="推荐文章"
                :list="level4List"
                @toArticleDetailHandle="toArticleDetailHandle"
            />
            <!--   点击排行   -->
            <FourthRecommend
                title="点击排行"
                :list="hotArticleList"
                @toArticleDetailHandle="toArticleDetailHandle"
            />
            <!--   友情链接   -->
            <FriendLink
                title="友情链接"
                :list="friendLinkList"
                @toFriendLinkHandle="toFriendLinkHandle"
            />
        </aside>
    </div>
</template>

<script>
import FirstRecommend from "../../components/FirstRecommend/FirstRecommend";
import SecondRecommend from "../../components/SecondRecommend/SecondRecommend";
import Articles from "../../components/Articles/Articles";
import HotTags from "../../components/HotTags/HotTags";
import FollowUs from "../../components/FollowUs/FollowUs";
import ThirdRecommend from "../../components/ThirdRecommend/ThirdRecommend";
import FourthRecommend from "../../components/FourthRecommend/FourthRecommend";
import FriendLink from "../../components/FriendLink/FriendLink";


import {blogApi} from '/src/api/blog'
import {contactWayApi} from "../../api/contactWay";
import {friendLinkApi} from "../../api/friendLink";
import {blogTagApi} from "../../api/blogTag";

export default {
    name: "Home",
    props: {},
    components: {
        FirstRecommend,
        SecondRecommend,
        Articles,
        HotTags,
        FollowUs,
        ThirdRecommend,
        FourthRecommend,
        FriendLink,
    },
    data() {
        return {
            level1List: [], // 一级推荐
            level2List: [], // 二级推荐
            level3List: [], // 三级推荐
            level4List: [], // 四级推荐
            contactWayList: [], // 关于我们
            hotArticleList: [], // 热门文章
            hotArticleTagList: [], // 热门标签
            friendLinkList: [], // 友情链接

            articleList: [], // 文章列表
            total: null, // 文章列表总条数
            searchParam: {
                blogStatus: 1,
                currentPage: 1, // 当前页
                pageSize: 20, // 列表总条数
            },
        }
    },
    methods: {
        toFriendLinkHandle(url){
            window.open(url,'_blank')
        },
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

        loadMoreHandle() {
            this.searchParam.currentPage++
            this.getArticleList()
        },
        async getArticleList() {
            let params = {
                blogStatus: this.searchParam.blogStatus,
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
        async getHotArticleTagList() {
            let params = {
                currentPage: 1,
                pageSize: 20,
            }
            let {data} = await blogTagApi.queryHotArticleTagPage(params)
            this.hotArticleTagList = data.data
        },


        async getFriendLinkList() {
            let params = {
                isPublish: 1,
            }
            let {data} = await friendLinkApi.queryFriendLinkAll(params)
            this.friendLinkList = data.data
        },

    },
    computed: {},
    watch: {},
    mounted() {
        this.getRecommendArticleList(1)
        this.getRecommendArticleList(2)
        this.getRecommendArticleList(3)
        this.getRecommendArticleList(4)


        this.getContactWayList()

        this.getHotArticleList()
        this.getHotArticleTagList()
        this.getFriendLinkList()

        this.getArticleList()
    }
}
</script>

<style scoped lang="scss">
@import "Home";
</style>
