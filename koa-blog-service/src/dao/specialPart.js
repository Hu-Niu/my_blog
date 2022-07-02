const {
    saveSpecialPartSql,
    deleteSpecialPartByUidSql,
    updateSpecialPartByUidSql,
    querySpecialPartPageSql,
    queryAllCountSpecialPartSql,
    querySpecialPartByPartNameSql,
    querySpecialPartByUidSql,
    querySpecialPartAllSql,
} = require('../sql/specialPart')
const query = require('../utils/db')

const saveSpecialPart = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, partName, partTitle, partSummary,
        specialId, orderNum, createTime, updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveSpecialPartSql,
        [
            uid, partName, partTitle, partSummary,
            specialId, orderNum, createTime, updateTime
        ]
    )
    return true
}


const querySpecialPartPage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        partName, partTitle, partSummary, specialId,
        orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        querySpecialPartPageSql,
        [
            `%${partName}%`,
            `%${partTitle}%`,
            `%${partSummary}%`,
            `%${specialId}%`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountSpecialPart = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        partName, partTitle, partSummary, specialId,
        orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountSpecialPartSql,
        [
            `%${partName}%`,
            `%${partTitle}%`,
            `%${partSummary}%`,
            `%${specialId}%`,
            `${orderNum}`
        ])
    return result[0]
}


const updateSpecialPartByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, partName, partTitle, partSummary,
        specialId, orderNum, createTime, updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateSpecialPartByUidSql,
        [
            partName, partTitle, partSummary, specialId,
            orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteSpecialPartByUid = async (uid) => {
    return await query(deleteSpecialPartByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const querySpecialPartByPartName = async (partName,specialId) => {
    const resultArr = await query(querySpecialPartByPartNameSql, [partName,specialId])
    return resultArr[0]
}

const querySpecialPartByUid = async (uid) => {
    const resultArr = await query(querySpecialPartByUidSql, [uid])
    return resultArr[0]
}

const querySpecialPartAll = async () => {
    return await query(querySpecialPartAllSql, [])
}

module.exports = {
    saveSpecialPart,
    deleteSpecialPartByUid,
    updateSpecialPartByUid,
    querySpecialPartPage,
    queryAllCountSpecialPart,
    querySpecialPartByPartName,
    querySpecialPartByUid,
    querySpecialPartAll,
}
