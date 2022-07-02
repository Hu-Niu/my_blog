const {
    saveCommentSql,
    deleteCommentByUidSql,
    updateCommentByUidSql,
    queryCommentPageSql,
    queryCommentSql,
    queryAllCountCommentSql,
    queryCommentByCommentContentSql,
    queryCommentByUidSql,
    queryCommentAllSql,
    passOrRejectCommentByUidSql,
} = require('../sql/comment')
const query = require('../utils/db')

const saveComment = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, commentContent, commentSource, sourceId,
        commentStatus, commentPersonId, commentedPersonId, toCommentId,
        rootCommentId, commentLayer,orderNum, createTime, updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveCommentSql,
        [
            uid, commentContent, commentSource, sourceId,
            commentStatus, commentPersonId, commentedPersonId, toCommentId,
            rootCommentId, commentLayer,orderNum, createTime, updateTime
        ]
    )
    return true
}


const queryCommentPage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        commentContent, commentSource, sourceId, commentStatus,
        commentPersonId, commentedPersonId, toCommentId, rootCommentId,commentLayer,
        orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryCommentPageSql,
        [
            `%${commentContent}%`,
            `${commentSource}`,
            `%${sourceId}%`,
            `${commentStatus}`,
            `%${commentPersonId}%`,
            `%${commentedPersonId}%`,
            `%${toCommentId}%`,
            `%${rootCommentId}%`,
            `${commentLayer}`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountComment = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        commentContent, commentSource, sourceId, commentStatus,
        commentPersonId, commentedPersonId, toCommentId, rootCommentId,commentLayer,
        orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountCommentSql,
        [
            `%${commentContent}%`,
            `${commentSource}`,
            `%${sourceId}%`,
            `${commentStatus}`,
            `%${commentPersonId}%`,
            `%${commentedPersonId}%`,
            `%${toCommentId}%`,
            `%${rootCommentId}%`,
            `${commentLayer}`,
            `${orderNum}`
        ])
    return result[0]
}

const queryComment = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        commentContent, commentSource, sourceId, commentStatus,
        commentPersonId, commentedPersonId, toCommentId, rootCommentId,commentLayer,
        orderNum
    }  = params

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryCommentSql,
        [
            `%${commentContent}%`,
            `${commentSource}`,
            `%${sourceId}%`,
            `${commentStatus}`,
            `%${commentPersonId}%`,
            `%${commentedPersonId}%`,
            `%${toCommentId}%`,
            `%${rootCommentId}%`,
            `${commentLayer}`,
            `${orderNum}`,
        ])
}

const updateCommentByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, commentContent, commentSource, sourceId,
        commentStatus, commentPersonId, commentedPersonId, toCommentId,
        rootCommentId, commentLayer,orderNum, createTime, updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateCommentByUidSql,
        [
            commentContent, commentSource, sourceId, commentStatus,
            commentPersonId, commentedPersonId, toCommentId, rootCommentId,commentLayer,
            orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteCommentByUid = async (uid) => {
    return await query(deleteCommentByUidSql, [uid])
}

const passOrRejectCommentByUid = async (uid,commentStatus) => {
    return await query(passOrRejectCommentByUidSql, [commentStatus,uid])
}


/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const queryCommentByCommentContent = async (commentContent) => {
    const resultArr = await query(queryCommentByCommentContentSql, [commentContent])
    return resultArr[0]
}

const queryCommentByUid = async (uid) => {
    const resultArr = await query(queryCommentByUidSql, [uid])
    return resultArr[0]
}

const queryCommentAll = async () => {
    return await query(queryCommentAllSql, [])
}

module.exports = {
    saveComment,
    deleteCommentByUid,
    updateCommentByUid,
    queryCommentPage,
    queryComment,
    queryAllCountComment,
    queryCommentByCommentContent,
    queryCommentByUid,
    queryCommentAll,
    passOrRejectCommentByUid,
}
