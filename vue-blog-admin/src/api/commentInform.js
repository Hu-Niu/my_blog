import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const commentInformApi = {
    saveCommentInform: (data) => {
        return axios.post(`/commentInform/saveCommentInform`, data)
    },
    deleteCommentInformByUid: (data) => {
        return axios.post(`/commentInform/deleteCommentInformByUid`, data)
    },
    queryCommentInformPage: (data) => {
        return axios.post(`/commentInform/queryCommentInformPage`, data)
    },
    queryCommentInformAll: () => {
        return axios.post(`/commentInform/queryCommentInformAll`)
    },
    updateCommentInformByUid: (data) => {
        return axios.post(`/commentInform/updateCommentInformByUid`, data)
    },
}
