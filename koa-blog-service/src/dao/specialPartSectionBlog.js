const {
    saveSpecialPartSectionBlogSql,
    deleteSpecialPartSectionBlogByUidSql,
    updateSpecialPartSectionBlogByUidSql,
    querySpecialPartSectionBlogPageSql,
    queryAllCountSpecialPartSectionBlogSql,
    querySpecialPartSectionBlogByPartSectionIdSql,
    querySpecialPartSectionBlogByUidSql,
    querySpecialPartSectionBlogAllSql,
    querySpecialPartSectionBlogAllSql2,
} = require('../sql/specialPartSectionBlog')
const query = require('../utils/db')

const saveSpecialPartSectionBlog = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, partSectionId, blogId, orderNum,
        createTime, updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveSpecialPartSectionBlogSql,
        [
            uid, partSectionId, blogId, orderNum,
            createTime, updateTime
        ]
    )
    return true
}


const querySpecialPartSectionBlogPage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        partSectionId, blogId, orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        querySpecialPartSectionBlogPageSql,
        [
            `%${partSectionId}%`,
            `%${blogId}%`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountSpecialPartSectionBlog = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        partSectionId, blogId, orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountSpecialPartSectionBlogSql,
        [
            `%${partSectionId}%`,
            `%${blogId}%`,
            `${orderNum}`
        ])
    return result[0]
}


const updateSpecialPartSectionBlogByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, partSectionId, blogId, orderNum,
        createTime, updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateSpecialPartSectionBlogByUidSql,
        [
            partSectionId, blogId, orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteSpecialPartSectionBlogByUid = async (uid) => {
    return await query(deleteSpecialPartSectionBlogByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const querySpecialPartSectionBlogByPartSectionId = async (partSectionId,blogId) => {
    const resultArr = await query(querySpecialPartSectionBlogByPartSectionIdSql, [partSectionId,blogId])
    return resultArr[0]
}

const querySpecialPartSectionBlogByUid = async (uid) => {
    const resultArr = await query(querySpecialPartSectionBlogByUidSql, [uid])
    return resultArr[0]
}

const querySpecialPartSectionBlogAll = async (isXzzOrCheny) => {
    // 排除私密文章
    if(isXzzOrCheny){
        return await query(querySpecialPartSectionBlogAllSql, [])
    }else {
        return await query(querySpecialPartSectionBlogAllSql2, [])
    }
}

module.exports = {
    saveSpecialPartSectionBlog,
    deleteSpecialPartSectionBlogByUid,
    updateSpecialPartSectionBlogByUid,
    querySpecialPartSectionBlogPage,
    queryAllCountSpecialPartSectionBlog,
    querySpecialPartSectionBlogByPartSectionId,
    querySpecialPartSectionBlogByUid,
    querySpecialPartSectionBlogAll,
}
