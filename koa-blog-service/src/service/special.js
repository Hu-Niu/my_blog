const specialDao = require('../dao/special')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const querySpecialBySpecialName = async (specialName) => {
    return await specialDao.querySpecialBySpecialName(specialName)
}

const querySpecialByUid = async (uid) => {
    return await specialDao.querySpecialByUid(uid)
}

const saveSpecial = async (params) => {
    return await specialDao.saveSpecial(params)
}

const querySpecialPage = async (params) => {
    return await specialDao.querySpecialPage(params)
}

const updateSpecialByUid = async (params) => {
    return await specialDao.updateSpecialByUid(params)
}

const deleteSpecialByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(specialDao.deleteSpecialByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountSpecial = async (params) => {
    return await specialDao.queryAllCountSpecial(params)
}

const querySpecialAll = async (isXzzOrCheny) => {
    return await specialDao.querySpecialAll(isXzzOrCheny)
}

module.exports = {
    saveSpecial,
    deleteSpecialByUid,
    updateSpecialByUid,
    querySpecialPage,
    querySpecialAll,
    queryAllCountSpecial,
    querySpecialBySpecialName,
    querySpecialByUid,
}
