const contactWayDao = require('../dao/contactWay')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const queryContactWayByContactWay = async (contactWay) => {
    return await contactWayDao.queryContactWayByContactWay(contactWay)
}

const queryContactWayByUid = async (uid) => {
    return await contactWayDao.queryContactWayByUid(uid)
}

const saveContactWay = async (params) => {
    return await contactWayDao.saveContactWay(params)
}

const queryContactWayPage = async (params) => {
    return await contactWayDao.queryContactWayPage(params)
}

const updateContactWayByUid = async (params) => {
    return await contactWayDao.updateContactWayByUid(params)
}

const deleteContactWayByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(contactWayDao.deleteContactWayByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountContactWay = async (params) => {
    return await contactWayDao.queryAllCountContactWay(params)
}

const queryContactWayAll = async (params) => {
    return await contactWayDao.queryContactWayAll(params)
}

module.exports = {
    saveContactWay,
    deleteContactWayByUid,
    updateContactWayByUid,
    queryContactWayPage,
    queryContactWayAll,
    queryAllCountContactWay,
    queryContactWayByContactWay,
    queryContactWayByUid,
}
