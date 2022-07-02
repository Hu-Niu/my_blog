import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import {appMutation, userMutation} from "./mutation-types";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
  },
  state: {},
  getters: {},
  actions: {
      clearAll({commit, state}){
          return new Promise(async (resolve, reject) => {
              commit(appMutation.REMOVE_ALL_TAGS)
              commit(appMutation.REMOVE_SEARCHBAR)
              commit(appMutation.REMOVE_SIDEBAR)
              commit(userMutation.CLEAR_TOKEN)
              commit(userMutation.REMOVE_USER_INFO)
              resolve()
          })
      },
  },
  mutations: {}
});

export default store
