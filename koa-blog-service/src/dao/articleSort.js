const {
    queryArticleSortBySortNameSql,
    saveArticleSortSql,
    deleteArticleSortByUidSql,
    updateArticleSortByUidSql,
    queryArticleSortPageSql,
    queryArticleSortAllSql,
    queryAllCountArticleSortSql,
    queryArticleSortAllSql2,
    queryArticleSortAllSql3,

} = require('../sql/articleSort')
const query = require('../utils/db')
const dayjs = require('dayjs')




const saveArticleSort = async (uid, sortName, intro, order) => {
    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    await query(saveArticleSortSql, [uid, sortName, intro, order, createTime, updateTime])
    return true
}

const deleteArticleSortByUid = async (uid) => {
    await query(deleteArticleSortByUidSql, [uid])
}

const updateArticleSortByUid = async (uid, sortName, intro, order) => {
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    await query(updateArticleSortByUidSql, [sortName, intro, order, updateTime, uid])
}

const queryArticleSortPage = async (currentPage, pageSize, sortName) => {
    let _currentPage = (currentPage - 1) * pageSize
    return await query(queryArticleSortPageSql, [`%${sortName}%`, _currentPage, pageSize])
}

const queryAllCountArticleSort = async () => {
    let result = await query(queryAllCountArticleSortSql, [])
    return result[0]
}
const queryArticleSortAll = async () => {
    return await query(queryArticleSortAllSql, [])
}
const queryArticleSortAll2 = async (isXzzOrCheny) => {
    // 排除私密文章
    if(isXzzOrCheny){
        return await query(queryArticleSortAllSql2, [])
    } else {
        return await query(queryArticleSortAllSql3, [])
    }
}


const queryArticleSortBySortName = async (sortName) => {
    let resultArr = await query(queryArticleSortBySortNameSql, [sortName])
    return resultArr[0]
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
