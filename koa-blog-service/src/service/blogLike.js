const blogLikeDao = require('../dao/blogLike')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const queryBlogLikeByBlogId = async (blogId) => {
    return await blogLikeDao.queryBlogLikeByBlogId(blogId)
}

const queryBlogLikeByUid = async (uid) => {
    return await blogLikeDao.queryBlogLikeByUid(uid)
}

const saveBlogLike = async (params) => {
    return await blogLikeDao.saveBlogLike(params)
}

const queryBlogLikePage = async (params) => {
    return await blogLikeDao.queryBlogLikePage(params)
}
const queryBlogLikeAll2 = async (params) => {
    return await blogLikeDao.queryBlogLikeAll2(params)
}


const updateBlogLikeByUid = async (params) => {
    return await blogLikeDao.updateBlogLikeByUid(params)
}

const deleteBlogLikeByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(blogLikeDao.deleteBlogLikeByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountBlogLike = async (params) => {
    return await blogLikeDao.queryAllCountBlogLike(params)
}

const queryBlogLikeAll = async () => {
    return await blogLikeDao.queryBlogLikeAll()
}

module.exports = {
    saveBlogLike,
    deleteBlogLikeByUid,
    updateBlogLikeByUid,
    queryBlogLikePage,
    queryBlogLikeAll,
    queryAllCountBlogLike,
    queryBlogLikeByBlogId,
    queryBlogLikeByUid,
    queryBlogLikeAll2,
}
