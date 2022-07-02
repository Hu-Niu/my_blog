import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const webUserApi = {
    saveWebUser: (data) => {
        return axios.post(`/webUser/saveWebUser`, data)
    },
    deleteWebUserByUid: (data) => {
        return axios.post(`/webUser/deleteWebUserByUid`, data)
    },
    queryWebUserPage: (data) => {
        return axios.post(`/webUser/queryWebUserPage`, data)
    },
    queryWebUserAll: () => {
        return axios.post(`/webUser/queryWebUserAll`)
    },
    updateWebUserByUid: (data) => {
        return axios.post(`/webUser/updateWebUserByUid`, data)
    },
}
