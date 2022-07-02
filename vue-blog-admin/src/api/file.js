import axios from '../lib/request'


export const fileApi = {
  queryAllFileSort: () => {
    return axios.post(`/file/queryAllFileSort`)
  },
  queryAllFilePage: (data) => {
    return axios.post(`/file/queryAllFilePage`, data)
  },
  deleteFileByUid: (data) => {
    return axios.post(`/file/deleteFileByUid`, data)
  },
  updateFileSortByUid: (data) => {
    return axios.post(`/file/updateFileSortByUid`, data)
  },
}
