<template>
    <div class="article-detail-container">
        <!--  座右铭  -->
        <p class="motto"></p>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :before-leave="beforeLeaveHandle">
            <el-tab-pane label="网站首页" name="home" class="home-btn"/>

            <el-tab-pane label="文章详情" name="article">
                <!--  fix定位在最左侧的功能按钮、点赞、留言   -->
                <ArticleFeatureBtn
                    :commentTotal="total"
                    :likeCountList="likeCountList"
                    :loginUserInfo="loginUserInfo"
                    :isLogin="isLogin"
                    @toComment="toComment"
                    @likeArticleHandle="likeArticleHandle"
                />

                <!--  左边的自我介绍  -->
                <main>
                    <header>
                        <!--     文章标题       -->
                        <h2>{{ articleInfo.blog_title }}</h2>

                        <!--      文章作者信息、点击量、分类、点赞数      -->
                        <ul>
                            <!--    作者        -->
                            <li class="author">
                                <svg-icon icon-class="author"></svg-icon>
                                <span>{{ articleInfo.nick_name }}</span>
                            </li>
                            <!--    文章类别        -->
                            <li class="type">
                                <svg-icon icon-class="type"></svg-icon>
                                <span @click="toArticleListHandle(articleInfo.blog_sort_id,'blogSort')">{{
                                        articleInfo.sort_name
                                    }}</span>
                            </li>
                            <!--    点击量        -->
                            <li class="visited">
                                <svg-icon icon-class="eye"></svg-icon>
                                <span>{{ articleInfo.clicks }}</span>
                            </li>
                            <!--    点赞数量        -->
                            <li class="liked">
                                <svg-icon icon-class="heart"></svg-icon>
                                <span>{{ likeCountList.length }}</span>
                            </li>
                            <!--    创建时间        -->
                            <li class="createTime">
                                <svg-icon icon-class="clock"></svg-icon>
                                <span>{{ articleInfo.create_time }}</span>
                            </li>
                        </ul>

                        <!--      标签      -->
                        <div class="tags-box">
                            <el-tag
                                v-for="tag in articleInfo.blog_tags"
                                type="warning"
                                :key="tag.blog_tag_id"
                                @click="toArticleListHandle(tag.blog_tag_id,'blogTag')"
                            >
                                {{ tag.tag_name }}
                            </el-tag>
                        </div>

                        <!--   版权  1为原创 2为转载 3为翻译   -->
                        <div class="article-origin" v-if="articleInfo.is_original === 1">
                            <p>
                                <strong>版权</strong>
                                <span>本文为 @pupublog 原创文章，转载请注明文章来源</span>
                            </p>
                            <p>
                                <span>{{ baseUrl }}/#/articleDetail/{{ articleInfo.uid }}</span>
                            </p>
                        </div>
                        <div class="article-origin" v-else-if="articleInfo.is_original === 2">
                            <p>
                                <span>本文转载自：{{articleInfo.origin_address}}</span>
                            </p>
                            <p>
                                <span>转载仅为了方便学习使用，如有侵权立即删除</span>
                            </p>
                        </div>
                        <div class="article-origin" v-else-if="articleInfo.is_original === 3">
                            <p>
                                <span>本文翻译自：{{articleInfo.origin_address}}</span>
                            </p>
                            <p>
                                <span>翻译仅为了方便学习使用，如有侵权立即删除</span>
                            </p>
                        </div>

                    </header>
                    <article
                        class="html-box"
                        v-html="blogContent"
                        v-highlight
                        @click="showBigPic"
                    />
                    <footer style="max-width: 920px;margin: 0 auto;padding-bottom: 230px;">
                        <!-- 关注我、打赏 -->

                        <div class="extra-feature-btn-box">
                            <el-button @click="showPublicAccountDialog" type="danger" icon="el-icon-s-promotion">关注我
                            </el-button>
                            <el-button @click="showRewardDialog" type="danger" icon="el-icon-bank-card">打赏一下</el-button>
                        </div>

                        <!-- 点赞框 -->
                        <RewardDialog
                            ref="RewardDialog"
                        />
                        <!-- 公众号框 -->
                        <PublicAccountDialog
                            ref="PublicAccountDialog"
                        />


                        <hr>
                        <h3 ref="comment" style="margin-bottom: 20px;">留言（{{ total }}）</h3>
                        <div style="padding-bottom: 20px">
                            <CommentMessageList
                                ref="commentMessageList"
                                :comments="commentList"

                                :loginUserInfo="loginUserInfo"
                                :isLogin="isLogin"

                                :commentSource="form.commentSource"
                                :sourceId="form.sourceId"

                                :hasMore="hasMore"
                                @loadMoreHandle="loadMoreHandle"
                                @refreshCommentList="refreshCommentList"
                                @deleteCommentsHandle="deleteCommentsHandle"
                                @publishStandpointHandle="publishStandpointHandle"
                                @reportCommentHandle="reportCommentHandle"

                            />
                        </div>
                        <CommentBox
                            :loginUserInfo="loginUserInfo"
                            :isLogin="isLogin"
                            :content="form.commentContent"

                            :commentSource="form.commentSource"
                            :sourceId="form.sourceId"


                            @goToLogin="goToLogin"
                            @commentInputHandle="commentInputHandle"
                            @sendMessageHandle="sendMessageHandle"
                            @cancelMessageHandle="cancelMessageHandle"
                            @insertEmoji="insertEmoji"

                        />
                    </footer>
                </main>
                <!--  右边文章目录  -->
                <aside>
                    <!--                    <ArticleCatalogue
                                            ref="stick-box2"
                                            v-bind="catalogProps"
                                            :htmlContent="blogContent"
                                        />-->
                    <MyArticleCatalogue
                        ref="stick-box2"
                        v-bind="catalogProps"
                        :htmlContent="blogContent"
                    />
                </aside>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<script>
import {blogApi} from "../../api/blog";
import {blogLikeApi} from "../../api/blogLike";
import ArticleCatalogue from "../../components/ArticleCatalogue/ArticleCatalogue";
import RewardDialog from "../../components/RewardDialog/RewardDialog";
import {throttle} from "../../lib/utilFn";
import mixin from "../messageBoard/mixin";
import ArticleFeatureBtn from "../../components/ArticleFeatureBtn/ArticleFeatureBtn";
import PublicAccountDialog from "../../components/PublicAccountDialog/PublicAccountDialog";
import {indexMutation} from "../../store/mutation-types";
import MyArticleCatalogue from "../../components/MyArticleCatalogue/MyArticleCatalogue";

export default {
    name: "ArticleDetail",
    mixins: [mixin],
    props: {},
    components: {
        ArticleCatalogue,
        ArticleFeatureBtn,
        RewardDialog,
        PublicAccountDialog,
        MyArticleCatalogue,
    },
    data() {
        return {
            activeName: 'article',

            articleInfo: {},
            blogContent: '',

            catalogProps: {
                // 内容容器selector(必需)
                container: '.html-box',
                levelList: ["h2", "h3", "h4"],
                watch: true,
            },


            /*====================  留言板 start  ============================*/
            form: {
                commentContent: null,
                commentSource: 3, // 评论来源：-1，关于我；1，留言板；2，专题；3，文章
                sourceId: '', // 来源的id：存放对应来源的id，专题有专题uid，文章有文章uid，留言板uid给个默认值1，关于我默认值-1
                commentStatus: 1, // 评论状态：1，待审核；2，通过；3，违规评论
                commentPersonId: null, // 评论人：评论人的id
                commentLayer: 1, // 评论的层级，总共有五层，1，2，3，4，5
            },

            searchParam: {
                commentSource: 3,
                sourceId: '',
            },

            /*====================  留言板 end  ============================*/

            likeCountList: [], // 所有的点赞记录

            isShowRewardDialog: false, // 是否展示打赏框


        }
    },
    methods: {
        showBigPic(e) {
            if (e.target.tagName === 'IMG') {
                window.open(e.target.src, '_blank')
            }
        },
        showRewardDialog() {
            this.$refs['RewardDialog'].showDialog()
        },
        showPublicAccountDialog() {
            this.$refs['PublicAccountDialog'].showDialog()
        },


        async getAllArticleLike() {
            let {data} = await blogLikeApi.queryBlogLikeAll2({
                blogId: this.searchParam.sourceId
            })
            this.likeCountList = data.data
        },


        async likeArticleHandle(isAlreadyLike, recordUid) {
            // 判断是否登录，未登录的话先登录
            if (!this.isLogin) {
                this.goToLogin()
            } else {
                if (isAlreadyLike) {
                    // 删除自己的记录
                    let findItem = this.likeCountList.find((item) => {
                        if (item.like_person_id === this.loginUserInfo.uid) {
                            return item
                        }
                    })
                    await blogLikeApi.deleteBlogLikeByUid([findItem.uid])
                } else {
                    // 新增一条自己的记录
                    await blogLikeApi.saveBlogLike({
                        blogId: this.searchParam.sourceId,
                        likePersonId: this.loginUserInfo.uid,
                    })
                }
                await this.getAllArticleLike()

            }
        },

        goToLogin() {
            this.$store.commit(indexMutation.SHOW_LOGIN_DIALOG)
        },

        toComment() {
            const commentBox = this.$refs['comment']
            commentBox.scrollIntoView(true)
        },

        toArticleListHandle(uid, type) {
            const routerData = this.$router.resolve({
                path: `/articleList?${type}=${uid}`
            })
            window.open(routerData.href, '_blank')
        },

        // 需要智能吸附在顶部的div，站在这不要动
        standHereAndDoNotMove() {
            let offset = 150;
            let scrollTop = document.documentElement.scrollTop; //当前的的位置
            let stickBox = this.$refs['stick-box2']
            if (stickBox) {
                if (scrollTop > offset) {
                    stickBox.$el.classList.add('stand-here2')
                } else {
                    stickBox.$el.classList.remove('stand-here2')
                }
            }

        },

        async queryArticle(uid) {
            let {data} = await blogApi.queryArticleByUid(uid)
            this.articleInfo = data.data[0]
            this.blogContent = this.articleInfo.blog_content
        },
        handleClick(e) {
            console.log(e.name, 'e.name')
        },
        beforeLeaveHandle(activeName, oldActiveName) {
            if (activeName === 'home') {
                this.$router.push('/')
                return false
            }
        },
    },
    computed: {
        baseUrl() {
            let articleLinkBaseUrl
            if (process.env.NODE_ENV === 'development') { // 开发环境
                articleLinkBaseUrl = articleDetailBaseUrl.articleBaseUrlDevelopment
            } else { // 生产环境
                if (this.isDemoVersion) {
                    articleLinkBaseUrl = articleDetailBaseUrl.articleBaseUrlDemo
                } else {
                    articleLinkBaseUrl = articleDetailBaseUrl.articleBaseUrlProduction
                }
            }
            return articleLinkBaseUrl
        },
        // 是否是演示版本
        isDemoVersion() {
            return isDemoVersion // 加载到了全局，直接获取
        },
        loginUserInfo() {
            return this.$store.state.user.loginUserInfo
        },
    },
    watch: {},
    mounted() {
        window.addEventListener("scroll", throttle(() => {
            this.standHereAndDoNotMove()
        }, 50, 100))
    },
    created() {
        let {id} = this.$route.params
        this.queryArticle(id)

        /*====================  留言板 start  ============================*/
        this.form.sourceId = id
        this.searchParam.sourceId = id
        this.getCommentList()
        /*====================  留言板 end  ============================*/

        this.getAllArticleLike()
    }
}
</script>

<style scoped lang="scss">
@import "articleDetail";
</style>
