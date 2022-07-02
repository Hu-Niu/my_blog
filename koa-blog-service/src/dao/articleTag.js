const {
    saveArticleTagSql,
    deleteArticleTagByUidSql,
    updateArticleTagByUidSql,
    queryArticleTagPageSql,
    queryArticleTagByTagNameSql,
    queryAllCountArticleTagSql,
    queryArticleTagAllSql,
    queryHotArticleTagPageSql,
    queryArticleTagAllSql2,
    queryArticleTagAllSql3,
} = require('../sql/articleTag')
const query = require('../utils/db')
const dayjs = require('dayjs')

const saveArticleTag = async (uid, tagName, order) => {
    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    await query(saveArticleTagSql, [uid, tagName, order, createTime, updateTime])
    return true
}

const deleteArticleTagByUid = async (uid) => {
    await query(deleteArticleTagByUidSql, [uid])
}

const updateArticleTagByUid = async (uid,tagName, order) => {
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    await query(updateArticleTagByUidSql, [tagName, order, updateTime, uid])
}

const queryArticleTagPage = async (currentPage, pageSize, tagName) => {
    let _currentPage = (currentPage - 1) * pageSize
    return await query(queryArticleTagPageSql, [`%${tagName}%`, _currentPage, pageSize])
}

const queryHotArticleTagPage = async (params) => {
    let {
        currentPage, pageSize,
        tagName,clicks,orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    return await query(queryHotArticleTagPageSql, [
        `%${tagName}%`,
        `${clicks}`,
        `${orderNum}`,
        _currentPage,
        pageSize
    ])
}


const queryAllCountArticleTag = async () => {
    let result = await query(queryAllCountArticleTagSql, [])
    return result[0]
}

const queryArticleTagByTagName = async (tagName) => {
    let resultArr = await query(queryArticleTagByTagNameSql, [tagName])
    return resultArr[0]
}
const queryArticleTagAll = async () => {
    return await query(queryArticleTagAllSql, [])
}
const queryArticleTagAll2 = async (isXzzOrCheny) => {
    // 排除私密文章
    console.log(isXzzOrCheny, 'isXzzOrCheny')
    if(isXzzOrCheny){
        return await query(queryArticleTagAllSql2, [])
    } else {
        return await query(queryArticleTagAllSql3, [])
    }
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
