const {isEmpty} = require('../../utils/toolsFunction')

/**
 * 生成保存接口的校验参数注释
 *
 * 模式：$保存接口参数校验，注释生成$
 * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
 *
 */

/**
 * @param commentContent 不能为空
 * @param commentSource 不能为空
 * @param sourceId 不能为空
 * @param commentPersonId 不能为空
 */
module.exports = (
    commentContent, commentSource, sourceId, commentPersonId
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
    let _commentContent = isEmpty(commentContent) ? '' : commentContent
    let _commentSource = isEmpty(commentSource) ? '' : commentSource
    let _sourceId = isEmpty(sourceId) ? '' : sourceId
    let _commentPersonId = isEmpty(commentPersonId) ? '' : commentPersonId


    let isValid = false // 默认校验不通过

    /**
     * 临时变量校验
     *
     * 模式：$保存接口参数校验，临时变量校验$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    if (!_commentContent) {
        return {
            errorMsg: 'commentContent不能为空',
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
    if (!_commentPersonId) {
        return {
            errorMsg: 'commentPersonId不能为空',
            isValid,
        }
    }


    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
