const aboutMeDao = require('../dao/aboutMe')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const queryAboutMeByAdminUserId = async (adminUserId) => {
    return await aboutMeDao.queryAboutMeByAdminUserId(adminUserId)
}

const queryAboutMeByUid = async (uid) => {
    return await aboutMeDao.queryAboutMeByUid(uid)
}

const saveAboutMe = async (params) => {
    return await aboutMeDao.saveAboutMe(params)
}

const queryAboutMePage = async (params) => {
    return await aboutMeDao.queryAboutMePage(params)
}

const updateAboutMeByUid = async (params) => {
    return await aboutMeDao.updateAboutMeByUid(params)
}

const deleteAboutMeByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(aboutMeDao.deleteAboutMeByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountAboutMe = async (params) => {
    return await aboutMeDao.queryAllCountAboutMe(params)
}

const queryAboutMeAll = async () => {
    return await aboutMeDao.queryAboutMeAll()
}

module.exports = {
    saveAboutMe,
    deleteAboutMeByUid,
    updateAboutMeByUid,
    queryAboutMePage,
    queryAboutMeAll,
    queryAllCountAboutMe,
    queryAboutMeByAdminUserId,
    queryAboutMeByUid,
}
