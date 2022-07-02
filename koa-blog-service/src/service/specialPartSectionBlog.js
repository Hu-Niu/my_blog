const specialPartSectionBlogDao = require('../dao/specialPartSectionBlog')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const querySpecialPartSectionBlogByPartSectionId = async (partSectionId,blogId) => {
    return await specialPartSectionBlogDao.querySpecialPartSectionBlogByPartSectionId(partSectionId,blogId)
}

const querySpecialPartSectionBlogByUid = async (uid) => {
    return await specialPartSectionBlogDao.querySpecialPartSectionBlogByUid(uid)
}

const saveSpecialPartSectionBlog = async (params) => {
    return await specialPartSectionBlogDao.saveSpecialPartSectionBlog(params)
}

const querySpecialPartSectionBlogPage = async (params) => {
    return await specialPartSectionBlogDao.querySpecialPartSectionBlogPage(params)
}

const updateSpecialPartSectionBlogByUid = async (params) => {
    return await specialPartSectionBlogDao.updateSpecialPartSectionBlogByUid(params)
}

const deleteSpecialPartSectionBlogByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(specialPartSectionBlogDao.deleteSpecialPartSectionBlogByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountSpecialPartSectionBlog = async (params) => {
    return await specialPartSectionBlogDao.queryAllCountSpecialPartSectionBlog(params)
}

const querySpecialPartSectionBlogAll = async () => {
    return await specialPartSectionBlogDao.querySpecialPartSectionBlogAll()
}

module.exports = {
    saveSpecialPartSectionBlog,
    deleteSpecialPartSectionBlogByUid,
    updateSpecialPartSectionBlogByUid,
    querySpecialPartSectionBlogPage,
    querySpecialPartSectionBlogAll,
    queryAllCountSpecialPartSectionBlog,
    querySpecialPartSectionBlogByPartSectionId,
    querySpecialPartSectionBlogByUid,
}
