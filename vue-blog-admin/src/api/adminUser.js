import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const adminUserApi = {
    saveAdminUser: (data) => {
        return axios.post(`/adminUser/saveAdminUser`, data)
    },
    deleteAdminUserByUid: (data) => {
        return axios.post(`/adminUser/deleteAdminUserByUid`, data)
    },
    queryAdminUserPage: (data) => {
        return axios.post(`/adminUser/queryAdminUserPage`, data)
    },
    queryAdminUserAll: () => {
        return axios.post(`/adminUser/queryAdminUserAll`)
    },
    updateAdminUserByUid: (data) => {
        return axios.post(`/adminUser/updateAdminUserByUid`, data)
    },
    adminResetPasswordByUid: (data) => {
        return axios.post(`/adminUser/adminResetPasswordByUid`, data)
    },
    adminLogin: (data) => {
        return axios.post(`/adminUser/adminLogin`, data)
    },
    getLoginAdminInfo: () => {
        return axios.post(`/adminUser/adminInfo`)
    },

}
