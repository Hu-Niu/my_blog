import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import Fragment from 'vue-fragment' // 额外的标签 不会被v-for渲染出来

import './permission'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/reset.scss'

import './icons'

// https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v2.html#using-es6-modules
import CKEditor from '@ckeditor/ckeditor5-vue2';


// 添加粒子特效
import VueParticles from 'vue-particles'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.use(Fragment.Plugin)
Vue.use( CKEditor )



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
