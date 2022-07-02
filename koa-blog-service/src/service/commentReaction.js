const commentReactionDao = require('../dao/commentReaction')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const queryCommentReactionByCommentId = async (commentId) => {
    return await commentReactionDao.queryCommentReactionByCommentId(commentId)
}

const queryCommentReactionByUid = async (uid) => {
    return await commentReactionDao.queryCommentReactionByUid(uid)
}

const saveCommentReaction = async (params) => {
    return await commentReactionDao.saveCommentReaction(params)
}

const queryCommentReactionPage = async (params) => {
    return await commentReactionDao.queryCommentReactionPage(params)
}

const updateCommentReactionByUid = async (params) => {
    return await commentReactionDao.updateCommentReactionByUid(params)
}

const deleteCommentReactionByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(commentReactionDao.deleteCommentReactionByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountCommentReaction = async (params) => {
    return await commentReactionDao.queryAllCountCommentReaction(params)
}

const queryCommentReactionAll = async () => {
    return await commentReactionDao.queryCommentReactionAll()
}



/*
获取每个评论，每种态度的点赞数量

comment_id                          reaction_content       total
e6821fe0-1a0c-11ec-baf3-f949af174dec	1	                2
e6821fe0-1a0c-11ec-baf3-f949af174dec	2	                2
e6821fe0-1a0c-11ec-baf3-f949af174dec	3	                2
e6821fe0-1a0c-11ec-baf3-f949af174dec	4	                2
e6821fe0-1a0c-11ec-baf3-f949af174dec	5	                2
ee0c18f0-1a0d-11ec-baf3-f949af174dec	1	                2
ee0c18f0-1a0d-11ec-baf3-f949af174dec	2	                2
ee0c18f0-1a0d-11ec-baf3-f949af174dec	3	                2
ee0c18f0-1a0d-11ec-baf3-f949af174dec	4	                2
ee0c18f0-1a0d-11ec-baf3-f949af174dec	5	                2
ee0c18f0-1a0d-11ec-baf3-f949af174dec	6	                1
* */
const queryReactionEveryContentCount = async (params) => {
    return await commentReactionDao.queryReactionEveryContentCount(params)
}

const queryReactionEveryContentPerson = async (params) => {
    return await commentReactionDao.queryReactionEveryContentPerson(params)
}




module.exports = {
    saveCommentReaction,
    deleteCommentReactionByUid,
    updateCommentReactionByUid,
    queryCommentReactionPage,
    queryCommentReactionAll,
    queryAllCountCommentReaction,
    queryCommentReactionByCommentId,
    queryCommentReactionByUid,
    queryReactionEveryContentCount,
    queryReactionEveryContentPerson,
}
