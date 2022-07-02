const fileSortService = require('../service/fileSort')
const {
    saveFileSortValidator,
    deleteFileSortByUidValidator,
} = require('../validation/fileSort')
const generateUuid = require('../utils/generateUuid')
const resCode = require('../constant/resCode')
const {FILE, APP} = require('../constant/resCodeVariable')

const saveFileSort = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let {coverImg, sortName, order} = ctx.request.body
    if (!order) {
        order = 0
    }
    console.log(ctx.request.body, 'ctx.request.body')
    // 参数校验
    const {errorMsg, isValid} = saveFileSortValidator(sortName)

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let uid = generateUuid()
        let result = await fileSortService.queryFileSortBySortName(sortName)
        if (result) { // 文件分类已存在，不保存
            ctx.fail(resCode.get(FILE.FILE_SORT_ALREADY_EXISTS))
        } else {
            let flag = await fileSortService.saveFileSort(uid, coverImg, sortName, order)
            if (flag) {
                ctx.success()
            }
        }
    }
}

const deleteFileSortByUid = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let uids = ctx.request.body
    console.log(uids, 'uids')
    const {errorMsg, isValid} = deleteFileSortByUidValidator(uids)
    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await fileSortService.deleteFileSortByUid(uids)
        if (result) {
            ctx.success()
        }
    }
}

const updateFileSortByUid = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let {uid, coverImg, sortName, order} = ctx.request.body
    console.log(ctx.request.body, 'ctx.request.body')
    const {errorMsg, isValid} = saveFileSortValidator(sortName)
    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        // 根据uid修改这条记录
        let result = await fileSortService.updateFileSortByUid(uid, coverImg, sortName, order)
        if (result) {
            ctx.success()
        }
    }

}


const queryFileSortPage = async ctx => {
    let {currentPage, pageSize, sortName} = ctx.request.body

    if (!sortName) { // 模糊查询，如果没有，就传个空字符串
        sortName = ''
    }
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await fileSortService.queryFileSortPage(+currentPage, +pageSize, sortName)
    let {total} = await fileSortService.queryAllCountFileSort()
    let newResult = {
        result,
        total,
        currentPage,
        pageSize,
    }
    ctx.success(newResult)
}

module.exports = {
    saveFileSort,
    deleteFileSortByUid,
    updateFileSortByUid,
    queryFileSortPage,
}
