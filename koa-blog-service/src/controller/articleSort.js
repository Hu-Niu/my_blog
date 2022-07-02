const articleSortService = require('../service/articleSort')
const {
    saveArticleSortValidator,
    deleteArticleSortByUidValidator,
} = require('../validation/articleSort')
const resCode = require('../constant/resCode')
const {ARTICLE, APP} = require('../constant/resCodeVariable')
const generateUuid = require('../utils/generateUuid')

const articleController = require('../controller/article')

const saveArticleSort = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let {sortName, intro, order} = ctx.request.body
    if (!order) {
        order = 0
    }
    console.log(ctx.request.body, 'ctx.request.body')
    // 参数校验
    const {errorMsg, isValid} = saveArticleSortValidator(sortName)

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let uid = generateUuid()
        let result = await articleSortService.queryArticleSortBySortName(sortName)
        if (result) { // 分类名已存在，不保存
            ctx.fail(resCode.get(ARTICLE.ARTICLE_SORT_ALREADY_EXISTS))
        } else {
            let flag = await articleSortService.saveArticleSort(uid, sortName, intro, order)
            if (flag) {
                ctx.success()
            }
        }
    }
}

const deleteArticleSortByUid = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let uids = ctx.request.body
    console.log(uids, 'uids')
    const {errorMsg, isValid} = deleteArticleSortByUidValidator(uids)
    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await articleSortService.deleteArticleSortByUid(uids)
        if (result) {
            ctx.success()
        }
    }
}

const updateArticleSortByUid = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let {uid, sortName, intro, order} = ctx.request.body
    console.log(ctx.request.body, 'ctx.request.body')
    const {errorMsg, isValid} = saveArticleSortValidator(sortName)
    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        // 根据uid修改这条记录
        let result = await articleSortService.updateArticleSortByUid(uid, sortName, intro, order)
        if (result) {
            ctx.success()
        }
    }

}

const queryArticleSortPage = async ctx => {
    let {currentPage, pageSize, sortName} = ctx.request.body
    if (!sortName) { // 模糊查询，如果没有，就传个空字符串
        sortName = ''
    }
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await articleSortService.queryArticleSortPage(+currentPage, +pageSize, sortName)
    let {total} = await articleSortService.queryAllCountArticleSort()
    let newResult = {
        result,
        total,
        currentPage,
        pageSize,
    }
    ctx.success(newResult)
}

const queryArticleSortAll = async ctx => {
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await articleSortService.queryArticleSortAll()
    ctx.success(result)
}
const queryArticleSortAll2 = async ctx => {
    // 判断是否是管理员，为了排除私密文章
    let isXzzOrCheny = await articleController.isXzzOrCheny(ctx)
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await articleSortService.queryArticleSortAll2(isXzzOrCheny)
    ctx.success(result)
}


module.exports = {
    saveArticleSort,
    deleteArticleSortByUid,
    updateArticleSortByUid,
    queryArticleSortPage,
    queryArticleSortAll,
    queryArticleSortAll2,

}
