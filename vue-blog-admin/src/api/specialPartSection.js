import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const specialPartSectionApi = {
    saveSpecialPartSection: (data) => {
        return axios.post(`/specialPartSection/saveSpecialPartSection`, data)
    },
    deleteSpecialPartSectionByUid: (data) => {
        return axios.post(`/specialPartSection/deleteSpecialPartSectionByUid`, data)
    },
    querySpecialPartSectionPage: (data) => {
        return axios.post(`/specialPartSection/querySpecialPartSectionPage`, data)
    },
    querySpecialPartSectionAll: () => {
        return axios.post(`/specialPartSection/querySpecialPartSectionAll`)
    },
    updateSpecialPartSectionByUid: (data) => {
        return axios.post(`/specialPartSection/updateSpecialPartSectionByUid`, data)
    },
    querySpecialPartSectionTree: (data) => {
        return axios.get(`/specialPartSection/querySpecialPartSectionTree`, data)
    },

}
