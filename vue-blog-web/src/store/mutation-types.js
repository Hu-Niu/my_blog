/**
 * @description messageBoard 中的 mutation 常量
 * @type {{CHANGE_MESSAGE_HIDDEN_LIST: string}} 改变需要隐藏的评论框列表
 * @type {{CHANGE_WAIT_DELETE_COMMENTS_IDS: string}} 修改等待删除的评论
 */
export const messageBoardMutation = {
    CHANGE_MESSAGE_HIDDEN_LIST: 'change_message_hidden_list',
    CHANGE_WAIT_DELETE_COMMENTS_IDS: 'change_wait_delete_comments_ids',
    CHANGE_REPORTED_COMMENT_ID: 'change_reported_comment_id',
}

/**
 * @description index 中的 mutation 常量
 * @type {{SHOW_LOGIN_DIALOG: string}} 显示登录框
 * @type {{HIDDEN_LOGIN_DIALOG: string}} 隐藏登录框
 */
export const indexMutation = {
    SHOW_LOGIN_DIALOG: 'show_login_dialog',
    HIDDEN_LOGIN_DIALOG: 'hidden_login_dialog',
}

/**
 * @description user module 中的 mutation 常量
 * @type {{SET_TOKEN: string}} 设置token
 * @type {{CLEAR_TOKEN: string}} 清除token
 * @type {{SET_USER_INFO: string}} 设置登录用户信息
 * @type {{REMOVE_USER_INFO: string}} 清除登录用户信息
 */
export const userMutation = {
    SET_TOKEN: 'SET_TOKEN',
    CLEAR_TOKEN: 'CLEAR_TOKEN',
    SET_USER_INFO: 'set_user_info',
    REMOVE_USER_INFO: 'remove_user_info',
}
