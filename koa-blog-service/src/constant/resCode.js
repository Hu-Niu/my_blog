const {APP, USER, ARTICLE, FILE, SPECIAL, SYSTEM, ADMIN,COMMENT,WEB_USER} = require('./resCodeVariable')

/**
 * 统一状态码管理
 * 各模块通用状态码 APP：0-1000
 * 用户模块状态码 USER 1001-2000
 * 博客模块状态码 ARTICLE 2001-2100
 * 专题模块状态码 SPECIAL 2101-2200
 * 系统配置模块状态码 SYSTEM 2201-2300
 * 管理员管理模块状态码 ADMIN 2301-2400
 * 评论管理模块状态码 COMMENT 2401-2500
 * 前台用户模块 WEB_USER 2501-2600
 * 文件上传模块状态码 FILE 9900-9999
 */
module.exports = new Map(
    [
        [APP.FAIL, {code: 0, msg: 'fail'}],// 接口调用失败统一返回 fail
        [APP.SUCCESS, {code: 1, msg: 'success'}], // 接口调用成功统一返回 success
        [APP.UNAUTHORIZED, {code: 401, msg: '未授权'}],
        [APP.INTERFACE_DOES_NOT_EXIST, {code: 404, msg: '接口不存在'}],
        [APP.PARAMETER_INVALID, {code: 1000, msg: '参数不合法'}],

        [APP.GITEE_OAUTH_FAIL, {code: 999, msg: 'gitee鉴权失败'}],

        [USER.USER_DOES_NOT_EXIST, {code: 1001, msg: '用户不存在'}],
        [USER.USER_ALREADY_EXISTS, {code: 1002, msg: '用户已存在'}],
        [USER.USER_PASSWORD_IS_INCORRECT, {code: 1003, msg: '用户密码不正确'}],

        [ARTICLE.ARTICLE_SORT_ALREADY_EXISTS, {code: 2001, msg: '分类已存在'}],
        [ARTICLE.ARTICLE_TAG_ALREADY_EXISTS, {code: 2002, msg: '标签已存在'}],
        [ARTICLE.ARTICLE_TITLE_ALREADY_EXISTS, {code: 2003, msg: '标题已存在'}],

        [SPECIAL.SPECIAL_SORT_NAME_ALREADY_EXISTS, {code: 2101, msg: '专题分类名已存在'}],
        [SPECIAL.SPECIAL_NAME_ALREADY_EXISTS, {code: 2102, msg: '专题名已存在'}],

        [SPECIAL.SPECIAL_PART_NAME_ALREADY_EXISTS, {code: 2103, msg: '该专题->部分已存在'}],
        [SPECIAL.SPECIAL_SECTION_TITLE_ALREADY_EXISTS, {code: 2102, msg: '该专题->部分下的章节名已存在'}],
        [SPECIAL.SPECIAL_SECTION_BLOG_ALREADY_EXISTS, {code: 2103, msg: '该专题->部分->章节下的博客已存在'}],

        [SYSTEM.SYSTEM_CONTACT_WAY_ALREADY_EXISTS, {code: 2201, msg: '联系方式已存在'}],
        [SYSTEM.SYSTEM_LINK_NAME_ALREADY_EXISTS, {code: 2202, msg: '友链名已存在'}],
        [SYSTEM.SYSTEM_ADMIN_USER_ID_ALREADY_EXISTS, {code: 2203, msg: '该管理员信息已存在'}],

        [ADMIN.USER_NAME_ALREADY_EXISTS, {code: 2301, msg: '管理员账号已存在'}],
        [ADMIN.ROLE_NAME_ALREADY_EXISTS, {code: 2302, msg: '角色名已存在'}],
        [ADMIN.ADMIN_USER_DOES_NOT_EXIST, {code: 2302, msg: '用户名不存在'}],
        [ADMIN.ADMIN_USER_PASSWORD_IS_INCORRECT, {code: 2302, msg: '用户密码不正确'}],


        [WEB_USER.WEB_USER_TEL_ALREADY_EXISTS, {code: 2501, msg: '手机号已绑定'}],


        [FILE.FILE_UPLOAD_ERROR, {code: 9900, msg: '文件上传失败'}],
        [FILE.FILE_SORT_ALREADY_EXISTS, {code: 9901, msg: '文件分类已存在'}],
    ]
)
