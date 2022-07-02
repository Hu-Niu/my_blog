import axios from '../lib/request'

export const specialSortApi = {
    saveSpecialSort: (data) => {
        return axios.post(`/specialSort/saveSpecialSort`, data)
    },
    deleteSpecialSortByUid: (data) => {
        return axios.post(`/specialSort/deleteSpecialSortByUid`, data)
    },
    querySpecialSortPage: (data) => {
        return axios.post(`/specialSort/querySpecialSortPage`, data)
    },
    querySpecialSortAll: () => {
        return axios.post(`/specialSort/querySpecialSortAll`)
    },
    updateSpecialSortByUid: (data) => {
        return axios.post(`/specialSort/updateSpecialSortByUid`, data)
    },
}
