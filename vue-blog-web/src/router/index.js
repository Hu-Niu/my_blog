import Vue from 'vue'
import Router from 'vue-router'
import Layout from "../views/layout/Layout";
import UserLayout from "../views/user/userLayout/UserLayout";

//获取原型对象上的push函数 解决重复点击路由报错（不设也没影响）
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

/**
 * 1、isNavigationBar：true；表示是导航栏，会在顶部显示
 * 2、name：该属性不能重复，表示某个路由的名字，如果使用keep-alive时，会使用这个名字作为标识，所以不建议重复
 * 3、第一个对象放根路由，所有的导航路由放在根路由的children里，因为我解析导航栏的时候是这么解析的，
 *      routes[0].children.map() 找到 isNavigationBar==true 的路由，所以都放这里面
 */
export const constantRouterMap = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        name: 'Layout',
        children: [
            {
                path: '/home',
                name: 'Home',
                meta: {title: '首页'},
                isNavigationBar: true,
                component: () => import('/src/views/home/Home')
            },
            {
                path: '/aboutMe',
                name: 'AboutMe',
                meta: {title: '关于我'},
                isNavigationBar: true,
                component: () => import('/src/views/aboutMe/AboutMe')
            },
            {
                path: '/archive',
                name: 'Archive',
                meta: {title: '归档'},
                isNavigationBar: true,
                component: () => import('/src/views/archive/Archive')
            },
            {
                path: '/subject',
                name: 'Subject',
                meta: {title: '专题'},
                isNavigationBar: true,
                component: () => import('/src/views/subject/Subject')
            },
            {
                path: '/subjectInfo/:id',
                name: 'SubjectInfo',
                meta: {title: '专题详情'},
                component: () => import('/src/views/subjectInfo/SubjectInfo')
            },
            {
                path: '/messageBoard',
                name: 'MessageBoard',
                meta: {title: '留言板'},
                isNavigationBar: true,
                component: () => import('/src/views/messageBoard/MessageBoard')
            },
            {
                path: '/dynamic',
                name: 'Dynamic',
                meta: {title: '动态'},
                isNavigationBar: true,
                component: () => import('/src/views/dynamic/Dynamic')
            },
            {
                path: '/user',
                name: 'User',
                meta: {title: '个人主页'},
                component: () => import('/src/views/user/User')
            },
            {
                path: '/articleDetail/:id',
                name: 'ArticleDetail',
                meta: {title: '文章详情'},
                component: () => import('/src/views/articleDetail/ArticleDetail')
            },
            {
                path: '/articleList',
                name: 'ArticleList',
                meta: {title: '文章详情'},
                component: () => import('/src/views/articleList/ArticleList')
            },


            {
                path: '/user/settings',
                name: 'UserLayout',
                component: UserLayout,
                redirect: '/user/settings/profile',
                children: [
                    {
                        path: '/user/settings/profile',
                        name: 'Profile',
                        meta: {title: '个人资料', icon: 'el-icon-user'},
                        component: () => import('/src/views/user/settings/profile/Profile')
                    },
                    {
                        path: '/user/settings/account',
                        name: 'Account',
                        meta: {title: '账号设置', icon: 'el-icon-setting'},
                        component: () => import('/src/views/user/settings/account/Account')
                    },

                ],
            },
        ],
    },
    {
        path: '/404',
        component: () => import('../views/404/404')
    },
]

const router = new Router({
    routes: constantRouterMap,

    // 刷新页面后，滚到顶部
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
