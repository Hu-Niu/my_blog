import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const blogLikeApi = {
    saveBlogLike: (data) => {
        return axios.post(`/blogLike/saveBlogLike`, data)
    },
    deleteBlogLikeByUid: (data) => {
        return axios.post(`/blogLike/deleteBlogLikeByUid`, data)
    },
    queryBlogLikePage: (data) => {
        return axios.post(`/blogLike/queryBlogLikePage`, data)
    },
    queryBlogLikeAll: () => {
        return axios.post(`/blogLike/queryBlogLikeAll`)
    },
    updateBlogLikeByUid: (data) => {
        return axios.post(`/blogLike/updateBlogLikeByUid`, data)
    },
}
