const menu = [
    {
        "parent": {
            "name": "博客管理",
            "icon": "el-icon-edit",
            "url": "/blog",
            "uid": "49b42250abcb47ff876bad699cf34f03"
        },
        "sonItem": [
            {
                "name": "博客管理",
                "icon": "el-icon-notebook-2",
                "parentUid": "49b42250abcb47ff876bad699cf34f03",
                "url": "/blog/blog",
                "uid": "1f01cd1d2f474743b241d74008b12333",
            },
            {
                "name": "分类管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "管理博客分类",
                "icon": "el-icon-brush",
                "parentUid": "49b42250abcb47ff876bad699cf34f03",
                "url": "/blog/blogSort",
                "sort": 10,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "0a035547bbec404eb3ee0ef43312148d",
                "status": 1,
                "createTime": "2018-11-26 03:07:14",
                "updateTime": "2020-05-30 08:34:17"
            },
            {
                "name": "标签管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "对博客标签进行管理",
                "icon": "el-icon-folder-opened",
                "parentUid": "49b42250abcb47ff876bad699cf34f03",
                "url": "/blog/blogTag",
                "sort": 4,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "6606b7e646d545e5a25c70b5e5fade9f",
                "status": 1,
                "createTime": "2018-11-26 02:57:38",
                "updateTime": "2020-05-30 08:34:43"
            },
            {
                "name": "推荐管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "博客推荐管理",
                "icon": "el-icon-ice-cream-round",
                "parentUid": "49b42250abcb47ff876bad699cf34f03",
                "url": "/blog/blogRecommend",
                "sort": 0,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "1d9a5030142e9fd7690f554c20e3bc90",
                "status": 1,
                "createTime": "2020-01-28 10:06:32",
                "updateTime": "2020-05-30 08:34:54"
            }
        ]
    },
    {
        "parent": {
            "name": "专题管理",
            "menuLevel": 1,
            "menuType": 0,
            "summary": "用于博客的一些相关操作",
            "icon": "el-icon-edit",
            "url": "/special",
            "sort": 21,
            "isShow": 1,
            "isJumpExternalUrl": 0,
            "uid": "123123",
            "status": 1,
            "createTime": "2018-11-25 05:15:07",
            "updateTime": "2020-10-07 15:35:48"
        },
        "sonItem": [
            {
                "name": "专题分类管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "对博客进行增删改查",
                "icon": "el-icon-notebook-2",
                "parentUid": "123123",
                "url": "/special/specialSort",
                "sort": 11,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "s1",
                "status": 1,
                "createTime": "2018-11-27 03:47:07",
                "updateTime": "2020-05-30 08:33:22"
            },
            {
                "name": "专题管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "对博客进行增删改查",
                "icon": "el-icon-notebook-2",
                "parentUid": "123123",
                "url": "/special/special",
                "sort": 11,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "s2",
                "status": 1,
                "createTime": "2018-11-27 03:47:07",
                "updateTime": "2020-05-30 08:33:22"
            },
            {
                "name": "部分管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "对博客进行增删改查",
                "icon": "el-icon-notebook-2",
                "parentUid": "123123",
                "url": "/specialPart/specialPart",
                "sort": 11,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "s3",
                "status": 1,
                "createTime": "2018-11-27 03:47:07",
                "updateTime": "2020-05-30 08:33:22"
            },
            {
                "name": "章节管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "对博客进行增删改查",
                "icon": "el-icon-notebook-2",
                "parentUid": "123123",
                "url": "/specialPartSection/specialPartSection",
                "sort": 11,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "s4",
                "status": 1,
                "createTime": "2018-11-27 03:47:07",
                "updateTime": "2020-05-30 08:33:22"
            },
            {
                "name": "章节博客管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "对博客进行增删改查",
                "icon": "el-icon-notebook-2",
                "parentUid": "123123",
                "url": "/specialPartSectionBlog/specialPartSectionBlog",
                "sort": 11,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "s5",
                "status": 1,
                "createTime": "2018-11-27 03:47:07",
                "updateTime": "2020-05-30 08:33:22"
            },
        ]
    },
    {
        "parent": {
            "name": "图片管理",
            "menuLevel": 1,
            "menuType": 0,
            "summary": "图片管理",
            "icon": "el-icon-picture-outline",
            "parentUid": "",
            "url": "/picture",
            "sort": 3,
            "isShow": 1,
            "isJumpExternalUrl": 0,
            "uid": "65e22f3d36d94bcea47478aba02895a1",
            "status": 1,
            "createTime": "2018-11-28 19:48:53",
            "updateTime": "2020-05-30 09:07:12"
        },
        "sonItem": [
            {
                "name": "图片类别管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "图片类别",
                "icon": "el-icon-printer",
                "parentUid": "65e22f3d36d94bcea47478aba02895a1",
                "url": "/picture/pictureSort",
                "sort": 2,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "4dea9c4f39d2480983e8c4333d35e036",
                "status": 1,
                "createTime": "2018-11-28 19:50:31",
                "updateTime": "2020-10-12 10:13:57"
            },
            {
                "name": "图片管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "图片管理",
                "icon": "el-icon-brush",
                "parentUid": "65e22f3d36d94bcea47478aba02895a1",
                "url": "/picture/picture",
                "sort": 1,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "1cc493d36e17fad535f2bf70242162b0",
                "status": 1,
                "createTime": "2020-02-21 22:27:12",
                "updateTime": "2020-10-12 10:12:30"
            }
        ]
    },
    {
        "parent": {
            "name": "系统管理",
            "menuLevel": 1,
            "menuType": 0,
            "summary": "系统管理",
            "icon": "el-icon-setting",
            "parentUid": "",
            "url": "/system",
            "sort": 19,
            "isShow": 1,
            "isJumpExternalUrl": 0,
            "uid": "badf0010422b432ba6ec9c83a25012ed",
            "status": 1,
            "createTime": "2018-11-28 19:54:47",
            "updateTime": "2020-10-07 15:35:52"
        },
        "sonItem": [
            {
                "name": "联系方式",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "联系方式",
                "icon": "el-icon-setting",
                "parentUid": "badf0010422b432ba6ec9c83a25012ed",
                "url": "/system/contactWay",
                "sort": 1,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "sys1",
                "status": 1,
                "createTime": "2018-11-28 19:59:04",
                "updateTime": "2020-08-30 08:01:11"
            },
            {
                "name": "友情链接",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "友情链接",
                "icon": "el-icon-setting",
                "parentUid": "badf0010422b432ba6ec9c83a25012ed",
                "url": "/system/friendLink",
                "sort": 1,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "sys2",
                "status": 1,
                "createTime": "2018-11-28 19:59:04",
                "updateTime": "2020-08-30 08:01:11"
            },
            {
                "name": "网站配置",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "网站配置",
                "icon": "el-icon-setting",
                "parentUid": "badf0010422b432ba6ec9c83a25012ed",
                "url": "/system/webConfig",
                "sort": 1,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "2fb47d3b6dbd44279c8206740a263543",
                "status": 1,
                "createTime": "2018-11-28 19:59:04",
                "updateTime": "2020-08-30 08:01:11"
            },
            {
                "name": "关于我",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "关于我",
                "icon": "el-icon-sugar",
                "parentUid": "badf0010422b432ba6ec9c83a25012ed",
                "url": "/system/aboutMe",
                "sort": 0,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "faccfe476b89483791c05019ad5b4906",
                "status": 1,
                "createTime": "2018-11-29 03:55:17",
                "updateTime": "2020-05-30 08:35:21"
            },
            {
                "name": "系统配置",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "设置七牛云和邮箱等相关配置",
                "icon": "el-icon-s-tools",
                "parentUid": "badf0010422b432ba6ec9c83a25012ed",
                "url": "/system/systemConfig",
                "sort": 2,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "78f24799307cb63bc3759413dadf4d1a",
                "status": 1,
                "createTime": "2020-01-21 09:29:04",
                "updateTime": "2020-08-30 08:01:17"
            },

        ]
    },
    {
        "parent": {
            "name": "消息管理",
            "menuLevel": 1,
            "menuType": 0,
            "summary": "消息管理",
            "icon": "el-icon-message",
            "parentUid": "",
            "url": "/message",
            "sort": 6,
            "isShow": 1,
            "isJumpExternalUrl": 0,
            "uid": "bcf4a9bc21c14b559bcb015fb7912266",
            "status": 1,
            "createTime": "2018-11-28 19:45:29",
            "updateTime": "2020-05-30 08:48:21"
        },
        "sonItem": [
            {
                "name": "评论管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "评论管理",
                "icon": "el-icon-chat-line-square",
                "parentUid": "bcf4a9bc21c14b559bcb015fb7912266",
                "url": "/message/comment",
                "sort": 1,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "9beb7caa2c844b36a02789262dc76fbe",
                "status": 1,
                "createTime": "2018-11-28 19:47:23",
                "updateTime": "2020-05-30 08:48:28"
            },
            {
                "name": "反馈管理",
                "menuLevel": 2,
                "menuType": 0,
                "summary": "反馈管理",
                "icon": "el-icon-microphone",
                "parentUid": "bcf4a9bc21c14b559bcb015fb7912266",
                "url": "/message/feedback",
                "sort": 0,
                "isShow": 1,
                "isJumpExternalUrl": 0,
                "uid": "6228ff4e9ebd42c89599b322201a0345",
                "status": 1,
                "createTime": "2018-11-28 19:48:30",
                "updateTime": "2020-05-30 08:48:39"
            }
        ]
    },
]


const result = [
    {
        "parent": {
            "name": "博客管理",
            "icon": "el-icon-edit",
            "url": "/blog",
            "uid": "_blog"
        },
        "sonItem": [
            {
                "name": "博客管理",
                "icon": "el-icon-notebook-2",
                "parentUid": "_blog",
                "url": "/blog/blog",
                "uid": "Blog"
            },
            {
                "name": "分类管理",
                "icon": "el-icon-brush",
                "parentUid": "_blog",
                "url": "/blog/blogSort",
                "uid": "BlogSort"
            },
            {
                "name": "标签管理",
                "icon": "el-icon-folder-opened",
                "parentUid": "_blog",
                "url": "/blog/blogTag",
                "uid": "BlogTag"
            },
            {
                "name": "推荐管理",
                "icon": "el-icon-ice-cream-round",
                "parentUid": "_blog",
                "url": "/blog/blogRecommend",
                "uid": "BlogRecommend"
            }
        ]
    },
    {
        "parent": {
            "name": "专题管理",
            "icon": "el-icon-edit",
            "url": "/special",
            "uid": "_special"
        },
        "sonItem": [
            {
                "name": "专题分类管理",
                "icon": "el-icon-edit",
                "parentUid": "_special",
                "url": "/special/specialSort",
                "uid": "SpecialSort"
            },
            {
                "name": "专题管理",
                "icon": "el-icon-edit",
                "parentUid": "_special",
                "url": "/special/special",
                "uid": "Special"
            },
            {
                "name": "专题部分管理",
                "icon": "el-icon-edit",
                "parentUid": "_special",
                "url": "/specialPart/specialPart",
                "uid": "SpecialPart"
            },
            {
                "name": "专题部分章节管理",
                "icon": "el-icon-edit",
                "parentUid": "_special",
                "url": "/specialPartSection/specialPartSection",
                "uid": "SpecialPartSection"
            },
            {
                "name": "专题部分章节博客管理",
                "icon": "el-icon-edit",
                "parentUid": "_special",
                "url": "/specialPartSectionBlog/specialPartSectionBlog",
                "uid": "SpecialPartSectionBlog"
            }
        ]
    },
    {
        "parent": {
            "name": "系统管理",
            "icon": "el-icon-edit",
            "url": "/system",
            "uid": "_system"
        },
        "sonItem": [
            {
                "name": "联系方式",
                "icon": "el-icon-edit",
                "parentUid": "_system",
                "url": "/system/contactWay",
                "uid": "ContactWay"
            },
            {
                "name": "联系方式",
                "icon": "el-icon-edit",
                "parentUid": "_system",
                "url": "/system/friendLink",
                "uid": "FriendLink"
            },
            {
                "name": "系统配置",
                "icon": "el-icon-edit",
                "parentUid": "_system",
                "url": "/system/systemConfig",
                "uid": "SystemConfig"
            },
            {
                "name": "网站配置",
                "icon": "el-icon-edit",
                "parentUid": "_system",
                "url": "/system/webConfig",
                "uid": "WebConfig"
            },
            {
                "name": "关于我",
                "icon": "aboutMe",
                "parentUid": "_system",
                "url": "/system/aboutMe",
                "uid": "AboutMe"
            }
        ]
    },
    {
        "parent": {
            "name": "图片管理",
            "icon": "el-icon-edit",
            "url": "/picture",
            "uid": "_picture"
        },
        "sonItem": [
            {
                "name": "图片类别管理",
                "icon": "el-icon-edit",
                "parentUid": "_picture",
                "url": "/picture/pictureSort",
                "uid": "PictureSort"
            },
            {
                "name": "图片管理",
                "icon": "el-icon-edit",
                "parentUid": "_picture",
                "url": "/picture/picture",
                "uid": "Picture"
            }
        ]
    }
]
