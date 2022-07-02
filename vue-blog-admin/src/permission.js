/*
* 添加路由首位，没有token时
* 1、没有token时，重定向到登录页
* */

import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式


const whiteList = ['/login'] // 不重定向白名单
const allList = getAllPath(router.options.routes) // 所有已配置过的路由，如果输入的地址不在范围内，重定向到404

// 路由开始前钩子 next() 放行
router.beforeEach(async (to, from, next) => {
    console.log('router.beforeEach')
    NProgress.start()
    if (store.state.user.token) { // 有token
        if (to.path === '/login') { // 有token 是 login
            next({path: '/'})
            NProgress.done()
        } else if(allList.indexOf(to.path) === -1) { // 有token 是 随便输的错地址
            next({path: '/404'})
            NProgress.done()
        } else { // 有token
            /*
            *  1、有token 说明已登录进来了，这时候就获取一下登录人的信息
            *       从local storage 中拿，
            *       如果没有，就用token 从后端拿，保存在本地 local storage 中
            * */
            if(!store.state.user.loginUserInfo){
                await store.dispatch('setLoginUserInfo')
            }
            next()
        }
    } else { // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            NProgress.done()
        }
    }
})

// 路由结束后钩子
router.afterEach(() => {
    console.log('router.afterEach')
    NProgress.done()
})


function getAllPath(routers, resultArr = []) {
    routers.map(item => {
        resultArr.push(item.path)
        if(item.children){
            getAllPath(item.children,resultArr)
        }
    })

    return resultArr
}
