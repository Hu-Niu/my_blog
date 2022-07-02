const fileSortDao = require('../dao/fileSort')

const queryFileSortBySortName = async (sortName) => {
    return await fileSortDao.queryFileSortBySortName(sortName)
}

const saveFileSort = async (uid, coverImg, sortName, order) => {
    return await fileSortDao.saveFileSort(uid, coverImg, sortName, order)
}

const queryFileSortPage = async (currentPage, pageSize, sortName) => {
    return await fileSortDao.queryFileSortPage(currentPage, pageSize, sortName)
}

const updateFileSortByUid = async (uid, coverImg, sortName, order) => {
    await fileSortDao.updateFileSortByUid(uid, coverImg, sortName, order)
    return true
}

const deleteFileSortByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(fileSortDao.deleteFileSortByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountFileSort = async () => {
    return await fileSortDao.queryAllCountFileSort()
}

module.exports = {
    saveFileSort,
    deleteFileSortByUid,
    updateFileSortByUid,
    queryFileSortPage,
    queryFileSortBySortName,
    queryAllCountFileSort,
}
