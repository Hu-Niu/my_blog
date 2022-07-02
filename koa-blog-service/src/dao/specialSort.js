const {
    saveSpecialSortSql,
    deleteSpecialSortByUidSql,
    updateSpecialSortByUidSql,
    querySpecialSortPageSql,
    queryAllCountSpecialSortSql,
    querySpecialSortBySpecialSortNameSql,
    querySpecialSortByUidSql,
    querySpecialSortAllSql,
} = require('../sql/specialSort')
const query = require('../utils/db')

const saveSpecialSort = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, specialSortName, orderNum, createTime,
        updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveSpecialSortSql,
        [
            uid, specialSortName, orderNum, createTime,
            updateTime
        ]
    )
    return true
}


const querySpecialSortPage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        specialSortName, orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        querySpecialSortPageSql,
        [
            `%${specialSortName}%`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountSpecialSort = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        specialSortName, orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountSpecialSortSql,
        [
            `%${specialSortName}%`,
            `${orderNum}`
        ])
    return result[0]
}


const updateSpecialSortByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, specialSortName, orderNum, createTime,
        updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateSpecialSortByUidSql,
        [
            specialSortName, orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteSpecialSortByUid = async (uid) => {
    return await query(deleteSpecialSortByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const querySpecialSortBySpecialSortName = async (specialSortName) => {
    const resultArr = await query(querySpecialSortBySpecialSortNameSql, [specialSortName])
    return resultArr[0]
}

const querySpecialSortByUid = async (uid) => {
    const resultArr = await query(querySpecialSortByUidSql, [uid])
    return resultArr[0]
}

const querySpecialSortAll = async () => {
    return await query(querySpecialSortAllSql, [])
}

module.exports = {
    saveSpecialSort,
    deleteSpecialSortByUid,
    updateSpecialSortByUid,
    querySpecialSortPage,
    queryAllCountSpecialSort,
    querySpecialSortBySpecialSortName,
    querySpecialSortByUid,
    querySpecialSortAll,
}
