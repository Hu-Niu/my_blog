const articleTagService = require('../service/articleTag')
const {
    saveArticleTagValidator,
    deleteArticleTagByUidValidator,
} = require('../validation/articleTag')
const resCode = require('../constant/resCode')
const {ARTICLE, APP} = require('../constant/resCodeVariable')
const generateUuid = require('../utils/generateUuid')

const articleController = require('../controller/article')

const saveArticleTag = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let {tagName, order} = ctx.request.body
    if (!order) {
        order = 0
    }
    console.log(ctx.request.body, 'ctx.request.body')
    // 参数校验
    const {errorMsg, isValid} = saveArticleTagValidator(tagName)
    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let uid = generateUuid()
        let result = await articleTagService.queryArticleTagByTagName(tagName)
        if (result) { // 标签名已存在，不保存
            ctx.fail(resCode.get(ARTICLE.ARTICLE_TAG_ALREADY_EXISTS))
        } else {
            let flag = await articleTagService.saveArticleTag(uid, tagName, order)
            if(flag){
                ctx.success()
            }
        }
    }
}

const deleteArticleTagByUid = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let uids = ctx.request.body
    console.log(uids, 'uids')
    const {errorMsg, isValid} = deleteArticleTagByUidValidator(uids)
    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await articleTagService.deleteArticleTagByUid(uids)
        if (result) {
            ctx.success()
        }
    }
}

const updateArticleTagByUid = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let {uid,tagName, order} = ctx.request.body
    console.log(ctx.request.body, 'ctx.request.body')
    const {errorMsg, isValid} = saveArticleTagValidator(tagName)
    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        // 根据uid修改这条记录
        let result = await articleTagService.updateArticleTagByUid(uid,tagName, order)
        if (result) {
            ctx.success()
        }
    }
}


const queryArticleTagPage = async ctx => {
    let {currentPage, pageSize, tagName} = ctx.request.body
    if (!tagName) { // 模糊查询，如果没有，就传个空字符串
        tagName = ''
    }
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await articleTagService.queryArticleTagPage(+currentPage, +pageSize, tagName)
    let {total} = await articleTagService.queryAllCountArticleTag()
    let newResult = {
        result,
        total,
        currentPage,
        pageSize,
    }
    ctx.success(newResult)
}

const queryHotArticleTagPage = async ctx => {
    let {
        currentPage, pageSize,
        tagName,clicks,orderNum
    } = ctx.request.body

    tagName = tagName ? tagName : ''
    clicks = clicks ? clicks : '%'
    orderNum = orderNum ? orderNum : '%'

    let params = {
        currentPage: +currentPage,
        pageSize: +pageSize,
        tagName,clicks,orderNum
    }


    console.log(ctx.request.body, 'ctx.request.body')
    let result = await articleTagService.queryHotArticleTagPage(params)


    ctx.success(result)
}

const queryArticleTagAll = async ctx => {

    console.log(ctx.request.body, 'ctx.request.body')
    let result = await articleTagService.queryArticleTagAll()

    ctx.success(result)
}
const queryArticleTagAll2 = async ctx => {

    // 判断是否是管理员，为了排除私密文章
    let isXzzOrCheny = await articleController.isXzzOrCheny(ctx)
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await articleTagService.queryArticleTagAll2(isXzzOrCheny)

    ctx.success(result)
}







module.exports = {
    saveArticleTag,
    deleteArticleTagByUid,
    updateArticleTagByUid,
    queryArticleTagPage,
    queryArticleTagAll,
    queryHotArticleTagPage,
    queryArticleTagAll2,
}
