const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param articleList 不能为空
 */
module.exports = (
    articleList
) => {

    let _articleList = isEmpty(articleList) ? '' : articleList

    let isValid = false // 默认校验不通过

    if (!_articleList) {
        return {
            errorMsg: 'articleList不能为空',
            isValid,
        }
    }

    if (!Array.isArray(_articleList)) {
        return {
            errorMsg: 'articleList必须为数组类型',
            isValid,
        }
    }


    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
