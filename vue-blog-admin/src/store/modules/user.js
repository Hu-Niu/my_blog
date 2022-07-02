import {userMutation} from '../mutation-types'
import {
    setToken,
    getToken,
    clearToken
} from '../../lib/cookie'
import {
    setUserInfoInLocalStorage,
    removeUserInfoInLocalStorage,
    getUserInfoInLocalStorage,
} from '../../lib/local'

import {adminUserApi} from '../../api/adminUser'

export default {
    state: {
        token: getToken() || '', // 登录成功后保存，或者直接从cookie中获取
        loginUserInfo: getUserInfoInLocalStorage() || '', // 第一次登录成功后获取用户信息，保存在local Storage中
    },
    mutations: {
        /**
         * @param {Object} payload 后台获取到的用户信息
         * @description 设置已登录用户信息
         */
        [userMutation.SET_USER_INFO](state, payload) {
            // 将token存到cookie中
            setUserInfoInLocalStorage(payload)
            state.loginUserInfo = payload
        },
        /**
         * @param {String} payload 后台获取到的token
         * @description 清除已登录用户信息
         */
        [userMutation.REMOVE_USER_INFO](state) {
            // 清除 local storage 中的 loginUserInfo
            removeUserInfoInLocalStorage()
            state.loginUserInfo = ''
        },

        /**
         * @param {String} payload 后台获取到的token
         * @description 设置token
         */
        [userMutation.SET_TOKEN](state, payload) {
            // 将token存到cookie中
            setToken(payload)
            state.token = payload
        },
        /**
         * @param {String} payload 后台获取到的token
         * @description 清除token
         */
        [userMutation.CLEAR_TOKEN](state) {
            // 清除cookie中的token
            clearToken()
            state.token = ''
        },
    },
    actions: {
        setLoginUserInfo({commit, state}, payload) {
            return new Promise(async (resolve, reject) => {
                let {data} = await adminUserApi.getLoginAdminInfo()
                commit(userMutation.SET_USER_INFO, data.data)
                resolve(data)
            })
        },

    },
    getters: {},
}
