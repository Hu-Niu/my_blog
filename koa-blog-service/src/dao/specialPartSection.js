const {
    saveSpecialPartSectionSql,
    deleteSpecialPartSectionByUidSql,
    updateSpecialPartSectionByUidSql,
    querySpecialPartSectionPageSql,
    queryAllCountSpecialPartSectionSql,
    querySpecialPartSectionBySectionTitleSql,
    querySpecialPartSectionByUidSql,
    querySpecialPartSectionAllSql,
} = require('../sql/specialPartSection')
const query = require('../utils/db')

const saveSpecialPartSection = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, sectionTitle, specialPartId, orderNum,
        createTime, updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveSpecialPartSectionSql,
        [
            uid, sectionTitle, specialPartId, orderNum,
            createTime, updateTime
        ]
    )
    return true
}


const querySpecialPartSectionPage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        sectionTitle, specialPartId, orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        querySpecialPartSectionPageSql,
        [
            `%${sectionTitle}%`,
            `%${specialPartId}%`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountSpecialPartSection = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        sectionTitle, specialPartId, orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountSpecialPartSectionSql,
        [
            `%${sectionTitle}%`,
            `%${specialPartId}%`,
            `${orderNum}`
        ])
    return result[0]
}


const updateSpecialPartSectionByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, sectionTitle, specialPartId, orderNum,
        createTime, updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateSpecialPartSectionByUidSql,
        [
            sectionTitle, specialPartId, orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteSpecialPartSectionByUid = async (uid) => {
    return await query(deleteSpecialPartSectionByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const querySpecialPartSectionBySectionTitle = async (sectionTitle,specialPartId) => {
    const resultArr = await query(querySpecialPartSectionBySectionTitleSql, [sectionTitle,specialPartId])
    return resultArr[0]
}

const querySpecialPartSectionByUid = async (uid) => {
    const resultArr = await query(querySpecialPartSectionByUidSql, [uid])
    return resultArr[0]
}

const querySpecialPartSectionAll = async () => {
    return await query(querySpecialPartSectionAllSql, [])
}

module.exports = {
    saveSpecialPartSection,
    deleteSpecialPartSectionByUid,
    updateSpecialPartSectionByUid,
    querySpecialPartSectionPage,
    queryAllCountSpecialPartSection,
    querySpecialPartSectionBySectionTitle,
    querySpecialPartSectionByUid,
    querySpecialPartSectionAll,
}
