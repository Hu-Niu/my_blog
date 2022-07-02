import {appMutation, userMutation} from '../mutation-types'
import vueRouter from '/src/router'
import {
    setSideBarStatus,
    getSideBarStatus,
    removeSideBarStatus,
    setSearchBarStatus,
    getSearchBarStatus,
    removeSearchBarStatus,
} from '../../lib/cookie'

import {
    setTagNavListInLocalStorage,
    getTagNavListInLocalStorage,
    removeTagNavListInLocalStorage,
} from '/src/lib/local'

/**
 * @param {Object} vueRouter 全局配置的vueRouter对象
 * @return {*} 返回 path为 / 重定向后的路由对象
 */
function getHomeRoute(vueRouter) {
    let homeRouterRedirect = {}
    const routes = vueRouter.options.routes
    routes.find(item => {
        if (item.path === '/') {
            item.children.find(childItem => {
                if (item.redirect === childItem.path) {
                    homeRouterRedirect = childItem
                }
            })
        }
    })
    return homeRouterRedirect
}


export default {
    state: {
        // 是否折叠侧边栏 true：折叠； false：展开；
        sidebar: {
            isCollapse: Boolean(+getSideBarStatus())
        },

        // 是否隐藏条件搜索 true：隐藏；false：显示；
        isHiddenSearch: Boolean(+getSearchBarStatus()),

        // 缓存路由
        keepAliveIncludes: [],

        // 面包屑导航
        breadList: [],

        // 缓存路由标签
        tagNavList: [],
    },
    getters: {},
    mutations: {
        /**
         * @description 清空，退出时使用
         */
        [appMutation.REMOVE_SIDEBAR](state) {
            state.sidebar = {isCollapse: false};
            removeSideBarStatus()
        },

        /**
         * @description 清空，退出时使用
         */
        [appMutation.REMOVE_SEARCHBAR](state) {
            state.isHiddenSearch = true;
            removeSearchBarStatus()
        },

        /**
         * @description 更改侧边栏状态，控制侧边栏显示隐藏
         */
        [appMutation.TOGGLE_SIDEBAR](state) {
            // 1：折叠； 0：展开
            if (state.sidebar.isCollapse) {
                setSideBarStatus(0)
            } else {
                setSideBarStatus(1)
            }
            state.sidebar.isCollapse = !state.sidebar.isCollapse
        },
        /**
         * @description 更改搜索框状态，控制搜索框显示隐藏
         */
        [appMutation.TOGGLE_SEARCHBAR](state) {
            // 1：隐藏； 0：显示
            if (state.isHiddenSearch) {
                setSearchBarStatus(0)
            } else {
                setSearchBarStatus(1)
            }
            state.isHiddenSearch = !state.isHiddenSearch
        },
        /**
         * @description 更改面包屑导航
         * @param {Array} val 传过来的是路由层级数组 this.$route.matched
         */
        [appMutation.CHANGE_BREAD_LIST](state, val) {
            state.breadList = val
        },
        /**
         * @description 增加缓存路由，与keep-alive标签的include属性搭配使用
         * @param {String} val 传过来的是准备要缓存组件的name，这个name与路由里配置的name需要保持一致
         */
        [appMutation.PUSH_KEEP_ALIVE_INCLUDES](state, val) {
            let number = state.keepAliveIncludes.findIndex(item => item === val);
            if (number === -1) {
                state.keepAliveIncludes.push(val);
            }
        },
        /**
         * @description 删除缓存路由，删除单个
         * @param {String} val 当前点击的路由
         */
        [appMutation.DELETE_KEEP_ALIVE_INCLUDES_BY_NAME](state, val) {
            let index = state.keepAliveIncludes.findIndex(item => item === val);
            state.keepAliveIncludes.splice(index, 1)
        },
        /**
         * @description 增加缓存路由标签
         * @param {Object} val 当前点击的路由
         */
        [appMutation.PUSH_TAG_NAV_LIST](state, val) {
            // 刷新页面时，传进来的val是undefined，从localStorage中读取
            if (typeof val === 'undefined') {
                let list = getTagNavListInLocalStorage()
                // 如果是空数组，默认第一个标签为首页
                if (list.length === 0) {
                    const {path, name, meta} = getHomeRoute(vueRouter)
                    list.push({path, name, meta})
                }
                state.tagNavList = list
                return
            }

            const {path, name, meta} = val

            let number = state.tagNavList.findIndex(item => item.name === name);
            if (number === -1) {
                state.tagNavList.push({path, name, meta})
            }

            setTagNavListInLocalStorage(state.tagNavList)
        },
        /**
         * @description 设置新的标签数组
         * @param {Array} val 新的路由标签数组
         */
        [appMutation.SET_TAGS](state, val) {
            state.tagNavList = val;
        },
        /**
         * @description 清空缓存中的所有路由标签，退出时使用
         */
        [appMutation.REMOVE_ALL_TAGS](state) {
            state.tagNavList = [];
            removeTagNavListInLocalStorage()
        },

        /**
         * @description 关闭所有导航上的tag，除了首页
         */
        [appMutation.CLOSE_ALL_TAGS](state) {
            state.tagNavList = [state.tagNavList[0]];
            removeTagNavListInLocalStorage()
        },

        /**
         * @description 关闭导航上的其它标签，除了首页
         */
        [appMutation.CLOSE_OTHER_TAGS](state, pathName) {
            // 先拿到首页
            let home = state.tagNavList[0]
            console.log(home)
            // 如果当前页就是首页，直接把其它的都删除
            if(home.name === pathName){
                state.tagNavList = [home]
            }else {
                // 如果不是首页，
                state.tagNavList = state.tagNavList.filter(item=>{
                    return item.name === pathName
                })
                // 再把首页塞到头部
                state.tagNavList.unshift(home)
            }

            // 清除缓存
            removeTagNavListInLocalStorage()
        },






    },
    actions: {
        deleteTagByName({commit, state}, val) {
            return new Promise((resolve, reject) => {
                let tempTags = JSON.parse(JSON.stringify(state.tagNavList))
                let index = tempTags.findIndex(item => item.name === val);
                const resultTags = tempTags.filter(item => {
                    return item.name !== val
                })
                commit(appMutation.SET_TAGS, resultTags)
                setTagNavListInLocalStorage(resultTags)

                // 如果删除的是最后一个标签，返回前一个标签
                if (index === tempTags.length - 1) {
                    resolve(resultTags[index - 1])
                } else {
                    // 返回下一个标签
                    resolve(resultTags[index])
                }
            })
        },
    },

}
