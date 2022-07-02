const {
    saveFileSql,
    queryAllFileSortSql,
    queryAllFilePageSql,
    queryAllFileCountSql,
    deleteFileByUidSql,
    updateFileSortByUidSql,
    queryAllFileSql,
} = require('../sql/file')
const query = require('../utils/db')

const dayjs = require('dayjs')


const saveFile = async (uid, file_original_name, file_current_name, file_suffix, fileSortUid, fileSortName) => {
    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    await query(saveFileSql, [uid, file_original_name, file_current_name, file_suffix, fileSortUid, fileSortName, createTime, updateTime])
    return true
}

const queryAllFileSort = async () => {
    return await query(queryAllFileSortSql, [])
}

const queryAllFilePage = async (currentPage, pageSize, fileSortId, createTime) => {
    let _currentPage = (currentPage - 1) * pageSize
    return await query(queryAllFilePageSql, [fileSortId, `%${createTime}%`, _currentPage, pageSize])
}

const queryAllFile = async (fileSortId, createTime) => {
    return await query(queryAllFileSql, [
        `%${fileSortId}%`,
        `%${createTime}%`
    ])
}


const queryAllFileCount = async (fileSortId, createTime) => {
    let result = await query(queryAllFileCountSql, [fileSortId, `%${createTime}%`])
    return result[0]
}

const deleteFileByUid = async (uid) => {
    await query(deleteFileByUidSql, [uid])
}

const updateFileSortByUid = async (fileId, sortId, sort_name) => {
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    await query(updateFileSortByUidSql, [sortId, sort_name, updateTime, fileId])
}


module.exports = {
    saveFile,
    queryAllFileSort,
    queryAllFilePage,
    queryAllFileCount,
    deleteFileByUid,
    updateFileSortByUid,
    queryAllFile,
}
