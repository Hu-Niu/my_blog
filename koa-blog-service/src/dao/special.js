const {
    saveSpecialSql,
    deleteSpecialByUidSql,
    updateSpecialByUidSql,
    querySpecialPageSql,
    queryAllCountSpecialSql,
    querySpecialBySpecialNameSql,
    querySpecialByUidSql,
    querySpecialAllSql,
    querySpecialAllSql2,
} = require('../sql/special')
const query = require('../utils/db')

const saveSpecial = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, specialName, specialSummary, coverUrl,
        specialSortId, clicks, isPrivate, orderNum, createTime,
        updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveSpecialSql,
        [
            uid, specialName, specialSummary, coverUrl,
            specialSortId, clicks, isPrivate, orderNum, createTime,
            updateTime
        ]
    )
    return true
}


const querySpecialPage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        specialName, specialSummary, specialSortId, clicks, isPrivate,
        orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        querySpecialPageSql,
        [
            `%${specialName}%`,
            `%${specialSummary}%`,
            `%${specialSortId}%`,
            `${clicks}`,
            `${isPrivate}`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountSpecial = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        specialName, specialSummary, specialSortId, clicks, isPrivate,
        orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountSpecialSql,
        [
            `%${specialName}%`,
            `%${specialSummary}%`,
            `%${specialSortId}%`,
            `${clicks}`,
            `${isPrivate}`,
            `${orderNum}`
        ])
    return result[0]
}


const updateSpecialByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, specialName, specialSummary, coverUrl,
        specialSortId, clicks, isPrivate, orderNum, createTime,
        updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateSpecialByUidSql,
        [
            specialName, specialSummary, coverUrl, specialSortId,
            clicks, isPrivate, orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteSpecialByUid = async (uid) => {
    return await query(deleteSpecialByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const querySpecialBySpecialName = async (specialName) => {
    const resultArr = await query(querySpecialBySpecialNameSql, [specialName])
    return resultArr[0]
}

const querySpecialByUid = async (uid) => {
    const resultArr = await query(querySpecialByUidSql, [uid])
    return resultArr[0]
}

const querySpecialAll = async (isXzzOrCheny) => {
    // 排除私密专题
    if(isXzzOrCheny){
        return await query(querySpecialAllSql, [])
    } else {
        return await query(querySpecialAllSql2, [])
    }
}

module.exports = {
    saveSpecial,
    deleteSpecialByUid,
    updateSpecialByUid,
    querySpecialPage,
    queryAllCountSpecial,
    querySpecialBySpecialName,
    querySpecialByUid,
    querySpecialAll,
}
