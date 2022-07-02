import Vue from 'vue'
import Router from 'vue-router'

//获取原型对象上的push函数 解决重复点击路由报错（不设也没影响）
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

import Layout from "../views/layout/Layout";

const constantRouterMap = [
    {
        path: '/404',
        component: () => import('../views/404/404')
    },
    // 登录
    {
        path: '/login',
        component: () => import('../views/login/Login')
    },
    // 首页
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: '_home',
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                meta: {title: '首页', icon: 'dashboard'},
                component: () => import('../views/dashboard/Dashboard'),
            },
        ]
    },
    // 博客管理
    {
        path: '/blog',
        component: Layout,
        redirect: '/blog/blog',
        name: '_blog',
        meta: {title: '博客管理', icon: 'el-icon-setting'},
        isSidebar: true,
        children: [
            {
                path: '/blog/blog',
                name: 'Blog',
                component: () => import('../views/blog/blog/Blog'),
                meta: {title: '博客管理', icon: 'el-icon-office-building'}
            },
            {
                path: '/blog/blogSort',
                name: 'BlogSort',
                component: () => import('../views/blog/blogSort/BlogSort'),
                meta: {title: '分类管理', icon: 'el-icon-school'}
            },
            {
                path: '/blog/blogTag',
                name: 'BlogTag',
                component: () => import('../views/blog/blogTag/BlogTag'),
                meta: {title: '标签管理', icon: 'el-icon-table-lamp'}
            },
            {
                path: '/blog/blogRecommend',
                name: 'BlogRecommend',
                component: () => import('../views/blog/blogRecommend/BlogRecommend'),
                meta: {title: '推荐管理', icon: 'el-icon-house'}
            },
            {
                path: '/blog/blogLike',
                name: 'BlogLike',
                component: () => import('../views/blog/blogLike/BlogLike'),
                meta: {title: '博客点赞管理', icon: 'el-icon-goblet'}
            },

        ],
    },
    // 专题管理
    {
        path: '/special',
        component: Layout,
        redirect: '/special/specialSort',
        name: '_special',
        meta: {title: '专题管理', icon: 'el-icon-setting'},
        isSidebar: true,
        children: [
            {
                path: '/special/specialSort',
                name: 'SpecialSort',
                component: () => import('../views/special/specialSort/SpecialSort'),
                meta: {title: '专题分类管理', icon: 'el-icon-smoking'}
            },
            {
                path: '/special/special',
                name: 'Special',
                component: () => import('../views/special/special/Special'),
                meta: {title: '专题管理', icon: 'el-icon-shopping-cart-full'}
            },
            {
                path: '/specialPart/specialPart',
                name: 'SpecialPart',
                component: () => import('../views/special/specialPart/SpecialPart'),
                meta: {title: '专题部分管理', icon: 'el-icon-shopping-bag-1'}
            },
            {
                path: '/specialPartSection/specialPartSection',
                name: 'SpecialPartSection',
                component: () => import('../views/special/specialPartSection/SpecialPartSection'),
                meta: {title: '章节管理', icon: 'el-icon-present'}
            },
            {
                path: '/specialPartSectionBlog/specialPartSectionBlog',
                name: 'SpecialPartSectionBlog',
                component: () => import('../views/special/specialPartSectionBlog/SpecialPartSectionBlog'),
                meta: {title: '章节博客管理', icon: 'el-icon-bank-card'}
            },
        ],
    },
    // 系统管理
    {
        path: '/system',
        component: Layout,
        redirect: '/system/systemConfig',
        name: '_system',
        meta: {title: '系统管理', icon: 'el-icon-setting'},
        isSidebar: true,
        children: [
            {
                path: '/system/aboutMe',
                name: 'AboutMe',
                component: () => import('/src/views/system/aboutMe/AboutMe'),
                meta: {title: '关于我', icon: 'el-icon-trophy'}
            },
            {
                path: '/system/contactWay',
                name: 'ContactWay',
                component: () => import('/src/views/system/contactWay/ContactWay'),
                meta: {title: '联系方式', icon: 'el-icon-thumb'}
            },
            {
                path: '/system/friendLink',
                name: 'FriendLink',
                component: () => import('/src/views/system/friendLink/FriendLink'),
                meta: {title: '友情链接', icon: 'el-icon-link'}
            },
            /*{
                path: '/system/systemConfig',
                name: 'SystemConfig',
                component: () => import('/src/views/system/systemConfig/SystemConfig'),
                meta: {title: '系统配置', icon: 'el-icon-bangzhu'}
            },*/
            /*{
                path: '/system/webConfig',
                name: 'WebConfig',
                component: () => import('/src/views/system/webConfig/WebConfig'),
                meta: {title: '网站配置', icon: 'el-icon-crop'}
            },*/

        ]

    },
    // 图片管理
    {
        path: '/picture',
        component: Layout,
        redirect: '/picture/pictureSort',
        name: '_picture',
        meta: {title: '图片管理', icon: 'el-icon-setting'},
        isSidebar: true,
        children: [
            {
                path: '/picture/pictureSort',
                name: 'PictureSort',
                component: () => import('/src/views/picture/pictureSort/PictureSort'),
                meta: {title: '图片类别管理', icon: 'el-icon-video-camera'}
            },
            {
                path: '/picture/picture',
                name: 'Picture',
                component: () => import('/src/views/picture/picture/Picture'),
                meta: {title: '图片管理', icon: 'el-icon-camera'}
            }
        ]
    },
    // 管理员管理
    {
        path: '/admin',
        component: Layout,
        redirect: '/admin/adminUser',
        name: '_admin',
        meta: {title: '管理员管理', icon: 'el-icon-setting'},
        isSidebar: true,
        children: [
            {
                path: '/admin/adminUser',
                name: 'AdminUser',
                component: () => import('/src/views/admin/adminUser/AdminUser'),
                meta: {title: '管理员管理', icon: 'el-icon-video-camera'}
            },
            {
                path: '/admin/adminRole',
                name: 'AdminRole',
                component: () => import('/src/views/admin/adminRole/AdminRole'),
                meta: {title: '角色管理', icon: 'el-icon-camera'}
            }
        ]
    },
    // 用户管理
    {
        path: '/webUser',
        component: Layout,
        redirect: '/webUser/webUser',
        name: '_webUser',
        meta: {title: '用户管理', icon: 'el-icon-setting'},
        isSidebar: true,
        children: [
            {
                path: '/webUser/webUser',
                name: 'WebUser',
                component: () => import('/src/views/webUser/webUser/WebUser'),
                meta: {title: '用户管理', icon: 'el-icon-video-camera'}
            },
        ]
    },
    // 评论管理
    {
        path: '/comment',
        component: Layout,
        redirect: '/comment/comment',
        name: '_comment',
        meta: {title: '评论管理', icon: 'el-icon-setting'},
        isSidebar: true,
        children: [
            {
                path: '/comment/comment',
                name: 'Comment',
                component: () => import('/src/views/comment/comment/Comment'),
                meta: {title: '评论管理', icon: 'el-icon-video-camera'}
            },
            {
                path: '/comment/commentReaction',
                name: 'CommentReaction',
                component: () => import('/src/views/comment/commentReaction/CommentReaction'),
                meta: {title: '评论点赞管理', icon: 'el-icon-video-camera'}
            },
            {
                path: '/comment/commentInform',
                name: 'CommentInform',
                component: () => import('/src/views/comment/commentInform/CommentInform'),
                meta: {title: '评论举报管理', icon: 'el-icon-video-camera'}
            },

        ]
    },
]

const router = new Router({
    routes: constantRouterMap
})


export default router
