const {isEmpty} = require('../../utils/toolsFunction')

/**
 * 生成保存接口的校验参数注释
 *
 * 模式：$保存接口参数校验，注释生成$
 * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
 *
 */

/**
 * @param informType 不能为空
 * @param informReason 不能为空
 * @param informPersonId 不能为空
 * @param informCommentId 不能为空
 * @param commentSource 不能为空
 * @param sourceId 不能为空
 */
module.exports = (
    informType, informReason, informPersonId, informCommentId,
    commentSource, sourceId
) => {
    /**
     * 保存接口校验参数获取
     *
     * 模式：$保存接口参数校验，校验参数接收$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */


    /**
     * 临时变量生成
     *
     * 模式：$保存接口参数校验，临时变量生成$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    let _informType = isEmpty(informType) ? '' : informType
    let _informReason = isEmpty(informReason) ? '' : informReason
    let _informPersonId = isEmpty(informPersonId) ? '' : informPersonId
    let _informCommentId = isEmpty(informCommentId) ? '' : informCommentId
    let _commentSource = isEmpty(commentSource) ? '' : commentSource
    let _sourceId = isEmpty(sourceId) ? '' : sourceId


    let isValid = false // 默认校验不通过

    /**
     * 临时变量校验
     *
     * 模式：$保存接口参数校验，临时变量校验$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    if (!_informType) {
        return {
            errorMsg: 'informType不能为空',
            isValid,
        }
    }
    if (!_informReason) {
        return {
            errorMsg: 'informReason不能为空',
            isValid,
        }
    }
    if (!_informPersonId) {
        return {
            errorMsg: 'informPersonId不能为空',
            isValid,
        }
    }
    if (!_informCommentId) {
        return {
            errorMsg: 'informCommentId不能为空',
            isValid,
        }
    }
    if (!_commentSource) {
        return {
            errorMsg: 'commentSource不能为空',
            isValid,
        }
    }
    if (!_sourceId) {
        return {
            errorMsg: 'sourceId不能为空',
            isValid,
        }
    }


    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
