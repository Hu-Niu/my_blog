/**
 *@description app module 中的 mutation 常量
 * @type {{TOGGLE_SIDEBAR: string}} 更改侧边栏显示隐藏
 * @type {{TOGGLE_SEARCHBAR: string}} 更改搜索框显示隐藏
 * @type {{CHANGE_BREAD_LIST: string}} 更改面包屑导航
 * @type {{PUSH_KEEP_ALIVE_INCLUDES: string}} 增加缓存路由
 * @type {{DELETE_KEEP_ALIVE_INCLUDES_BY_NAME: string}} 删除缓存路由，删除单个
 * @type {{PUSH_TAG_NAV_LIST: string}} 增加缓存路由标签
 * @type {{SET_TAGS: Array}} 设置缓存路由标签
 * @type {{REMOVE_ALL_TAGS: string}} 清空缓存路由标签
 * @type {{CLOSE_ALL_TAGS: string}} 关闭所有导航上的tag，除了首页
 * @type {{CLOSE_OTHER_TAGS: string}} 关闭导航上的其它标签，除了首页
 */
export const appMutation = {
    TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
    TOGGLE_SEARCHBAR: 'TOGGLE_SEARCHBAR',
    REMOVE_SIDEBAR: 'remove_sidebar',
    REMOVE_SEARCHBAR: 'remove_searchbar',

    CHANGE_BREAD_LIST: 'CHANGE_BREAD_LIST',
    PUSH_KEEP_ALIVE_INCLUDES: 'PUSH_KEEP_ALIVE_INCLUDES',
    DELETE_KEEP_ALIVE_INCLUDES_BY_NAME: 'DELETE_KEEP_ALIVE_INCLUDES_BY_NAME',
    PUSH_TAG_NAV_LIST: 'PUSH_TAG_NAV_LIST',
    SET_TAGS: 'SET_TAGS',
    REMOVE_ALL_TAGS: 'REMOVE_ALL_TAGS', // 退出登录时，使用
    CLOSE_ALL_TAGS: 'close_all_tags', // 关闭所有导航上的tag，除了首页
    CLOSE_OTHER_TAGS: 'close_other_tags', // 关闭导航上的其它标签，除了首页


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
