const {
    saveCommentReactionSql,
    deleteCommentReactionByUidSql,
    updateCommentReactionByUidSql,
    queryCommentReactionPageSql,
    queryAllCountCommentReactionSql,
    queryCommentReactionByCommentIdSql,
    queryCommentReactionByUidSql,
    queryCommentReactionAllSql,
    queryReactionEveryContentCountSql,
    queryReactionEveryContentPersonSql,
} = require('../sql/commentReaction')
const query = require('../utils/db')

const saveCommentReaction = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, commentId, reactionPersonId, reactionContent,commentSource, sourceId,
        orderNum, createTime, updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveCommentReactionSql,
        [
            uid, commentId, reactionPersonId, reactionContent,commentSource, sourceId,
            orderNum, createTime, updateTime
        ]
    )
    return true
}


const queryCommentReactionPage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        commentId, reactionPersonId, reactionContent, commentSource, sourceId,orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryCommentReactionPageSql,
        [
            `%${commentId}%`,
            `%${reactionPersonId}%`,
            `%${reactionContent}%`,
            `${commentSource}`,
            `%${sourceId}%`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountCommentReaction = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        commentId, reactionPersonId, reactionContent,commentSource, sourceId, orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountCommentReactionSql,
        [
            `%${commentId}%`,
            `%${reactionPersonId}%`,
            `%${reactionContent}%`,
            `${commentSource}`,
            `%${sourceId}%`,
            `${orderNum}`
        ])
    return result[0]
}


const updateCommentReactionByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, commentId, reactionPersonId, reactionContent,commentSource, sourceId,
        orderNum, createTime, updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateCommentReactionByUidSql,
        [
            commentId, reactionPersonId, reactionContent, commentSource, sourceId,orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteCommentReactionByUid = async (uid) => {
    return await query(deleteCommentReactionByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const queryCommentReactionByCommentId = async (commentId) => {
    const resultArr = await query(queryCommentReactionByCommentIdSql, [commentId])
    return resultArr[0]
}

const queryCommentReactionByUid = async (uid) => {
    const resultArr = await query(queryCommentReactionByUidSql, [uid])
    return resultArr[0]
}

const queryCommentReactionAll = async () => {
    return await query(queryCommentReactionAllSql, [])
}

const queryReactionEveryContentCount = async (params) => {
    let {
        commentSource, sourceId
    }  = params

    return await query(queryReactionEveryContentCountSql, [
        `${commentSource}`,
        `%${sourceId}%`,
    ])
}

const queryReactionEveryContentPerson = async (params) => {
    let {
        commentSource, sourceId
    }  = params

    return await query(queryReactionEveryContentPersonSql, [
        `${commentSource}`,
        `%${sourceId}%`,
    ])
}



module.exports = {
    saveCommentReaction,
    deleteCommentReactionByUid,
    updateCommentReactionByUid,
    queryCommentReactionPage,
    queryAllCountCommentReaction,
    queryCommentReactionByCommentId,
    queryCommentReactionByUid,
    queryCommentReactionAll,
    queryReactionEveryContentCount,
    queryReactionEveryContentPerson,
}
