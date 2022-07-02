import axios from '../lib/request'
/*
	模式 $API文件占位符替换$
	替换方式：模块名大小驼峰替换
*/
export const adminRoleApi = {
    saveAdminRole: (data) => {
        return axios.post(`/adminRole/saveAdminRole`, data)
    },
    deleteAdminRoleByUid: (data) => {
        return axios.post(`/adminRole/deleteAdminRoleByUid`, data)
    },
    queryAdminRolePage: (data) => {
        return axios.post(`/adminRole/queryAdminRolePage`, data)
    },
    queryAdminRoleAll: () => {
        return axios.post(`/adminRole/queryAdminRoleAll`)
    },
    updateAdminRoleByUid: (data) => {
        return axios.post(`/adminRole/updateAdminRoleByUid`, data)
    },


}
