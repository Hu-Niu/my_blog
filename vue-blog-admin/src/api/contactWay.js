import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const contactWayApi = {
    saveContactWay: (data) => {
        return axios.post(`/contactWay/saveContactWay`, data)
    },
    deleteContactWayByUid: (data) => {
        return axios.post(`/contactWay/deleteContactWayByUid`, data)
    },
    queryContactWayPage: (data) => {
        return axios.post(`/contactWay/queryContactWayPage`, data)
    },
    queryContactWayAll: () => {
        return axios.post(`/contactWay/queryContactWayAll`)
    },
    updateContactWayByUid: (data) => {
        return axios.post(`/contactWay/updateContactWayByUid`, data)
    },
}
