import axios from '../lib/request'
export const specialApi = {
    saveSpecial: (data) => {
        return axios.post(`/special/saveSpecial`, data)
    },
    deleteSpecialByUid: (data) => {
        return axios.post(`/special/deleteSpecialByUid`, data)
    },
    querySpecialPage: (data) => {
        return axios.post(`/special/querySpecialPage`, data)
    },
    querySpecialAll: (data) => {
        return axios.post(`/special/querySpecialAll`, data)
    },
    updateSpecialByUid: (data) => {
        return axios.post(`/special/updateSpecialByUid`, data)
    },
}
