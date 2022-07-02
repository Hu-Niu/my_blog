const {isEmpty} = require('../../utils/toolsFunction')

/**
 * @param username 不能位空
 * @param password 不能位空
 */
module.exports = (username, password) => {
    let isValid = false // 默认校验不通过

    let _username = isEmpty(username)? '' : username
    let _password = isEmpty(password)? '' : password

    if (!_username) {
        return {
            errorMsg: '用户名不能为空',
            isValid,
        }
    }

    if (!_password) {
        return {
            errorMsg: '密码不能位空',
            isValid,
        }
    }

    isValid = true // 当所有的逻辑走完之后，校验通过

    return {
        errorMsg: '校验通过',
        isValid
    }
}
