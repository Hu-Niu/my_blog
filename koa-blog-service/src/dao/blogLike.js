const {
    saveBlogLikeSql,
    deleteBlogLikeByUidSql,
    updateBlogLikeByUidSql,
    queryBlogLikePageSql,
    queryAllCountBlogLikeSql,
    queryBlogLikeByBlogIdSql,
    queryBlogLikeByUidSql,
    queryBlogLikeAllSql,
    queryBlogLikeAll2Sql,
} = require('../sql/blogLike')
const query = require('../utils/db')

const saveBlogLike = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, blogId, likePersonId, orderNum,
        createTime, updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveBlogLikeSql,
        [
            uid, blogId, likePersonId, orderNum,
            createTime, updateTime
        ]
    )
    return true
}


const queryBlogLikePage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        blogId, likePersonId, orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryBlogLikePageSql,
        [
            `%${blogId}%`,
            `%${likePersonId}%`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}

const queryBlogLikeAll2 = async (params) => {

    let {
        blogId, likePersonId, orderNum
    }  = params

    return await query(
        queryBlogLikeAll2Sql,
        [
            `%${blogId}%`,
            `%${likePersonId}%`,
            `${orderNum}`,
        ])
}


const queryAllCountBlogLike = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        blogId, likePersonId, orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountBlogLikeSql,
        [
            `%${blogId}%`,
            `%${likePersonId}%`,
            `${orderNum}`
        ])
    return result[0]
}


const updateBlogLikeByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, blogId, likePersonId, orderNum,
        createTime, updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateBlogLikeByUidSql,
        [
            blogId, likePersonId, orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteBlogLikeByUid = async (uid) => {
    return await query(deleteBlogLikeByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const queryBlogLikeByBlogId = async (blogId) => {
    const resultArr = await query(queryBlogLikeByBlogIdSql, [blogId])
    return resultArr[0]
}

const queryBlogLikeByUid = async (uid) => {
    const resultArr = await query(queryBlogLikeByUidSql, [uid])
    return resultArr[0]
}

const queryBlogLikeAll = async () => {
    return await query(queryBlogLikeAllSql, [])
}

module.exports = {
    saveBlogLike,
    deleteBlogLikeByUid,
    updateBlogLikeByUid,
    queryBlogLikePage,
    queryAllCountBlogLike,
    queryBlogLikeByBlogId,
    queryBlogLikeByUid,
    queryBlogLikeAll,
    queryBlogLikeAll2,
}
