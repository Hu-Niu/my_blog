<template>
    <div class="about-me-container">
        <!--  座右铭  -->
        <p class="motto">你，我生命中一个重要的过客，我们之所以是过客，因为你未曾会为我停留。</p>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :before-leave="beforeLeaveHandle">
            <el-tab-pane label="网站首页" name="home" class="home-btn"/>

            <el-tab-pane label="关于我" name="about">
                <!--  左边的自我介绍  -->
                <main>
                    <article
                        class="html-box"
                        v-html="htmlIntro"
                        v-highlight
                    />
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

                </main>
                <!--  右边我的信息  -->
                <aside>
                    <!--   照片信息   -->
                    <MyProfile/>
                    <!--   关注我   -->
                    <div ref="stick-box">
                        <FollowUs title="关注我" :list="contactWayList"/>
                    </div>
                </aside>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import MyProfile from "../../components/MyProfile/MyProfile";
import FollowUs from "../../components/FollowUs/FollowUs";
import {contactWayApi} from "../../api/contactWay";
import {adminUserApi} from "../../api/adminUser";
import mixin from "../messageBoard/mixin";

import {throttle} from '/src/lib/utilFn'

export default {
    name: "AboutMe",
    mixins: [mixin],
    props: {},
    components: {
        MyProfile,
        FollowUs,
    },
    data() {
        return {
            activeName: 'about',
            contactWayList: [], // 关于我们
            myIntro: {}, // 我的基本信息
            htmlIntro: "", // html格式得自我介绍
            profileUrl: "", // 头像


            /*====================  留言板 start  ============================*/
            form: {
                commentContent: null,
                commentSource: -1, // 评论来源：-1，关于我；1，留言板；2，专题；3，文章
                sourceId: -1, // 来源的id：存放对应来源的id，专题有专题uid，文章有文章uid，留言板uid给个默认值1，关于我默认值-1
                commentStatus: 1, // 评论状态：1，待审核；2，通过；3，违规评论
                commentPersonId: null, // 评论人：评论人的id
                commentLayer: 1, // 评论的层级，总共有五层，1，2，3，4，5
            },

            searchParam: {
                commentSource: -1,
                sourceId: -1,
            },

            /*====================  留言板 end  ============================*/

        }
    },
    methods: {

        async getAdminUserInfo() {
            let {data} = await adminUserApi.queryAdminUserByUid('-1')
            this.myIntro = {
                user_profile: data.data.user_profile,
                nick_name: data.data.nick_name,
                user_profession: data.data.user_profession,
                user_intro: data.data.user_intro,
            }
            this.htmlIntro = data.data.intro_detail
            this.profileUrl = data.data.user_profile
        },
        async getContactWayList() {
            let params = {
                isShow: 1,
            }
            let {data} = await contactWayApi.queryContactWayAll(params)
            this.contactWayList = data.data
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
        // 需要智能吸附在顶部的div，站在这不要动
        standHereAndDoNotMove() {
            let offset = 600;
            let scrollTop = document.documentElement.scrollTop; //当前的的位置
            let stickBox = this.$refs['stick-box']
            if (stickBox) {
                if (scrollTop > offset) {
                    stickBox.classList.add('stand-here')
                } else {
                    stickBox.classList.remove('stand-here')
                }
            }

        },
    },
    computed: {},
    watch: {},
    mounted() {
        this.getContactWayList()
        this.getAdminUserInfo()

        this.getCommentList()

        window.addEventListener("scroll", throttle(() => {
            this.standHereAndDoNotMove()
        }, 50, 100))
    }
}
</script>

<style scoped lang="scss">
@import "AboutMe";
</style>
