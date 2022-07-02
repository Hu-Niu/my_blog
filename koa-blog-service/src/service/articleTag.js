const articleTagDao = require('../dao/articleTag')


const saveArticleTag = async (uid, tagName, order) => {
    return await articleTagDao.saveArticleTag(uid, tagName, order)
}

const deleteArticleTagByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(articleTagDao.deleteArticleTagByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const updateArticleTagByUid = async (uid, tagName, order) => {
    await articleTagDao.updateArticleTagByUid(uid, tagName, order)
    return true
}

const queryArticleTagByTagName = async (tagName) => {
    return await articleTagDao.queryArticleTagByTagName(tagName)
}
const queryArticleTagPage = async (currentPage, pageSize, tagName) => {
    return await articleTagDao.queryArticleTagPage(currentPage, pageSize, tagName)
}

const queryHotArticleTagPage = async (params) => {
    return await articleTagDao.queryHotArticleTagPage(params)
}

const queryAllCountArticleTag = async () => {
    return await articleTagDao.queryAllCountArticleTag()
}
const queryArticleTagAll = async () => {
    return await articleTagDao.queryArticleTagAll()
}
const queryArticleTagAll2 = async (isXzzOrCheny) => {
    return await articleTagDao.queryArticleTagAll2(isXzzOrCheny)
}


module.exports = {
    saveArticleTag,
    deleteArticleTagByUid,
    updateArticleTagByUid,
    queryArticleTagPage,
    queryArticleTagByTagName,
    queryAllCountArticleTag,
    queryArticleTagAll,
    queryHotArticleTagPage,
    queryArticleTagAll2,
}
