const {
    saveFriendLinkSql,
    deleteFriendLinkByUidSql,
    updateFriendLinkByUidSql,
    queryFriendLinkPageSql,
    queryAllCountFriendLinkSql,
    queryFriendLinkByLinkNameSql,
    queryFriendLinkByUidSql,
    queryFriendLinkAllSql,
} = require('../sql/friendLink')
const query = require('../utils/db')

const saveFriendLink = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, linkName, linkIntro, linkAddress,
        linkEmail, isPublish, orderNum, createTime,
        updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveFriendLinkSql,
        [
            uid, linkName, linkIntro, linkAddress,
            linkEmail, isPublish, orderNum, createTime,
            updateTime
        ]
    )
    return true
}


const queryFriendLinkPage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        linkName, linkIntro, linkAddress, linkEmail,
        isPublish, orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryFriendLinkPageSql,
        [
            `%${linkName}%`,
            `%${linkIntro}%`,
            `%${linkAddress}%`,
            `%${linkEmail}%`,
            `${isPublish}`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountFriendLink = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        linkName, linkIntro, linkAddress, linkEmail,
        isPublish, orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountFriendLinkSql,
        [
            `%${linkName}%`,
            `%${linkIntro}%`,
            `%${linkAddress}%`,
            `%${linkEmail}%`,
            `${isPublish}`,
            `${orderNum}`
        ])
    return result[0]
}


const updateFriendLinkByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, linkName, linkIntro, linkAddress,
        linkEmail, isPublish, orderNum, createTime,
        updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateFriendLinkByUidSql,
        [
            linkName, linkIntro, linkAddress, linkEmail,
            isPublish, orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteFriendLinkByUid = async (uid) => {
    return await query(deleteFriendLinkByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const queryFriendLinkByLinkName = async (linkName) => {
    const resultArr = await query(queryFriendLinkByLinkNameSql, [linkName])
    return resultArr[0]
}

const queryFriendLinkByUid = async (uid) => {
    const resultArr = await query(queryFriendLinkByUidSql, [uid])
    return resultArr[0]
}

const queryFriendLinkAll = async (params) => {
    let {
        linkName, linkIntro, linkAddress, linkEmail,
        isPublish, orderNum
    }  = params

    return await query(queryFriendLinkAllSql, [
        `%${linkName}%`,
        `%${linkIntro}%`,
        `%${linkAddress}%`,
        `%${linkEmail}%`,
        `${isPublish}`,
        `${orderNum}`,
    ])
}

module.exports = {
    saveFriendLink,
    deleteFriendLinkByUid,
    updateFriendLinkByUid,
    queryFriendLinkPage,
    queryAllCountFriendLink,
    queryFriendLinkByLinkName,
    queryFriendLinkByUid,
    queryFriendLinkAll,
}
