import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const $VAR_SMALL_HUMP$Api = {
    save$VAR_BIG_HUMP$: (data) => {
        return axios.post(`/$VAR_SMALL_HUMP$/save$VAR_BIG_HUMP$`, data)
    },
    delete$VAR_BIG_HUMP$ByUid: (data) => {
        return axios.post(`/$VAR_SMALL_HUMP$/delete$VAR_BIG_HUMP$ByUid`, data)
    },
    query$VAR_BIG_HUMP$Page: (data) => {
        return axios.post(`/$VAR_SMALL_HUMP$/query$VAR_BIG_HUMP$Page`, data)
    },
    query$VAR_BIG_HUMP$All: () => {
        return axios.post(`/$VAR_SMALL_HUMP$/query$VAR_BIG_HUMP$All`)
    },
    update$VAR_BIG_HUMP$ByUid: (data) => {
        return axios.post(`/$VAR_SMALL_HUMP$/update$VAR_BIG_HUMP$ByUid`, data)
    },
}
