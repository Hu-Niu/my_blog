const articleService = require('../service/article')
const webUserService = require('../service/webUser')
const fileService = require('../service/file')
const {
    saveArticleValidator,
    deleteArticleByUidValidator,
    updateArticleByUidValidator,
    exportArticleValidator,
    queryArticleByRecommendLevelValidator,
} = require('../validation/article')
const resCode = require('../constant/resCode')
const {ARTICLE, APP} = require('../constant/resCodeVariable')
const generateUuid = require('../utils/generateUuid')
const dayjs = require('dayjs')
const fs = require('fs')
const marked = require('marked') // md -> html


const updateArticleByUid = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let {
        uid, blogTitle, blogSummary, originAddress, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, isPrivate, blogStatus,
        coverUrl, blogContent, blogTagIds
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')

    const {
        errorMsg,
        isValid
    } = updateArticleByUidValidator(uid, blogTitle)
    // 为一些参数设置默认值，根据业务设置
    blogSummary = blogSummary ? blogSummary : ''
    originAddress = originAddress ? originAddress : ''
    blogSortId = blogSortId ? blogSortId : ''
    recommendLevel = recommendLevel ? recommendLevel : '-1'
    order = order ? order : '0'
    isOpenComment = isOpenComment ? isOpenComment : '2'
    isPrivate = isPrivate ? isPrivate : '2'
    blogStatus = blogStatus ? blogStatus : '2'
    blogContent = blogContent ? blogContent : ''
    isOriginal = isOriginal ? isOriginal : '1'
    blogTagIds = blogTagIds ? blogTagIds : []

    // 补充参数
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    // 封装好处理过的参数
    let params = {
        uid, blogTitle, blogSummary, originAddress, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, isPrivate, blogStatus,
        coverUrl, blogContent, blogTagIds, updateTime
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {

        let {blog_author_id, create_time} = await articleService.queryArticleByUid(uid)
        // 补充参数
        params.blogAuthorId = blog_author_id
        params.createTime = create_time

        // 根据uid修改这条记录
        let result = await articleService.updateArticleByUid(params)
        if (result) {
            ctx.success()
        }
    }

}

const saveArticle = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */

    let {
        blogTitle, blogSummary, originAddress, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, isPrivate, blogStatus,
        coverUrl, blogContent, blogTagIds
    } = ctx.request.body

    // 参数校验
    const {errorMsg, isValid} = saveArticleValidator(blogTitle)

    // 为一些参数设置默认值，根据业务设置
    blogSummary = blogSummary ? blogSummary : ''
    originAddress = originAddress ? originAddress : ''
    blogAuthorId = blogAuthorId ? blogAuthorId : ctx.state.user.uid
    blogSortId = blogSortId ? blogSortId : ''
    recommendLevel = recommendLevel ? recommendLevel : '-1'
    order = order ? order : '0'
    isOpenComment = isOpenComment ? isOpenComment : '2'
    isPrivate = isPrivate ? isPrivate : '2'
    blogStatus = blogStatus ? blogStatus : '2'
    blogContent = blogContent ? blogContent : ''
    isOriginal = isOriginal ? isOriginal : '1'
    blogTagIds = blogTagIds ? blogTagIds : []

    // 补充参数
    const uid = generateUuid()
    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    // 封装好处理过的参数
    const params = {
        uid, blogTitle, blogSummary, originAddress, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, order, isOpenComment, isPrivate, blogStatus,
        coverUrl, blogContent, blogTagIds, createTime, updateTime
    }


    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await articleService.queryArticleByBlogTitle(blogTitle)
        if (result) { // 博客标题已存在，不保存
            ctx.fail(resCode.get(ARTICLE.ARTICLE_TITLE_ALREADY_EXISTS))
        } else {
            let flag = await articleService.saveArticle(params)
            if (flag) {
                ctx.success()
            }
        }
    }
}

// 判断是否是管理员
async function isXzzOrCheny(ctx) {
    let {client, userid} = ctx.request.header

    let isChenyOrXzz = false // 判断是否是管理员

    if (userid) { // 如果有userid，说明是登录过的，获取这个用户的身份，看是否是管理员
        switch (client) {
            case 'web':
                let {user_identity} = await webUserService.queryWebUserByUid(userid)
                // -1是小陈 -2是小夏
                // if (user_identity === -1 || user_identity === -2) {
                if (user_identity === -1) {
                    isChenyOrXzz = true
                }
                break
            case 'admin':
                isChenyOrXzz = true
                break
        }
    }

    return isChenyOrXzz
}

const queryArticlePage = async ctx => {
    let {
        currentPage, pageSize,
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, isPrivate, blogStatus, blogTag,
        createTime
    } = ctx.request.body


    let isChenyOrXzz = await isXzzOrCheny(ctx) // 判断是否是管理员

    // 模糊查询，如果没有，就传入空字符串
    // int类型的数据不带%，因为需要精准查
    // varchar类型的数据带%，因为需要模糊查
    // 在controller层赋值时，int类型没有值时，就赋值为%，有值时就取自己的值
    blogTitle = blogTitle ? blogTitle : ''
    blogAuthorId = blogAuthorId ? blogAuthorId : '%'
    isOriginal = isOriginal ? isOriginal : '%'
    blogSortId = blogSortId ? blogSortId : '%'
    recommendLevel = recommendLevel ? recommendLevel : '%'
    isOpenComment = isOpenComment ? isOpenComment : '%'

    if (isChenyOrXzz) { // 如果是管理员的话
        isPrivate = isPrivate ? isPrivate : '%'
    } else { // 如果不是管理员 或者 未登录的话，只能看公开的文章
        isPrivate = '2'
    }

    blogStatus = blogStatus ? blogStatus : '%'

    blogTag = blogTag ? blogTag : ''
    createTime = createTime ? createTime : ''


    // 封装好处理过的参数
    let params = {
        currentPage: +currentPage,
        pageSize: +pageSize,
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, isPrivate, blogStatus, blogTag,
        createTime
    }

    let result = await articleService.queryArticlePage(params)
    let total = await articleService.queryAllCountArticle(params)
    let newResult = {
        result,
        total,
        currentPage,
        pageSize,
    }
    ctx.success(newResult)
}

const queryArticleAll2 = async ctx => {
    let {
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, isPrivate, blogStatus, blogTag
    } = ctx.request.body


    // 模糊查询，如果没有，就传入空字符串
    // int类型的数据不带%，因为需要精准查
    // varchar类型的数据带%，因为需要模糊查
    // 在controller层赋值时，int类型没有值时，就赋值为%，有值时就取自己的值
    blogTitle = blogTitle ? blogTitle : ''
    blogAuthorId = blogAuthorId ? blogAuthorId : '%'
    isOriginal = isOriginal ? isOriginal : '%'
    blogSortId = blogSortId ? blogSortId : '%'
    recommendLevel = recommendLevel ? recommendLevel : '%'
    isOpenComment = isOpenComment ? isOpenComment : '%'
    isPrivate = isPrivate ? isPrivate : '%'
    blogStatus = blogStatus ? blogStatus : '%'

    blogTag = blogTag ? blogTag : ''


    // 封装好处理过的参数
    let params = {
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, isPrivate, blogStatus, blogTag
    }

    let result = await articleService.queryArticleAll2(params)

    ctx.success(result)
}

const queryArticleByUid = async ctx => {
    let {uid} = ctx.params

    let result = await articleService.queryArticleByUid2(uid)

    await articleService.updateArticleClicksByUid(uid)

    ctx.success(result)

}


const queryHotArticlePage = async ctx => {
    let {
        currentPage, pageSize,
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, isPrivate, blogStatus, blogTag
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')


    // 模糊查询，如果没有，就传入空字符串
    // int类型的数据不带%，因为需要精准查
    // varchar类型的数据带%，因为需要模糊查
    // 在controller层赋值时，int类型没有值时，就赋值为%，有值时就取自己的值
    blogTitle = blogTitle ? blogTitle : ''
    blogAuthorId = blogAuthorId ? blogAuthorId : '%'
    isOriginal = isOriginal ? isOriginal : '%'
    blogSortId = blogSortId ? blogSortId : '%'
    recommendLevel = recommendLevel ? recommendLevel : '%'
    isOpenComment = isOpenComment ? isOpenComment : '%'
    isPrivate = isPrivate ? isPrivate : '%'
    blogStatus = blogStatus ? blogStatus : '%'

    blogTag = blogTag ? blogTag : ''


    // 封装好处理过的参数
    let params = {
        currentPage: +currentPage,
        pageSize: +pageSize,
        blogTitle, blogAuthorId, isOriginal, blogSortId,
        recommendLevel, isOpenComment, isPrivate, blogStatus, blogTag
    }

    let result = await articleService.queryHotArticlePage(params)

    ctx.success(result)
}

const deleteArticleByUid = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：保存成功
     *    校验不通过：返回错误信息
     */
    let uids = ctx.request.body
    console.log(uids, 'uids')
    const {errorMsg, isValid} = deleteArticleByUidValidator(ctx.request.body)

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await articleService.deleteArticleByUid(uids)
        if (result) {
            ctx.success()
        }
    }
}

const queryArticleByRecommendLevel = async ctx => {
    /**
     * 1、接收参数
     * 2、校验参数
     *    校验通过：返回查询结果
     *    校验不通过：返回错误信息
     */
    let {recommendLevel} = ctx.query
    console.log(ctx.query, 'recommendLevel2')
    const {errorMsg, isValid} = queryArticleByRecommendLevelValidator(recommendLevel)

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await articleService.queryArticleByRecommendLevel(recommendLevel)
        ctx.success(result)
    }
}

/**
 * 导入文章
 */
const importArticle = async ctx => {

    let {file} = ctx.request.files

    // 解析md文件
    let txt = fs.readFileSync(file.path, 'utf8')

    /*
    * 将读取到的txt中的图片链接替换为线上的链接
    * 1、获取到当天上传的图片名，和可访问的图片链接
    * 2、将名字相同的替换成线上链接
    * */
    // console.log(txt)

    const createTime = dayjs().format('YYYY-MM-DD')
    const todayPictures = await fileService.queryAllFile('', createTime)

    if (todayPictures.length > 0) {
        let pictures = todayPictures[0].files
        txt = articleService.convertTxtPictureLink(pictures, txt)
    }
    ctx.request.body.blogContent = marked(txt)
    await saveArticle(ctx)
}
/**
 * 导出文章
 * 参考：https://segmentfault.com/a/1190000023731567
 */
const exportArticle = async ctx => {

    let uids = ctx.request.body
    console.log(ctx.request.body, 'ctx.request.body')

    const {errorMsg, isValid} = exportArticleValidator(ctx.request.body)
    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await articleService.exportArticle(uids)
        if (result) {
            ctx.body = result
        }
    }
}


const queryArticleAll = async ctx => {
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await articleService.queryArticleAll()
    ctx.success(result)
}
const queryRecommendArticleByRecommendLevel = async ctx => {
    let {levelId} = ctx.params
    console.log(ctx.params, 'ctx.params')
    let result = await articleService.queryRecommendArticleByRecommendLevel(levelId)
    ctx.success(result)
}

const queryAllArticleCreateTimeList = async ctx => {

    // 判断是否是管理员，把私密文章排除掉
    let isChenyOrXzz = await isXzzOrCheny(ctx) // 判断是否是管理员

    let result = await articleService.queryAllArticleCreateTimeList(isChenyOrXzz)
    ctx.success(result)
}


module.exports = {
    saveArticle,
    deleteArticleByUid,
    updateArticleByUid,
    queryArticlePage,
    importArticle,
    exportArticle,
    queryArticleByRecommendLevel,
    queryArticleAll,
    queryRecommendArticleByRecommendLevel,
    queryHotArticlePage,
    queryArticleAll2,
    queryAllArticleCreateTimeList,
    queryArticleByUid,
    isXzzOrCheny,
}
