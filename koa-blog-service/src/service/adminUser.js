const adminUserDao = require('../dao/adminUser')
const jwt = require('jsonwebtoken')
const {keys} = require('../constant/config')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const queryAdminUserByUserName = async (userName) => {
    return await adminUserDao.queryAdminUserByUserName(userName)
}

const queryAdminUserByUid = async (uid) => {
    return await adminUserDao.queryAdminUserByUid(uid)
}

const saveAdminUser = async (params) => {
    return await adminUserDao.saveAdminUser(params)
}

const queryAdminUserPage = async (params) => {
    return await adminUserDao.queryAdminUserPage(params)
}

const updateAdminUserByUid = async (params) => {
    return await adminUserDao.updateAdminUserByUid(params)
}

const deleteAdminUserByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(adminUserDao.deleteAdminUserByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountAdminUser = async (params) => {
    return await adminUserDao.queryAllCountAdminUser(params)
}

const queryAdminUserAll = async () => {
    return await adminUserDao.queryAdminUserAll()
}

const queryUserByUsername = async (username) => {
    return await adminUserDao.queryUserByUsername(username)
}

/**
 * @description 生成 jwt token
 * @param {Object} data 数据库查到的用户信息
 * @param {Number} expires 单位时秒
 * @param {String} identity 区分后台管理员登录还是前台用户登录 'adminUser'|'webUser'
 * @return {String} 生成的token
 */
const generateToken = async (data, expires,identity) => {
    // identity:'adminUser'|'webUser'
    // 用来区分后台管理员登录还是前台用户登录
    let payload = {uid: data.uid,identity}

    // expiresIn 单位是 秒 3600s 就是1小时
    let token = jwt.sign(payload, keys, {expiresIn: expires})

    return `Bearer ${token}`
}

const adminResetPasswordByUid = async (password,uid) => {
    return await adminUserDao.adminResetPasswordByUid(password,uid)
}

module.exports = {
    saveAdminUser,
    deleteAdminUserByUid,
    updateAdminUserByUid,
    queryAdminUserPage,
    queryAdminUserAll,
    queryAllCountAdminUser,
    queryAdminUserByUserName,
    queryAdminUserByUid,
    queryUserByUsername,
    generateToken,
    adminResetPasswordByUid,
}
