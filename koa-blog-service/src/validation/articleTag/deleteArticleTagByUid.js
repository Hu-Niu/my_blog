const Validator = require('validator')
const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param uids uids不能为空
 */
module.exports = (uids) => {

    let _uids = isEmpty(uids)? '' : uids

    let isValid = false // 默认校验不通过

    if (!_uids) {
        return {
            errorMsg: 'uid不能为空',
            isValid,
        }
    }
    if (!Array.isArray(_uids)) {
        return {
            errorMsg: 'uid必须位数组类型',
            isValid,
        }
    }

    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
