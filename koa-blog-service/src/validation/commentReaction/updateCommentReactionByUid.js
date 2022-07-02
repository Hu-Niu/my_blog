const {isEmpty} = require('../../utils/toolsFunction')

/**
 * 生成保存接口的校验参数注释
 *
 * 模式：$保存接口参数校验，注释生成$
 * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
 *
 */

/**
 * @param uid 不能为空
 * @param commentId 不能为空
 * @param reactionPersonId 不能为空
 * @param reactionContent 不能为空
 */
module.exports = (
    uid, commentId, reactionPersonId, reactionContent
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
    let _uid = isEmpty(uid) ? '' : uid
    let _commentId = isEmpty(commentId) ? '' : commentId
    let _reactionPersonId = isEmpty(reactionPersonId) ? '' : reactionPersonId
    let _reactionContent = isEmpty(reactionContent) ? '' : reactionContent


    let isValid = false // 默认校验不通过

    /**
     * 临时变量校验
     *
     * 模式：$保存接口参数校验，临时变量校验$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    if (!_uid) {
        return {
            errorMsg: 'uid不能为空',
            isValid,
        }
    }
    if (!_commentId) {
        return {
            errorMsg: 'commentId不能为空',
            isValid,
        }
    }
    if (!_reactionPersonId) {
        return {
            errorMsg: 'reactionPersonId不能为空',
            isValid,
        }
    }
    if (!_reactionContent) {
        return {
            errorMsg: 'reactionContent不能为空',
            isValid,
        }
    }


    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
