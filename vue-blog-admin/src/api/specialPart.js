import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const specialPartApi = {
    saveSpecialPart: (data) => {
        return axios.post(`/specialPart/saveSpecialPart`, data)
    },
    deleteSpecialPartByUid: (data) => {
        return axios.post(`/specialPart/deleteSpecialPartByUid`, data)
    },
    querySpecialPartPage: (data) => {
        return axios.post(`/specialPart/querySpecialPartPage`, data)
    },
    querySpecialPartAll: () => {
        return axios.post(`/specialPart/querySpecialPartAll`)
    },
    updateSpecialPartByUid: (data) => {
        return axios.post(`/specialPart/updateSpecialPartByUid`, data)
    },
}
