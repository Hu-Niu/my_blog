const commentInformDao = require('../dao/commentInform')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const queryCommentInformByInformType = async (informType) => {
    return await commentInformDao.queryCommentInformByInformType(informType)
}

const queryCommentInformByUid = async (uid) => {
    return await commentInformDao.queryCommentInformByUid(uid)
}

const saveCommentInform = async (params) => {
    return await commentInformDao.saveCommentInform(params)
}

const queryCommentInformPage = async (params) => {
    return await commentInformDao.queryCommentInformPage(params)
}

const updateCommentInformByUid = async (params) => {
    return await commentInformDao.updateCommentInformByUid(params)
}

const deleteCommentInformByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(commentInformDao.deleteCommentInformByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountCommentInform = async (params) => {
    return await commentInformDao.queryAllCountCommentInform(params)
}

const queryCommentInformAll = async () => {
    return await commentInformDao.queryCommentInformAll()
}

module.exports = {
    saveCommentInform,
    deleteCommentInformByUid,
    updateCommentInformByUid,
    queryCommentInformPage,
    queryCommentInformAll,
    queryAllCountCommentInform,
    queryCommentInformByInformType,
    queryCommentInformByUid,
}
