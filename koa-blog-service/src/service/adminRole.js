const adminRoleDao = require('../dao/adminRole')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const queryAdminRoleByRoleName = async (roleName) => {
    return await adminRoleDao.queryAdminRoleByRoleName(roleName)
}

const queryAdminRoleByUid = async (uid) => {
    return await adminRoleDao.queryAdminRoleByUid(uid)
}

const saveAdminRole = async (params) => {
    return await adminRoleDao.saveAdminRole(params)
}

const queryAdminRolePage = async (params) => {
    return await adminRoleDao.queryAdminRolePage(params)
}

const updateAdminRoleByUid = async (params) => {
    return await adminRoleDao.updateAdminRoleByUid(params)
}

const deleteAdminRoleByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(adminRoleDao.deleteAdminRoleByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountAdminRole = async (params) => {
    return await adminRoleDao.queryAllCountAdminRole(params)
}

const queryAdminRoleAll = async () => {
    return await adminRoleDao.queryAdminRoleAll()
}

module.exports = {
    saveAdminRole,
    deleteAdminRoleByUid,
    updateAdminRoleByUid,
    queryAdminRolePage,
    queryAdminRoleAll,
    queryAllCountAdminRole,
    queryAdminRoleByRoleName,
    queryAdminRoleByUid,
}
