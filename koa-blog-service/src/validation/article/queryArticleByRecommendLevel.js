const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param recommendLevel 不能为空
 */
module.exports = (recommendLevel) => {

    let _recommendLevel = isEmpty(recommendLevel)? '' : recommendLevel

    let isValid = false // 默认校验不通过

    if (!_recommendLevel) {
        return {
            errorMsg: 'recommendLevel不能为空',
            isValid,
        }
    }

    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
