const webUserDao = require('../dao/webUser')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const queryWebUserByUserTel = async (userTel) => {
    return await webUserDao.queryWebUserByUserTel(userTel)
}

const queryWebUserByUid = async (uid) => {
    return await webUserDao.queryWebUserByUid(uid)
}

const saveWebUser = async (params) => {
    return await webUserDao.saveWebUser(params)
}

const queryWebUserPage = async (params) => {
    return await webUserDao.queryWebUserPage(params)
}
const queryWebUser = async (params) => {
    return await webUserDao.queryWebUser(params)
}


const updateWebUserByUid = async (params) => {
    return await webUserDao.updateWebUserByUid(params)
}

const deleteWebUserByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(webUserDao.deleteWebUserByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountWebUser = async (params) => {
    return await webUserDao.queryAllCountWebUser(params)
}

const queryWebUserAll = async () => {
    return await webUserDao.queryWebUserAll()
}

module.exports = {
    saveWebUser,
    deleteWebUserByUid,
    updateWebUserByUid,
    queryWebUserPage,
    queryWebUserAll,
    queryAllCountWebUser,
    queryWebUserByUserTel,
    queryWebUserByUid,
    queryWebUser,
}
