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
    queryHotArticlePage: (data) => {
        return axios.post(`/article/queryHotArticlePage`, data)
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
    // 条件查询所有
    queryArticleAll2: (data) => {
        return axios.post(`/article/queryArticleAll2`,data)
    },

    queryRecommendArticleByRecommendLevel: (levelId) => {
        return axios.get(`/article/queryRecommendArticleByRecommendLevel/${levelId}`)
    },

    queryArticleByUid: (uid) => {
        return axios.get(`/article/queryArticleByUid/${uid}`)
    },


    queryAllArticleCreateTimeList: () => {
        return axios.get(`/article/queryAllArticleCreateTimeList`)
    },



}
