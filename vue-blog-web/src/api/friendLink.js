import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const friendLinkApi = {
    saveFriendLink: (data) => {
        return axios.post(`/friendLink/saveFriendLink`, data)
    },
    deleteFriendLinkByUid: (data) => {
        return axios.post(`/friendLink/deleteFriendLinkByUid`, data)
    },
    queryFriendLinkPage: (data) => {
        return axios.post(`/friendLink/queryFriendLinkPage`, data)
    },
    queryFriendLinkAll: (data) => {
        return axios.post(`/friendLink/queryFriendLinkAll`,data)
    },
    updateFriendLinkByUid: (data) => {
        return axios.post(`/friendLink/updateFriendLinkByUid`, data)
    },
}
