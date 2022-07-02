const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param currentPage 不能为空
 * @param pageSize 不能为空
 */
module.exports = (currentPage, pageSize) => {

    let _currentPage = isEmpty(currentPage)? '' : currentPage
    let _pageSize = isEmpty(pageSize)? '' : pageSize

    let isValid = false // 默认校验不通过

    if (!_currentPage) {
        return {
            errorMsg: 'currentPage不能为空',
            isValid,
        }
    }
    if (!_pageSize) {
        return {
            errorMsg: 'pageSize不能为空',
            isValid,
        }
    }

    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
