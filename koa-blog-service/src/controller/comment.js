const commentService = require('../service/comment')
const {
    saveCommentValidator,
    deleteCommentByUidValidator,
    updateCommentByUidValidator,
    queryCommentPageValidator,
} = require('../validation/comment')
const resCode = require('../constant/resCode')
/**
 * 获取错误码所属的模块
 *
 * 模式：$保存接口，获取已存在错误码模块$
 * 模式解析方式：从控制台中获得---通过正则解析出原文件resCodeVariable.js中的错误码模块名
 *  （每次创建新模块时候，如果需要，提前创建好所需的错误码），
 *    然后运行npm run add 执行创建代码脚本时，从控制台选择所涉及到的模块错误码，
 *  替换为常量格式字符串
 */
const {COMMENT, APP} = require('../constant/resCodeVariable')
const generateUuid = require('../utils/generateUuid')
const dayjs = require('dayjs')

const saveComment = async ctx => {
    /**
     * 这里把数据库表里的字段都声明出来
     * 除了 uid create_time update_time
     *
     * 这些都是可以从前台接收来的参数
     *
     * 模式：$保存接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     */
    let {
        commentContent, commentSource, sourceId, commentStatus,
        commentPersonId, commentedPersonId, toCommentId, rootCommentId,commentLayer,
        orderNum
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')
    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$保存接口，参数校验参数接收$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    const {errorMsg, isValid} = saveCommentValidator(
        commentContent, commentSource, sourceId, commentPersonId
    )

    /**
     * 为一些参数设置默认值，根据数据表中的默认值设置
     *
     * 模式：$新增接口，未传递参数设置默认值$
     * 模式解析方式：提取出解析过的数据表中，有默认值的字段，替换为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    commentContent = commentContent ? commentContent : ''
    commentSource = commentSource ? commentSource : 1
    sourceId = sourceId ? sourceId : ''
    commentStatus = commentStatus ? commentStatus : 1
    commentPersonId = commentPersonId ? commentPersonId : ''
    commentedPersonId = commentedPersonId ? commentedPersonId : ''
    toCommentId = toCommentId ? toCommentId : ''
    rootCommentId = rootCommentId ? rootCommentId : ''
    commentLayer = commentLayer ? commentLayer : 1
    orderNum = orderNum ? orderNum : 0


    // 补充参数
    const uid = generateUuid()
    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    /**
     * 封装好处理过的参数
     *
     * 模式：$保存接口，封装处理过的参数$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰变量
     *
     */
    const params = {
        uid, commentContent, commentSource, sourceId,
        commentStatus, commentPersonId, commentedPersonId, toCommentId,
        rootCommentId, commentLayer,orderNum, createTime, updateTime
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        /**
         * 保存的时候需要校验 是否已经保存过
         * 定义默认根据数据库表中的第二个字段查询（第一个字段是Uid）
         *
         * 模式：$保存接口，根据第二个字段查询是否已经保存过$
         * 模式解析方式：提取出所有解析过的数据表字段，数组第二项的字段值，替换为为大驼峰格式字符串
         *
         */
        let flag = await commentService.saveComment(params)
        if (flag) {
            ctx.success()
        }
    }
}

/**
 * 删除接口传入的参数是一个uid的数组
 * 数据库设计的时候，所有的主键规定都为uid，由服务端自行生成，
 * （除非中间表，不需要维护主键，选择id自增，由数据库自己维护）
 */
const deleteCommentByUid = async ctx => {
    let uids = ctx.request.body
    console.log(uids, 'uids')
    const {errorMsg, isValid} = deleteCommentByUidValidator(ctx.request.body)

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await commentService.deleteCommentByUid(uids)
        if (result) {
            ctx.success()
        }
    }
}
/**
 * 删除接口传入的参数是一个uid的数组
 * 数据库设计的时候，所有的主键规定都为uid，由服务端自行生成，
 * （除非中间表，不需要维护主键，选择id自增，由数据库自己维护）
 */
const passOrRejectCommentByUid = async ctx => {
    let uids = ctx.request.body
    let commentStatus = ctx.params.commentStatus
    console.log(uids, 'uids')
    console.log(commentStatus,'commentStatus')

    const {errorMsg, isValid} = deleteCommentByUidValidator(ctx.request.body)

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await commentService.passOrRejectCommentByUid(uids,commentStatus)
        if (result) {
            ctx.success()
        }
    }
}


const queryCommentPage = async ctx => {
    /**
     * 这里把数据库表里的字段都声明出来
     * 除了 uid create_time update_time
     *
     * 这些都是可以从前台接收来的参数
     *
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        commentContent, commentSource, sourceId, commentStatus,
        commentPersonId, commentedPersonId, toCommentId, rootCommentId,commentLayer,
        orderNum
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')
    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$分页查询接口，参数校验参数接收$
     * 模式解析方式：只需校验 currentPage, pageSize
     *
     */
    const {errorMsg, isValid} = queryCommentPageValidator(currentPage, pageSize)

    /**
     * 模糊查询，如果前台没有传入，就设置为空字符串
     *
     * 模式：$分页查询接口，未传递参数设置空字符串$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值，且默认值不为null的字段，替换为小驼峰格式字符串
     *
     */
    commentContent = commentContent ? commentContent : ''
    commentSource = commentSource ? commentSource : '%'
    sourceId = sourceId ? sourceId : ''
    commentStatus = commentStatus ? commentStatus : '%'
    commentPersonId = commentPersonId ? commentPersonId : ''
    commentedPersonId = commentedPersonId ? commentedPersonId : ''
    toCommentId = toCommentId ? toCommentId : ''
    rootCommentId = rootCommentId ? rootCommentId : ''
    commentLayer = commentLayer ? commentLayer : '%'
    orderNum = orderNum ? orderNum : '%'


    /**
     * 封装好处理过的参数
     *
     * 模式：$分页查询接口，封装处理过的参数$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，
     *
     */
    let params = {
        currentPage: +currentPage,
        pageSize: +pageSize,
        commentContent, commentSource, sourceId, commentStatus,
        commentPersonId, commentedPersonId, toCommentId, rootCommentId,commentLayer,
        orderNum
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await commentService.queryCommentPage(params)
        let {total} = await commentService.queryAllCountComment(params)
        let newResult = {
            result,
            total,
            currentPage,
            pageSize,
        }
        ctx.success(newResult)
    }
}

const queryComment = async ctx => {
    let {
        commentContent, commentSource, sourceId, commentStatus,
        commentPersonId, commentedPersonId, toCommentId, rootCommentId,commentLayer,
        orderNum
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')


    /**
     * 模糊查询，如果前台没有传入，就设置为空字符串
     *
     * 模式：$分页查询接口，未传递参数设置空字符串$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值，且默认值不为null的字段，替换为小驼峰格式字符串
     *
     */
    commentContent = commentContent ? commentContent : ''
    commentSource = commentSource ? commentSource : '%'
    sourceId = sourceId ? sourceId : ''
    commentStatus = commentStatus ? commentStatus : '%'
    commentPersonId = commentPersonId ? commentPersonId : ''
    commentedPersonId = commentedPersonId ? commentedPersonId : ''
    toCommentId = toCommentId ? toCommentId : ''
    rootCommentId = rootCommentId ? rootCommentId : ''
    commentLayer = commentLayer ? commentLayer : '%'
    orderNum = orderNum ? orderNum : '%'


    /**
     * 封装好处理过的参数
     *
     * 模式：$分页查询接口，封装处理过的参数$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，
     *
     */
    let params = {
        commentContent, commentSource, sourceId, commentStatus,
        commentPersonId, commentedPersonId, toCommentId, rootCommentId,commentLayer,
        orderNum
    }


    /*
    * 三种留言状态：1、未审核；2、通过；3、违规评论
    * 游客能看到的评论为：
    *   A：审核通过的评论、违规评论，
    *       违规评论后台需特殊处理，将文本转换为：此条评论已被系统屏蔽
    * 登录的用户能看到的评论为：
    *   B：审核通过的评论、违规评论、自己未审核的评论
    *       违规评论后台需特殊处理，将文本转换为：此条评论已被系统屏蔽
    *
    *
    * 1、获取请求头里的 userId
    *   - 若果没有，说明是游客访问的，返回的留言列表处理成 格式A
    *   - 如果有，返回的留言列表处理成 格式B
    * */
    const userId = ctx.request.req.headers.userid
    console.log(userId,'userId')


    // 尚未处理的留言
    let result = await commentService.queryComment(params)
    // 将违规评论特殊处理
    let result2 = commentService.convertIllegalComment(result)

    let finalResult

    if(!userId){ // 如果没有userId，说明是游客
        // 返回游客可以看到的评论列表
        finalResult = commentService.commentAboutVisitorsCanSee(result2)
    }else { // 反之，说明是已登录的用户

        // 返回用户可以看到的评论列表
        finalResult = commentService.commentAboutUserCanSee(result2,userId)
    }

    ctx.success(finalResult)

}


const updateCommentByUid = async ctx => {
    /**
     * 这里把数据库表里的字段都声明出来
     * 除了 create_time update_time
     *
     * 这些都是可以从前台接收来的参数
     *
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 createTime,updateTime
     */

    let {
        uid, commentContent, commentSource, sourceId,
        commentStatus, commentPersonId, commentedPersonId, toCommentId,
        rootCommentId, commentLayer,orderNum
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')

    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$更新接口，参数校验参数接收$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 createTime,updateTime
     *
     */
    const {errorMsg, isValid} = updateCommentByUidValidator(
        uid, commentContent, commentSource, sourceId,
        commentPersonId
    )

    /**
     * 为一些参数设置默认值，根据数据表中的默认值设置
     *
     * 模式：$更新接口，未传递参数设置默认值$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值的字段，替换为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    commentContent = commentContent ? commentContent : ''
    commentSource = commentSource ? commentSource : 1
    sourceId = sourceId ? sourceId : ''
    commentStatus = commentStatus ? commentStatus : 1
    commentPersonId = commentPersonId ? commentPersonId : ''
    commentedPersonId = commentedPersonId ? commentedPersonId : ''
    toCommentId = toCommentId ? toCommentId : ''
    rootCommentId = rootCommentId ? rootCommentId : ''
    commentLayer = commentLayer ? commentLayer : 1
    orderNum = orderNum ? orderNum : 0


    // 补充参数
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    /**
     * 封装好处理过的参数
     *
     * 模式：$保存接口，封装处理过的参数$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰变量
     *
     */
    let params = {
        uid, commentContent, commentSource, sourceId,
        commentStatus, commentPersonId, commentedPersonId, toCommentId,
        rootCommentId,commentLayer, orderNum, updateTime
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {

        // 补充参数
        let {create_time} = await commentService.queryCommentByUid(uid)
        params.createTime = create_time

        // 根据uid修改这条记录
        let result = await commentService.updateCommentByUid(params)
        if (result) {
            ctx.success()
        }
    }

}

const queryCommentAll = async ctx => {
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await commentService.queryCommentAll()
    ctx.success(result)
}

module.exports = {
    saveComment,
    deleteCommentByUid,
    updateCommentByUid,
    queryCommentPage,
    queryComment,
    queryCommentAll,
    passOrRejectCommentByUid,
}
