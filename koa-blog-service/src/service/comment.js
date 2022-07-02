const commentDao = require('../dao/comment')
const commentReactionService = require('../service/commentReaction')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const queryCommentByCommentContent = async (commentContent) => {
    return await commentDao.queryCommentByCommentContent(commentContent)
}

const queryCommentByUid = async (uid) => {
    return await commentDao.queryCommentByUid(uid)
}

const saveComment = async (params) => {
    return await commentDao.saveComment(params)
}

const queryCommentPage = async (params) => {
    return await commentDao.queryCommentPage(params)
}
const queryComment = async (params) => {
    // 1、获取查到的所有评论
    let queryComments = await commentDao.queryComment(params)
    // 2、获取所有评论的点赞数
    let commentsReactionCount = await commentReactionService.queryReactionEveryContentCount(params)
    // 3、获取点赞人
    let commentsReactionPerson = await commentReactionService.queryReactionEveryContentPerson(params)
    // 4、将点赞数转换为map
    let reactionCountMap = convertReactionToMap(commentsReactionCount)
    // 5、将点赞数拼接到评论中
    let commentsWithReactionCount = handleCommentsAddReaction(queryComments,reactionCountMap,'count')
    // 6、将点赞人转换为map
    let reactionPersonMap = convertReactionToMap(commentsReactionPerson)
    // 7、将点赞人拼接到评论中
    let commentsWithReactionCountAndPerson = handleCommentsAddReaction(commentsWithReactionCount,reactionPersonMap,'person')

    return commentsWithReactionCountAndPerson

}

/**
 * @description 将查询出来的评论，与查询出来的点赞数，按照评论的id，拼接到一起，返回给前台
 * @param {Array} comments
 * @param {Map} reactionMap
 * @param {String} flag count|person 标识符，返回不一样的字段
 * @return {*[]}
 */
function handleCommentsAddReaction(comments, reactionMap,flag) {
    if(flag === 'count'){
        return comments.map(item => {
            item.reactions_count = reactionMap.get(item.uid) ? reactionMap.get(item.uid) : []
            return item
        })
    }

    return comments.map(item => {
        item.reactions_person = reactionMap.get(item.uid) ? reactionMap.get(item.uid) : []
        return item
    })

}


/**
 * @description 将查询过来的点赞数量，按照评论的uid转换为map结构，方便拼接到评论的数据集中
 * @param {Array} reactions 等待处理的从数据库直接查过来的点赞情况
 * @return {Map<any,any>} tempMap 处理后的map
 */
function convertReactionToMap(reactions) {
    const tempMap = new Map()

    reactions.map(item => {
        // 1、遇见第一个评论id时，将map的value设置为一个数组，将数据push到数组里
        //  再遇到相同的评论id时，直接取原先的值，继续往里push
        if (!tempMap.has(item.comment_id)) {
            tempMap.set(item.comment_id, [{...item}])
        } else {
            tempMap.get(item.comment_id).push({...item})
        }
    })

    return tempMap
}


const updateCommentByUid = async (params) => {
    return await commentDao.updateCommentByUid(params)
}

const deleteCommentByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(commentDao.deleteCommentByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const passOrRejectCommentByUid = async (uids,commentStatus) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(commentDao.passOrRejectCommentByUid(uid,commentStatus))
    }
    return await Promise.all(promiseArr)
}


const queryAllCountComment = async (params) => {
    return await commentDao.queryAllCountComment(params)
}


const queryCommentAll = async () => {
    return await commentDao.queryCommentAll()
}

/**
 * @description 处理违规评论
 * @param {Array} comments
 * @return {Array} 处理后的评论列表
 */
const convertIllegalComment =  (comments) => {
    return comments.map(item=>{
        if(+(item.comment_status) === 3){
            item.comment_content = '违规消息，已被系统自动屏蔽'
        }
        return item
    })
}

/**
 * @description 游客可以看到的评论列表
 * @param {Array} comments
 * @return {Array} 处理后的评论列表
 *
 * 只可以看到，审核通过的、和 处理后的违规评论
 */
const commentAboutVisitorsCanSee =  (comments) => {
    return comments.filter(item=>{
        let commentStatus = +(item.comment_status)

        if(commentStatus === 2 || commentStatus === 3){
            return item
        }
    })
}
/**
 * @description 登录用户可以看到的评论列表
 * @param {Array} comments
 * @param {String} userId 登录人的uid
 * @return {Array} 处理后的评论列表
 *
 * 只可以看到，审核通过的、处理后的违规评论 和 自己待审核的
 */
const commentAboutUserCanSee =  (comments,userId) => {
    return comments.filter(item=>{
        let commentStatus = +(item.comment_status)

        if(commentStatus === 2 || commentStatus === 3 || (commentStatus === 1 && item.comment_person_id === userId)){
            return item
        }
    })
}



module.exports = {
    saveComment,
    deleteCommentByUid,
    updateCommentByUid,
    queryCommentPage,
    queryComment,
    queryCommentAll,
    queryAllCountComment,
    queryCommentByCommentContent,
    queryCommentByUid,
    convertIllegalComment,
    commentAboutVisitorsCanSee,
    commentAboutUserCanSee,
    passOrRejectCommentByUid,
}
