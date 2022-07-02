const userDao = require('../dao/user')
const jwt = require('jsonwebtoken')
const {keys} = require('../constant/config')

const queryUserByUid = async (uid) => {
    return await userDao.queryUserByUid(uid)
}

const generateToken = async (data,expires) => {
    let payload = {uid: data.uid}

    // expiresIn 单位是 秒 3600s 就是1小时
    let token = jwt.sign(payload, keys, {expiresIn: expires})

    return `Bearer ${token}`
}

const queryUserByUsername = async (username) => {
    return await userDao.queryUserByUsername(username)
}

const saveUser = async (uuid,username, password) => {
    await userDao.saveUser(uuid,username, password)
}

const updateUserByUsername = async (password,username) => {
    await userDao.updateUserByUsername(password,username)
}


module.exports = {
    generateToken,
    queryUserByUsername,
    queryUserByUid,
    saveUser,
    updateUserByUsername,
}
