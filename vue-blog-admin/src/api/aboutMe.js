import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const aboutMeApi = {
    saveAboutMe: (data) => {
        return axios.post(`/aboutMe/saveAboutMe`, data)
    },
    deleteAboutMeByUid: (data) => {
        return axios.post(`/aboutMe/deleteAboutMeByUid`, data)
    },
    queryAboutMePage: (data) => {
        return axios.post(`/aboutMe/queryAboutMePage`, data)
    },
    queryAboutMeAll: () => {
        return axios.post(`/aboutMe/queryAboutMeAll`)
    },
    updateAboutMeByUid: (data) => {
        return axios.post(`/aboutMe/updateAboutMeByUid`, data)
    },
    queryAboutMeByAdminUserId: (data) => {
        return axios.post(`/aboutMe/queryAboutMeByAdminUserId`, data)
    },

}
