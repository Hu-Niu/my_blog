const Validator = require('validator')
const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param tagName 名字不能为空
 */
module.exports = (tagName) => {

    let _tagName = isEmpty(tagName)? '' : tagName

    let isValid = false // 默认校验不通过

    if (Validator.isEmpty(_tagName)) {
        return {
            errorMsg: '标签名不能为空',
            isValid,
        }
    }

    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
