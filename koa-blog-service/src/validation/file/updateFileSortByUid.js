const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param fileIds fileIds不能为空
 * @param sortId sortId不能为空
 */
module.exports = (fileIds, sortId) => {

    let _fileIds = isEmpty(fileIds)? '' : fileIds
    let _sortId = isEmpty(sortId)? '' : sortId

    let isValid = false // 默认校验不通过

    if (!_fileIds) {
        return {
            errorMsg: 'fileIds不能为空',
            isValid,
        }
    }
    if (!_sortId) {
        return {
            errorMsg: 'sortId不能为空',
            isValid,
        }
    }
    if (!Array.isArray(_fileIds)) {
        return {
            errorMsg: 'fileIds必须位数组类型',
            isValid,
        }
    }

    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
