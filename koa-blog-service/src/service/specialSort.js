const specialSortDao = require('../dao/specialSort')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const querySpecialSortBySpecialSortName = async (specialSortName) => {
    return await specialSortDao.querySpecialSortBySpecialSortName(specialSortName)
}

const querySpecialSortByUid = async (uid) => {
    return await specialSortDao.querySpecialSortByUid(uid)
}

const saveSpecialSort = async (params) => {
    return await specialSortDao.saveSpecialSort(params)
}

const querySpecialSortPage = async (params) => {
    return await specialSortDao.querySpecialSortPage(params)
}

const updateSpecialSortByUid = async (params) => {
    return await specialSortDao.updateSpecialSortByUid(params)
}

const deleteSpecialSortByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(specialSortDao.deleteSpecialSortByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountSpecialSort = async (params) => {
    return await specialSortDao.queryAllCountSpecialSort(params)
}

const querySpecialSortAll = async () => {
    return await specialSortDao.querySpecialSortAll()
}

module.exports = {
    saveSpecialSort,
    deleteSpecialSortByUid,
    updateSpecialSortByUid,
    querySpecialSortPage,
    querySpecialSortAll,
    queryAllCountSpecialSort,
    querySpecialSortBySpecialSortName,
    querySpecialSortByUid,
}
