import axios from '../lib/request'


export const blogSortApi = {
  saveBlogSort: (data) => {
    return axios.post(`/articleSort/saveArticleSort`, data)
  },
  deleteBlogSortByUid: (data) => {
    return axios.post(`/articleSort/deleteArticleSortByUid`, data)
  },
  queryBlogSortPage: (data) => {
    return axios.post(`/articleSort/queryArticleSortPage`, data)
  },
  queryArticleSortAll2: () => {
    return axios.post(`/articleSort/queryArticleSortAll2`)
  },
  updateBlogSortByUid: (data) => {
    return axios.post(`/articleSort/updateArticleSortByUid`, data)
  },
}
