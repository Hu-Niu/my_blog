import axios from "axios";
import {Message, MessageBox, Loading} from 'element-ui'
import store from '../store'
import router from "../router";


let loading = null; // 全局唯一loading框
let requestNum = 0; // 同一时间的接口请求数

let baseURL
if(process.env.NODE_ENV === 'development'){ // 开发环境
    baseURL = myConfig.apiUrlDevelopment
} else { // 生产环境
    if(isDemoVersion){
        baseURL = myConfig.apiUrlDemo
    } else {
        baseURL = myConfig.apiUrlProduction
    }
}
//axios基本配置
axios.defaults.baseURL = baseURL

// 超时时间
axios.defaults.timeout = 10 * 1000 // 单位ms
// 跨域请求，允许保存cookie
// axios.defaults.withCredentials = true

// HTTPrequest拦截
axios.interceptors.request.use(config => {
    config.headers['client'] = 'web' // 固定传入的值，用来区分来自那里

    if (store.state.user.token) {
        config.headers['Authorization'] = store.state.user.token // 让每个请求携带token
        config.headers['userId'] = store.state.user.loginUserInfo.uid // 让每个请求携带当前登录用户的uid
    }

    // 请求加1
    requestNum++;

    loading = Loading.service({fullscreen: true, text: '正在努力加载中~'});

    return config
}, error => {

    // 出错了直接关闭loading
    requestNum = 0
    if (loading) {
        loading.close();
    }

    return Promise.reject(error)

})

// HTTPresponse拦截
axios.interceptors.response.use(
    res => {

        // 请求数减1
        requestNum--

        if (requestNum <= 0) {
            loading.close()
        }

        // 响应的状态码如果是0，提示报错
        if(res.data.code === 0){
            let data = res.data
            Message({
                message: data.extendInfo ? data.extendInfo : data.msg,
                type: 'error',
                duration: 1500,
            })
        }
        return Promise.resolve(res);
    },
    error => {
        console.dir(error)

        // 出错了直接关闭loading
        requestNum = 0
        loading.close()
        if (!error.response && error.message === 'Network Error') {
            Message.error('服务端未开启')
        } else if (!error.response && /timeout/.test(error.message)) {
            Message.error('接口响应超时')
        } else {
            /*switch (error.response.status) {
                // token过期或者未登录
                case 401:
                    MessageBox.confirm(
                        'token已过期，可以取消继续留在该页面，或者重新登录',
                        '重新登录',
                        {
                            confirmButtonText: '重新登录',
                            cancelButtonText: '取消',
                            showClose: false,
                            closeOnClickModal: false,
                            type: 'warning'
                        }
                    ).then(async () => {
                        //1、清除已过期token
                        //2、跳转到登录页
                        await store.dispatch('clearAll')
                        await router.push('/login')
                    })
                    break;
            }*/
        }
        return Promise.reject(error)
    })

export default axios
