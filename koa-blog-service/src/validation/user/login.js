const Validator = require('validator')
const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param username 不能位空 长度2到6位
 * @param password 不能位空 长度不能小于3位
 */
module.exports = (username, password) => {
    let isValid = false // 默认校验不通过

    let _username = isEmpty(username)? '' : username
    let _password = isEmpty(password)? '' : password

    if (Validator.isEmpty(_username)) {
        return {
            errorMsg: '用户名不能为空',
            isValid,
        }
    }
    if (!Validator.isLength(_username, {min: 2, max: 11})) {
        return {
            errorMsg: '用户名长度最少不少于2位，最多不超过11位',
            isValid
        }
    }

    if (Validator.isEmpty(_password)) {
        return {
            errorMsg: '密码不能位空',
            isValid,
        }
    }
    if (!Validator.isLength(_password, {min: 3})) {
        return {
            errorMsg: '用户名长度最少不少于3位',
            isValid
        }
    }

    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
