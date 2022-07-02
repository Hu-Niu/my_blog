import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";


import './permission'

import Fragment from 'vue-fragment' // 额外的标签 不会被v-for渲染出来


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 测试scss 全局引入样式
import './styles/reset.scss'

import './icons'


Vue.config.productionTip = false

Vue.use(Fragment.Plugin)
Vue.use(ElementUI)


Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
