const userService = require('../service/user')
const resCode = require('../constant/resCode')
const {USER, APP} = require('../constant/resCodeVariable')
const {expires,restPassword} = require('../constant/config')
const {encryption, compare} = require('../utils/encryption')
const generateUuid = require('../utils/generateUuid')
const {
    loginValidator,
    registerValidator,
} = require('../validation/user')

const login = async ctx => {
    let {username, password, isRememberMe} = ctx.request.body;
    let expiresIn = isRememberMe ? 3600 * 7 : expires // token默认过期时间

    // 参数校验
    const {errorMsg, isValid} = loginValidator(username, password);

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID),errorMsg)
    } else {
        /*
            1、查找用户存不存在
                不存在，返回 1001 用户名不存在
                存在，验证密码是否正确
                    正确，登录成功，返回token
                    不正确，返回 1003 密码不正确
        */
        let result = await userService.queryUserByUsername(username);
        if (!result) { // 用户名不存在
            ctx.fail(resCode.get(USER.USER_DOES_NOT_EXIST))
        } else {
            // 验证密码是否正确
            let isCorrect = await compare(password, result.password)
            if (isCorrect) { // 密码正确
                let token = await userService.generateToken(result, expiresIn)
                ctx.success(token)
            } else { // 密码错误
                ctx.fail(resCode.get(USER.USER_PASSWORD_IS_INCORRECT))
            }
        }
    }


}

const register = async ctx => {
    let {username, password} = ctx.request.body

    // 参数校验
    const {errorMsg, isValid} = registerValidator(username, password);
    if(!isValid){ // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID),errorMsg)
    }else {
        password = await encryption(password) // 对密码进行加密
        let uuid = generateUuid()
        /*
        * 1、查找数据库，判断当前用户名是否存在
        *   如果存在，返回 1002 用户名已存在
        *   如果不存在 允许注册
        * */

        let result = await userService.queryUserByUsername(username)
        if (result) { // 登录名已存在 不允许注册
            ctx.fail(resCode.get(USER.USER_ALREADY_EXISTS))
        } else { // 登录名不存在 允许注册
            await userService.saveUser(uuid, username, password)
            ctx.success()
        }
    }



}

const resetPassword = async ctx => {
    let {username} = ctx.request.body

    let password = await encryption(restPassword) // 对密码进行加密

    /*
    * 1、查找这个用户 看是否存在
    *   如果存在，重置密码
    *   如果不存在 返回用户名不存在
    * */

    let result = await userService.queryUserByUsername(username)
    if (result) { // 用户名存在，重置密码
        await userService.updateUserByUsername(password,username)
        ctx.success()
    } else { // 用户名不存在
        ctx.fail(resCode.get(USER.USER_DOES_NOT_EXIST))
    }



}


module.exports = {
    login,
    register,
    resetPassword,
}
