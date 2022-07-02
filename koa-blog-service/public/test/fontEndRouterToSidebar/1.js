const routers = [
    // 登录
    {
        path: '/login',
    },
    // 首页
    {
        path: '/',
        redirect: '/dashboard',
        name: '_home',
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                meta: {title: '首页', icon: 'dashboard'},
            },
        ]
    },
    // 博客管理
    {
        path: '/blog',
        redirect: '/blog/blog',
        name: '_blog',
        meta: {title: '博客管理', icon: 'el-icon-edit'},
        isSidebar: true,
        children: [
            {
                path: '/blog/blog',
                name: 'Blog',
                meta: {title: '博客管理', icon: 'el-icon-notebook-2'}
            },
            {
                path: '/blog/blogSort',
                name: 'BlogSort',
                meta: {title: '分类管理', icon: 'el-icon-brush'}
            },
            {
                path: '/blog/blogTag',
                name: 'BlogTag',
                meta: {title: '标签管理', icon: 'el-icon-folder-opened'}
            },
            {
                path: '/blog/blogRecommend',
                name: 'BlogRecommend',
                meta: {title: '推荐管理', icon: 'el-icon-ice-cream-round'}
            },
        ],
    },
    // 专题管理
    {
        path: '/special',
        redirect: '/special/specialSort',
        name: '_special',
        meta: {title: '专题管理', icon: 'el-icon-edit'},
        isSidebar: true,
        children: [
            {
                path: '/special/specialSort',
                name: 'SpecialSort',
                meta: {title: '专题分类管理', icon: 'el-icon-edit'}
            },
            {
                path: '/special/special',
                name: 'Special',
                meta: {title: '专题管理', icon: 'el-icon-edit'}
            },
            {
                path: '/specialPart/specialPart',
                name: 'SpecialPart',
                meta: {title: '专题部分管理', icon: 'el-icon-edit'}
            },
            {
                path: '/specialPartSection/specialPartSection',
                name: 'SpecialPartSection',
                meta: {title: '专题部分章节管理', icon: 'el-icon-edit'}
            },
            {
                path: '/specialPartSectionBlog/specialPartSectionBlog',
                name: 'SpecialPartSectionBlog',
                meta: {title: '专题部分章节博客管理', icon: 'el-icon-edit'}
            },
        ],
    },
    // 系统管理
    {
        path: '/system',
        redirect: '/system/systemConfig',
        name: '_system',
        meta: {title: '系统管理', icon: 'el-icon-edit'},
        isSidebar: true,
        children: [
            {
                path: '/system/contactWay',
                name: 'ContactWay',
                meta: {title: '联系方式', icon: 'el-icon-edit'}
            },
            {
                path: '/system/friendLink',
                name: 'FriendLink',
                meta: {title: '联系方式', icon: 'el-icon-edit'}
            },
            {
                path: '/system/systemConfig',
                name: 'SystemConfig',
                meta: {title: '系统配置', icon: 'el-icon-edit'}
            },
            {
                path: '/system/webConfig',
                name: 'WebConfig',
                meta: {title: '网站配置', icon: 'el-icon-edit'}
            },
            {
                path: '/system/aboutMe',
                name: 'AboutMe',
                meta: {title: '关于我', icon: 'aboutMe'}
            },
        ]

    },
    // 图片管理
    {
        path: '/picture',
        redirect: '/picture/pictureSort',
        name: '_picture',
        meta: {title: '图片管理', icon: 'el-icon-edit'},
        isSidebar: true,
        children: [
            {
                path: '/picture/pictureSort',
                name: 'PictureSort',
                meta: {title: '图片类别管理', icon: 'el-icon-edit'}
            },
            {
                path: '/picture/picture',
                name: 'Picture',
                meta: {title: '图片管理', icon: 'el-icon-edit'}
            }
        ]
    },
]

module.exports = {
    routers
}
