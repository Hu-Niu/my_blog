// 各模块通用状态码 APP 0-1000
const APP = {
    FAIL: 'fail',
    SUCCESS: 'success',
    INTERFACE_DOES_NOT_EXIST: 'interface_does_not_exist',
    PARAMETER_INVALID: 'parameter_invalid',
    UNAUTHORIZED: 'unauthorized',
    GITEE_OAUTH_FAIL: 'gitee_oauth_fail',
    QQ_OAUTH_FAIL: 'qq_oauth_fail',
    Microblog_OAUTH_FAIL: 'microblog_oauth_fail',
}

// 用户模块状态码 USER 1001-2000 自己测试的时候用的，已弃用，改为webUser
const USER = {
    USER_DOES_NOT_EXIST: 'user_does_not_exist',
    USER_ALREADY_EXISTS: 'user_already_exists',
    USER_PASSWORD_IS_INCORRECT: 'user_password_is_incorrect',
}

// 博客模块状态码 ARTICLE 2001-2100
const ARTICLE = {
    ARTICLE_SORT_ALREADY_EXISTS: 'article_sort_already_exists',
    ARTICLE_TAG_ALREADY_EXISTS: 'article_tag_already_exists',
    ARTICLE_TITLE_ALREADY_EXISTS: 'article_title_already_exists',
}
// 专题模块状态码 SPECIAL 2101-2200
const SPECIAL = {
    SPECIAL_SORT_NAME_ALREADY_EXISTS: 'special_sort_name_already_exists',
    SPECIAL_NAME_ALREADY_EXISTS: 'special_name_already_exists',
    SPECIAL_PART_NAME_ALREADY_EXISTS: 'special_part_name_already_exists',
    SPECIAL_SECTION_TITLE_ALREADY_EXISTS: 'special_section_title_already_exists',
    SPECIAL_SECTION_BLOG_ALREADY_EXISTS: 'special_section_blog_already_exists',
}

// 系统配置模块状态码 SYSTEM 2201-2300
const SYSTEM = {
    SYSTEM_CONTACT_WAY_ALREADY_EXISTS: 'system_contact_way_already_exists',
    SYSTEM_LINK_NAME_ALREADY_EXISTS: 'SYSTEM_LINK_NAME_ALREADY_EXISTS',
    SYSTEM_ADMIN_USER_ID_ALREADY_EXISTS: 'system_admin_user_id_already_exists',
}

// 管理员管理模块状态码 ADMIN 2301-2400
const ADMIN = {
    USER_NAME_ALREADY_EXISTS: 'user_name_already_exists',
    ROLE_NAME_ALREADY_EXISTS: 'role_name_already_exists',
    ADMIN_USER_DOES_NOT_EXIST: 'admin_user_does_not_exist',
    ADMIN_USER_PASSWORD_IS_INCORRECT: 'admin_user_password_is_incorrect',
}

// 评论管理模块状态码 COMMENT 2401-2500
const COMMENT = {

}

// 前台用户模块 WEB_USER 2501-2600
const WEB_USER = {
    WEB_USER_TEL_ALREADY_EXISTS: 'web_user_tel_already_exists',
}

// 文件上传模块状态码 FILE 9900-9999
const FILE = {
    FILE_UPLOAD_ERROR: 'file_upload_error',
    FILE_SORT_ALREADY_EXISTS: 'file_sort_already_exists',
}

module.exports = {
    APP,
    USER,
    ARTICLE,
    FILE,
    SPECIAL,
    SYSTEM,
    ADMIN,
    COMMENT,
    WEB_USER,
}
