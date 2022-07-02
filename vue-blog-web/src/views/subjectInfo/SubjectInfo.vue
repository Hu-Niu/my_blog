<template>
    <div class="subject-info-container">
        <div v-if="specialTree.length>0">
            <div class="frontpage-banner">
                <h1>{{ specialTree[0].label }}</h1>
                <p>{{ specialTree[0].special_summary }}</p>
            </div>
            <fragment v-if="specialTree.length>0 && specialTree[0].children.length>0">
                <section
                    v-for="specialPart in specialTree[0].children"
                    :key="specialPart.id"
                >
                    <div class="frontpage-content__inner">
                        <div class="frontpage-content__part">{{ specialPart.label }}</div>
                        <h2 class="frontpage-content__title">{{ specialPart.part_title }}</h2>
                        <div class="frontpage-content__description">
                            <p>{{ specialPart.part_summary }}</p>
                        </div>
                        <fragment v-if="specialPart.children.length>0">
                            <div class="list__item" v-for="section in specialPart.children" :key="section.id">
                                <div class="list__title">{{ section.label }}</div>
                                <ul class="list-sub">
                                    <fragment v-if="section.children.length>0">
                                        <li class="list-sub__item" v-for="article in section.children"
                                            :key="article.id">
                                            <div class="list-sub__title">
                                                <a :href="getArticleHref(article.blog_id)" target="_blank"
                                                   class="list-sub__link">{{ article.label }}</a>
                                            </div>
                                        </li>
                                    </fragment>
                                </ul>
                            </div>
                        </fragment>
                    </div>
                </section>
            </fragment>
        </div>
        <div style="max-width: 920px;margin: 0 auto;padding-bottom: 230px;">
            <hr>
            <h3 style="margin-bottom: 20px;">留言（{{ total }}）</h3>
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
        </div>
    </div>
</template>

<script>
import {specialPartSectionApi} from '/src/api/specialPartSection'
import mixin from "../messageBoard/mixin";

export default {
    name: "SubjectInfo",
    mixins: [mixin],
    props: {},
    components: {},
    data() {
        return {
            specialTree: [],

            /*====================  留言板 start  ============================*/
            form: {
                commentContent: null,
                commentSource: 2, // 评论来源：-1，关于我；1，留言板；2，专题；3，文章
                sourceId: '', // 来源的id：存放对应来源的id，专题有专题uid，文章有文章uid，留言板uid给个默认值1，关于我默认值-1
                commentStatus: 1, // 评论状态：1，待审核；2，通过；3，违规评论
                commentPersonId: null, // 评论人：评论人的id
                commentLayer: 1, // 评论的层级，总共有五层，1，2，3，4，5
            },

            searchParam: {
                commentSource: 2,
                sourceId: '',
            },

            /*====================  留言板 end  ============================*/
        }
    },
    methods: {
        async getSpecialTree(uid) {
            let {data} = await specialPartSectionApi.querySpecialPartSectionBlogTreeBySpecialUid(uid)
            this.specialTree = data.data
        },

        getArticleHref(id){
            const routerData = this.$router.resolve({
                path: `/articleDetail/${id}`
            })

            return routerData.href
        },
    },
    computed: {},
    watch: {},
    created() {
        let {id} = this.$route.params
        this.getSpecialTree(id)

        /*====================  留言板 start  ============================*/
        this.form.sourceId = id
        this.searchParam.sourceId = id
        this.getCommentList()
        /*====================  留言板 end  ============================*/
    }
}
</script>

<style scoped lang="scss">
@import "SubjectInfo";
</style>
