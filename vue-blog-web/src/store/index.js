import Vue from 'vue'
import Vuex from 'vuex'

import messageBoard from "./modules/messageBoard";
import user from "./modules/user";

import {userMutation,indexMutation} from "./mutation-types";
import {setUserInfoInLocalStorage} from "../lib/local";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        messageBoard,
        user,
    },
    state: {
        // 是否展示登录框
        isShowLoginBox: false,
    },
    mutations: {
        /**
         * @description 显示登录框
         */
        [indexMutation.SHOW_LOGIN_DIALOG](state) {
            state.isShowLoginBox = true
        },
        /**
         * @description 隐藏登录框
         */
        [indexMutation.HIDDEN_LOGIN_DIALOG](state) {
            state.isShowLoginBox = false
        },
    },
    getters: {},
    actions: {
        clearAll({commit, state}){
            return new Promise(async (resolve, reject) => {
                commit(userMutation.CLEAR_TOKEN)
                commit(userMutation.REMOVE_USER_INFO)
                resolve()
            })
        },
    },
});

export default store
