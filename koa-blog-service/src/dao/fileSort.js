const {
    saveFileSortSql,
    deleteFileSortByUidSql,
    updateFileSortByUidSql,
    queryFileSortPageSql,
    queryFileSortBySortNameSql,
    queryAllCountFileSortSql,
    queryFileSortBySortIdSql,
} = require('../sql/fileSort')
const query = require('../utils/db')
const dayjs = require('dayjs')

const saveFileSort = async (uid, coverImg, sortName, order) => {
    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    await query(saveFileSortSql, [uid, coverImg, sortName, order, createTime, updateTime])
    return true
}

const queryFileSortPage = async (currentPage, pageSize, sortName) => {
    let _currentPage = (currentPage - 1) * pageSize
    return await query(queryFileSortPageSql, [`%${sortName}%`, _currentPage, pageSize])
}

const queryAllCountFileSort = async () => {
    let result = await query(queryAllCountFileSortSql, [])
    return result[0]
}


const updateFileSortByUid = async (uid, coverImg, sortName, order) => {
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    await query(updateFileSortByUidSql, [coverImg, sortName, order, updateTime, uid])
}

const deleteFileSortByUid = async (uid) => {
    await query(deleteFileSortByUidSql, [uid])
}

const queryFileSortBySortName = async (sortName) => {
    let resultArr = await query(queryFileSortBySortNameSql, [sortName])
    return resultArr[0]
}

const queryFileSortBySortId = async (sortId) => {
    let resultArr = await query(queryFileSortBySortIdSql, [sortId])
    return resultArr[0]
}

module.exports = {
    saveFileSort,
    deleteFileSortByUid,
    updateFileSortByUid,
    queryFileSortPage,
    queryFileSortBySortName,
    queryAllCountFileSort,
    queryFileSortBySortId,
}
