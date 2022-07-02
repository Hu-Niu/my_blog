const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param uid 不能为空
 * @param blogTitle 不能为空
 */
module.exports = (uid, blogTitle) => {

    let _uid = isEmpty(uid) ? '' : uid
    let _blogTitle = isEmpty(blogTitle) ? '' : blogTitle

    let isValid = false // 默认校验不通过

    if (!_uid) {
        return {
            errorMsg: 'uid不能为空',
            isValid,
        }
    }

    if (!_blogTitle) {
        return {
            errorMsg: '标题不能为空',
            isValid,
        }
    }


    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
