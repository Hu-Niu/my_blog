import axios from '../lib/request'


export const fileSortApi = {
  saveBlogSort: (data) => {
    return axios.post(`/fileSort/saveFileSort`, data)
  },
  deleteBlogSortByUid: (data) => {
    return axios.post(`/fileSort/deleteFileSortByUid`, data)
  },
  queryBlogSortPage: (data) => {
    return axios.post(`/fileSort/queryFileSortPage`, data)
  },
  updateBlogSortByUid: (data) => {
    return axios.post(`/fileSort/updateFileSortByUid`, data)
  },
}
