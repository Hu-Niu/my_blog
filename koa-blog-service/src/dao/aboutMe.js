const {
    saveAboutMeSql,
    deleteAboutMeByUidSql,
    updateAboutMeByUidSql,
    queryAboutMePageSql,
    queryAllCountAboutMeSql,
    queryAboutMeByAdminUserIdSql,
    queryAboutMeByUidSql,
    queryAboutMeAllSql,
} = require('../sql/aboutMe')
const query = require('../utils/db')

const saveAboutMe = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, adminUserId, introDetail, orderNum,
        createTime, updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveAboutMeSql,
        [
            uid, adminUserId, introDetail, orderNum,
            createTime, updateTime
        ]
    )
    return true
}


const queryAboutMePage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        adminUserId, orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryAboutMePageSql,
        [
            `%${adminUserId}%`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountAboutMe = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        adminUserId, orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountAboutMeSql,
        [
            `%${adminUserId}%`,
            `${orderNum}`
        ])
    return result[0]
}


const updateAboutMeByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, adminUserId, introDetail, orderNum,
        createTime, updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateAboutMeByUidSql,
        [
            adminUserId, introDetail, orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteAboutMeByUid = async (uid) => {
    return await query(deleteAboutMeByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const queryAboutMeByAdminUserId = async (adminUserId) => {
    const resultArr = await query(queryAboutMeByAdminUserIdSql, [adminUserId])
    return resultArr[0]
}

const queryAboutMeByUid = async (uid) => {
    const resultArr = await query(queryAboutMeByUidSql, [uid])
    return resultArr[0]
}

const queryAboutMeAll = async () => {
    return await query(queryAboutMeAllSql, [])
}

module.exports = {
    saveAboutMe,
    deleteAboutMeByUid,
    updateAboutMeByUid,
    queryAboutMePage,
    queryAllCountAboutMe,
    queryAboutMeByAdminUserId,
    queryAboutMeByUid,
    queryAboutMeAll,
}
