const commentReactionService = require('../service/commentReaction')
const {
    saveCommentReactionValidator,
    deleteCommentReactionByUidValidator,
    updateCommentReactionByUidValidator,
    queryCommentReactionPageValidator,
} = require('../validation/commentReaction')
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
const {COMMENT ,APP} = require('../constant/resCodeVariable')
const generateUuid = require('../utils/generateUuid')
const dayjs = require('dayjs')

const saveCommentReaction = async ctx => {
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
        commentId, reactionPersonId, reactionContent, commentSource, sourceId,orderNum
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')
    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$保存接口，参数校验参数接收$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    const {errorMsg, isValid} = saveCommentReactionValidator(
        commentId, reactionPersonId, reactionContent
    )

    /**
     * 为一些参数设置默认值，根据数据表中的默认值设置
     *
     * 模式：$新增接口，未传递参数设置默认值$
     * 模式解析方式：提取出解析过的数据表中，有默认值的字段，替换为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    commentId = commentId ? commentId : ''
    reactionPersonId = reactionPersonId ? reactionPersonId : ''
    reactionContent = reactionContent ? reactionContent : ''
    commentSource = commentSource ? commentSource : 1
    sourceId = sourceId ? sourceId : ''
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
        uid, commentId, reactionPersonId, reactionContent,commentSource, sourceId,
        orderNum, createTime, updateTime
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let flag = await commentReactionService.saveCommentReaction(params)
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
const deleteCommentReactionByUid = async ctx => {
    let uids = ctx.request.body
    console.log(uids, 'uids')
    const {errorMsg, isValid} = deleteCommentReactionByUidValidator(ctx.request.body)

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await commentReactionService.deleteCommentReactionByUid(uids)
        if (result) {
            ctx.success()
        }
    }
}

const queryCommentReactionPage = async ctx => {
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
        commentId, reactionPersonId, reactionContent, commentSource, sourceId,orderNum
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')
    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$分页查询接口，参数校验参数接收$
     * 模式解析方式：只需校验 currentPage, pageSize
     *
     */
    const {errorMsg, isValid} = queryCommentReactionPageValidator(currentPage, pageSize)

    /**
     * 模糊查询，如果前台没有传入，就设置为空字符串
     *
     * 模式：$分页查询接口，未传递参数设置空字符串$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值，且默认值不为null的字段，替换为小驼峰格式字符串
     *
     */
    commentId = commentId ? commentId : ''
    reactionPersonId = reactionPersonId ? reactionPersonId : ''
    reactionContent = reactionContent ? reactionContent : ''
    commentSource = commentSource ? commentSource : '%'
    sourceId = sourceId ? sourceId : ''
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
        commentId, reactionPersonId, reactionContent, commentSource, sourceId,orderNum
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await commentReactionService.queryCommentReactionPage(params)
        let {total} = await commentReactionService.queryAllCountCommentReaction(params)
        let newResult = {
            result,
            total,
            currentPage,
            pageSize,
        }
        ctx.success(newResult)
    }
}

const updateCommentReactionByUid = async ctx => {
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
        uid, commentId, reactionPersonId, reactionContent,commentSource, sourceId,
        orderNum
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')

    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$更新接口，参数校验参数接收$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 createTime,updateTime
     *
     */
    const {errorMsg, isValid} = updateCommentReactionByUidValidator(
        uid, commentId, reactionPersonId, reactionContent,commentSource, sourceId,
    )

    /**
     * 为一些参数设置默认值，根据数据表中的默认值设置
     *
     * 模式：$更新接口，未传递参数设置默认值$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值的字段，替换为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    commentId = commentId ? commentId : ''
    reactionPersonId = reactionPersonId ? reactionPersonId : ''
    reactionContent = reactionContent ? reactionContent : ''
    commentSource = commentSource ? commentSource : 1
    sourceId = sourceId ? sourceId : ''
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
        uid, commentId, reactionPersonId, reactionContent,commentSource, sourceId,
        orderNum, updateTime
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {

        // 补充参数
        let {create_time} = await commentReactionService.queryCommentReactionByUid(uid)
        params.createTime = create_time

        // 根据uid修改这条记录
        let result = await commentReactionService.updateCommentReactionByUid(params)
        if (result) {
            ctx.success()
        }
    }

}

const queryCommentReactionAll = async ctx => {
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await commentReactionService.queryCommentReactionAll()
    ctx.success(result)
}

module.exports = {
    saveCommentReaction,
    deleteCommentReactionByUid,
    updateCommentReactionByUid,
    queryCommentReactionPage,
    queryCommentReactionAll,
}
