const friendLinkDao = require('../dao/friendLink')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const queryFriendLinkByLinkName = async (linkName) => {
    return await friendLinkDao.queryFriendLinkByLinkName(linkName)
}

const queryFriendLinkByUid = async (uid) => {
    return await friendLinkDao.queryFriendLinkByUid(uid)
}

const saveFriendLink = async (params) => {
    return await friendLinkDao.saveFriendLink(params)
}

const queryFriendLinkPage = async (params) => {
    return await friendLinkDao.queryFriendLinkPage(params)
}

const updateFriendLinkByUid = async (params) => {
    return await friendLinkDao.updateFriendLinkByUid(params)
}

const deleteFriendLinkByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(friendLinkDao.deleteFriendLinkByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountFriendLink = async (params) => {
    return await friendLinkDao.queryAllCountFriendLink(params)
}

const queryFriendLinkAll = async (params) => {
    return await friendLinkDao.queryFriendLinkAll(params)
}

module.exports = {
    saveFriendLink,
    deleteFriendLinkByUid,
    updateFriendLinkByUid,
    queryFriendLinkPage,
    queryFriendLinkAll,
    queryAllCountFriendLink,
    queryFriendLinkByLinkName,
    queryFriendLinkByUid,
}
