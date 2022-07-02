const specialPartDao = require('../dao/specialPart')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const querySpecialPartByPartName = async (partName,specialId) => {
    return await specialPartDao.querySpecialPartByPartName(partName,specialId)
}

const querySpecialPartByUid = async (uid) => {
    return await specialPartDao.querySpecialPartByUid(uid)
}

const saveSpecialPart = async (params) => {
    return await specialPartDao.saveSpecialPart(params)
}

const querySpecialPartPage = async (params) => {
    return await specialPartDao.querySpecialPartPage(params)
}

const updateSpecialPartByUid = async (params) => {
    return await specialPartDao.updateSpecialPartByUid(params)
}

const deleteSpecialPartByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(specialPartDao.deleteSpecialPartByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountSpecialPart = async (params) => {
    return await specialPartDao.queryAllCountSpecialPart(params)
}

const querySpecialPartAll = async () => {
    return await specialPartDao.querySpecialPartAll()
}

module.exports = {
    saveSpecialPart,
    deleteSpecialPartByUid,
    updateSpecialPartByUid,
    querySpecialPartPage,
    querySpecialPartAll,
    queryAllCountSpecialPart,
    querySpecialPartByPartName,
    querySpecialPartByUid,
}
