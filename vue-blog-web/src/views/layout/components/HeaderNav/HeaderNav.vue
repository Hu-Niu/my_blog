<template>
    <div class="header-nav-container">
        <div class="logo-box">
            <slot name="logo"></slot>
        </div>
        <el-menu
            :default-active="$route.name"
            mode="horizontal"
            class="container-menu"
            background-color="rgba(255, 255, 255, 0)"
            text-color="#fff"
            active-text-color="#C4D3F6"
            @select="handleSelect"
            border="0"
        >
            <el-menu-item
                v-for="item in navList"
                :key="item.path"
                :index="item.name"
                @click="navigatorTo(item.path)"
            >
                {{ item.meta.title }}
            </el-menu-item>

            <!-- <el-submenu 
                index="outerLink"
            >
               <template  slot="title">博客源码</template>
                <div class="submenu-item">
                    <el-menu-item index="https://gitee.com/hrbust_cheny/pupu_blog">博客源码</el-menu-item>
                    <el-menu-item
                        index="https://gitee.com/hrbust_cheny/study_notes">
                        学习笔记
                    </el-menu-item>
                </div>
            
            </el-submenu> -->
        </el-menu>
        <!--  未登录时 默认显示一个未登录的小头像  -->
        <div v-if="!isLogin" class="user-unlogin" @click="showLoginDialogHandle">
            <svg-icon icon-class="user"></svg-icon>
        </div>

        <!--  登录后 显示用户的头像  -->
        <div v-else class="user-login">
            <el-dropdown
                trigger="click"
            >
                <el-image
                    :src="loginUserInfo.user_profile"
                ></el-image>
                <el-dropdown-menu slot="dropdown">

                    <el-dropdown-item
                        disabled
                        icon="el-icon-edit"
                    >投稿
                    </el-dropdown-item>

                    <el-dropdown-item
                        divided
                        icon="el-icon-user"
                        @click.native="navigatorTo('/user')"
                    >我的主页
                    </el-dropdown-item>

                    <el-dropdown-item
                        divided
                        icon="el-icon-setting"
                        @click.native="navigatorTo('/user/settings')"
                    >设置
                    </el-dropdown-item>

                    <el-dropdown-item
                        divided
                        icon="el-icon-switch-button"
                        @click.native="logoutHandle"
                    >退出
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>

           <div class="search">
              <svg-icon icon-class="search"></svg-icon>
            </div>

        <!--  登录组件  -->
        <div class="login-component-box" v-if="isShowLoginBox">
            <LoginDialog
                @giteeClickHandle="giteeClickHandle"
                @qqClickHandle="qqClickHandle"
                @microBlogClickHandle="microBlogClickHandle"
                @closeLoginHandle="closeLoginHandle"
            />
        </div>

    </div>
</template>

<script>
import LoginDialog from "../../../../components/LoginDialog/LoginDialog";
import {userMutation, indexMutation} from '/src/store/mutation-types'

export default {
    name: "HeaderNav",
    props: {
        navList: {
            type: Array,
            default: () => []
        },
    },
    components: {
        LoginDialog,
    },
    data() {
        return {
            // isShowLoginBox: false, // 是否弹出登录框
            oAuthWindow: null, // 第三方登录框
        }
    },
    methods: {
        async logoutHandle() {
            /**
             * 1、清除所有本地缓存中的信息 token、userInfo等等
             */
            await this.$store.dispatch('clearAll')
            await this.$router.push('/')
            // 刷新浏览器
            window.location.reload()

        },
        giteeClickHandle() {
            this.oAuthWindow = open(
                `https://gitee.com/oauth/authorize?client_id=${this.gitee_client_id}&redirect_uri=${this.baseURL}/oauth/callback/gitee&response_type=code`,
                'giteeOauth',
                'width=783,height=599'
            )
        },
        qqClickHandle() {
            // 参考：https://juejin.cn/post/6977399909532041247
            // 参考：https://wiki.connect.qq.com/%e4%bd%bf%e7%94%a8authorization_code%e8%8e%b7%e5%8f%96access_token
            this.oAuthWindow = open(
                `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${this.qq_client_id}&redirect_uri=${this.baseURL}/oauth/callback/qq&state=cheny`,
                'qqOauth',
                'width=783,height=599'
            )
        },
        microBlogClickHandle() {
            // 参考：https://cloud.tencent.com/developer/article/1441425?from=article.detail.1441429
            // 参考：https://open.weibo.com/wiki/Connect/login
            this.oAuthWindow = open(
                `https://api.weibo.com/oauth2/authorize?client_id=${this.weibo_client_id}&response_type=code&redirect_uri=${this.baseURL}/oauth/callback/weiboConfirm&state=cheny`,
                'weiboOauth',
                'width=783,height=599'
            )
        },

        closeLoginHandle() {
            // this.isShowLoginBox = false
            this.$store.commit(indexMutation.HIDDEN_LOGIN_DIALOG)
        },
        showLoginDialogHandle() {
            // this.isShowLoginBox = true
            this.$store.commit(indexMutation.SHOW_LOGIN_DIALOG)
        },
        handleSelect(index, path) {
            if (path[0] === 'outerLink') {
                window.open(index)
            }
        },
        navigatorTo(path) {
            this.$router.push({
                path,
            })
        },
    },
    computed: {
        // 是否是演示版本
        isDemoVersion() {
            return isDemoVersion // 加载到了全局，直接获取
        },
        gitee_client_id() {
            /*
            * gitee申请第三方登录时，最自由
            * 服务器端的回调接口地址可以写成下面很多种形式
            * 1、http://localhost:20517/oauth/gitee  //可以是本地的带端口号的
            * 2、http://你的服务器ip:20517/oauth/gitee  //可以是本地的带端口号的
            * 3、http://你备案后的域名:20517/oauth/gitee  //域名带端口号的
            * 4、http://你备案后的域名/oauth/gitee  //不带端口号的
            * 因为几乎没有限制，所以本地登录的时候先学gitee入门，qq和微博就限制的比较多了，需要有备案的域名
            * */
            let client_id
            if (process.env.NODE_ENV === 'development') { // 开发环境
                client_id = myGiteeLogin.client_id_development
            } else { // 生产环境
                if (this.isDemoVersion) {
                    client_id = myGiteeLogin.client_id_demo
                } else {
                    client_id = myGiteeLogin.client_id_production
                }
            }
            return client_id
        },
        qq_client_id() {
            /*
            * 只能正式环境中才能使用qq登录，且必须有备案好的域名才能申请
            * */
            return qqLogin.client_id
        },
        weibo_client_id() {
            /*
            * 只能正式环境中才能使用qq登录，且必须有备案好的域名才能申请
            * */
            return weiboLogin.client_id
        },


        baseURL() {
            let baseURL
            if (process.env.NODE_ENV === 'development') { // 开发环境
                baseURL = myConfig.apiUrlDevelopment
            } else { // 生产环境
                if (this.isDemoVersion) {
                    baseURL = myConfig.apiUrlDemo
                } else {
                    baseURL = myConfig.apiUrlProduction
                }
            }
            return baseURL
        },

        isLogin() {
            return !!this.$store.state.user.token
        },
        loginUserInfo() {
            return this.$store.state.user.loginUserInfo
        },
        // 是否弹出登录框
        isShowLoginBox() {
            return this.$store.state.isShowLoginBox
        },
    },
    watch: {},
    mounted() {
        // 接收弹出的第三方授权窗口返回的token
        // 跨窗口通信：https://segmentfault.com/a/1190000015127237
        // 弹窗：https://zh.javascript.info/popup-windows
        window.addEventListener('message', e => {
            if (/Bearer/.test(e.data)) {

                let token = e.data

                this.oAuthWindow.close()
                this.closeLoginHandle()

                // 将token存到本地缓存中
                this.$store.commit(userMutation.SET_TOKEN, token)
                // 刷新浏览器
                window.location.reload()

            }
        }, false)
        //导航栏滚动渐变效果
         window.addEventListener('scroll',function(){
            let tou = document.querySelector('.header-nav-container');
            let item = document.querySelector('.submenu-item');
            tou.classList.toggle("bian",window.scrollY>0);
            item.classList.toggle("bian",window.scrollY>0);

        })
    }
}
</script>

<style lang="scss" scoped>
@import "HeaderNav";
</style>
