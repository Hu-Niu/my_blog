import axios from '../lib/request'


export const blogTagApi = {
    saveBlogTag: (data) => {
        return axios.post(`/articleTag/saveArticleTag`, data)
    },
    deleteBlogTagByUid: (data) => {
        return axios.post(`/articleTag/deleteArticleTagByUid`, data)
    },
    queryBlogTagPage: (data) => {
        return axios.post(`/articleTag/queryArticleTagPage`, data)
    },
    queryHotArticleTagPage: (data) => {
        return axios.post(`/articleTag/queryHotArticleTagPage`, data)
    },

    queryBlogTagAll2: (data) => {
        return axios.post(`/articleTag/queryArticleTagAll2`, data)
    },
    updateBlogTagByUid: (data) => {
        return axios.post(`/articleTag/updateArticleTagByUid`, data)
    },
}
