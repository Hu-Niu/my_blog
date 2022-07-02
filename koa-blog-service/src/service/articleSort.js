const articleSortDao = require('../dao/articleSort')

const queryArticleSortBySortName = async (sortName) => {
    return await articleSortDao.queryArticleSortBySortName(sortName)
}
const saveArticleSort = async (uid, sortName, intro, order) => {
    return await articleSortDao.saveArticleSort(uid, sortName, intro, order)
}

const queryArticleSortPage = async (currentPage, pageSize, sortName) => {
    return await articleSortDao.queryArticleSortPage(currentPage, pageSize, sortName)
}

const updateArticleSortByUid = async (uid, sortName, intro, order) => {
    await articleSortDao.updateArticleSortByUid(uid, sortName, intro, order)
    return true
}

const deleteArticleSortByUid = async uids => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(articleSortDao.deleteArticleSortByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountArticleSort = async () => {
    return await articleSortDao.queryAllCountArticleSort()
}

const queryArticleSortAll = async () => {
    return await articleSortDao.queryArticleSortAll()
}
const queryArticleSortAll2 = async (isXzzOrCheny) => {
    return await articleSortDao.queryArticleSortAll2(isXzzOrCheny)
}


module.exports = {
    queryArticleSortBySortName,
    saveArticleSort,
    deleteArticleSortByUid,
    updateArticleSortByUid,
    queryArticleSortPage,
    queryAllCountArticleSort,
    queryArticleSortAll,
    queryArticleSortAll2,
}
