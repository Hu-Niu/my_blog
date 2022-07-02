import axios from '../lib/request'


export const blogApi = {
    saveArticle: (data) => {
        return axios.post(`/article/saveArticle`, data)
    },
    deleteArticleByUid: (data) => {
        return axios.post(`/article/deleteArticleByUid`, data)
    },
    queryArticlePage: (data) => {
        return axios.post(`/article/queryArticlePage`, data)
    },
    updateArticleByUid: (data) => {
        return axios.post(`/article/updateArticleByUid`, data)
    },
    queryArticleByRecommendLevel: (data) => {
        return axios.get(`/article/queryArticleByRecommendLevel?recommendLevel=${data}`)
    },
    queryArticleAll: () => {
        return axios.post(`/article/queryArticleAll`)
    },

}
