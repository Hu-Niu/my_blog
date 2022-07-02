import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const commentReactionApi = {
    saveCommentReaction: (data) => {
        return axios.post(`/commentReaction/saveCommentReaction`, data)
    },
    deleteCommentReactionByUid: (data) => {
        return axios.post(`/commentReaction/deleteCommentReactionByUid`, data)
    },
    queryCommentReactionPage: (data) => {
        return axios.post(`/commentReaction/queryCommentReactionPage`, data)
    },
    queryCommentReactionAll: () => {
        return axios.post(`/commentReaction/queryCommentReactionAll`)
    },
    updateCommentReactionByUid: (data) => {
        return axios.post(`/commentReaction/updateCommentReactionByUid`, data)
    },
}
