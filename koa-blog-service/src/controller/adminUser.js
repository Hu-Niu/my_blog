const adminUserService = require('../service/adminUser')
const {
    saveAdminUserValidator,
    deleteAdminUserByUidValidator,
    updateAdminUserByUidValidator,
    queryAdminUserPageValidator,
    adminLoginValidator,
    adminResetPasswordByUidValidator,
} = require('../validation/adminUser')
const resCode = require('../constant/resCode')
const {encryption, compare} = require('../utils/encryption')
const {expires, restPassword} = require('../constant/config')
/**
 * 获取错误码所属的模块
 *
 * 模式：$保存接口，获取已存在错误码模块$
 * 模式解析方式：从控制台中获得---通过正则解析出原文件resCodeVariable.js中的错误码模块名
 *  （每次创建新模块时候，如果需要，提前创建好所需的错误码），
 *    然后运行npm run add 执行创建代码脚本时，从控制台选择所涉及到的模块错误码，
 *  替换为常量格式字符串
 */
const {ADMIN, APP} = require('../constant/resCodeVariable')
const generateUuid = require('../utils/generateUuid')
const dayjs = require('dayjs')

const saveAdminUser = async ctx => {
    /**
     * 这里把数据库表里的字段都声明出来
     * 除了 uid create_time update_time
     *
     * 这些都是可以从前台接收来的参数
     *
     * 模式：$保存接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     */
    let {
        userName, userPassword, userProfile, nickName,userIntro,userProfession,
        roleId, gender, loginIpAddress, lastLoginTime,
        orderNum,userEmail
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')
    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$保存接口，参数校验参数接收$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    const {errorMsg, isValid} = saveAdminUserValidator(
        userName, userPassword
    )

    /**
     * 为一些参数设置默认值，根据数据表中的默认值设置
     *
     * 模式：$新增接口，未传递参数设置默认值$
     * 模式解析方式：提取出解析过的数据表中，有默认值的字段，替换为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    userName = userName ? userName : ''
    nickName = nickName ? nickName : ''
    userIntro = userIntro ? userIntro : ''
    userProfession = userProfession ? userProfession : ''
    roleId = roleId ? roleId : ''
    gender = gender ? gender : 1
    loginIpAddress = loginIpAddress ? loginIpAddress : ''
    lastLoginTime = lastLoginTime ? lastLoginTime : ''
    userEmail = userEmail ? userEmail : ''
    orderNum = orderNum ? orderNum : 0

    userPassword = await encryption(userPassword) // 对密码进行加密


    // 补充参数
    const uid = generateUuid()
    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    /**
     * 封装好处理过的参数
     *
     * 模式：$保存接口，封装处理过的参数$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰变量
     *
     */
    const params = {
        uid, userName, userPassword, userProfile,
        nickName,userIntro,userProfession, roleId, gender, loginIpAddress,
        lastLoginTime, orderNum, createTime, updateTime,userEmail
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        /**
         * 保存的时候需要校验 是否已经保存过
         * 定义默认根据数据库表中的第二个字段查询（第一个字段是Uid）
         *
         * 模式：$保存接口，根据第二个字段查询是否已经保存过$
         * 模式解析方式：提取出所有解析过的数据表字段，数组第二项的字段值，替换为为大驼峰格式字符串
         *
         */
        let result = await adminUserService.queryAdminUserByUserName(userName)

        if (result) { // 已存在，不保存
            /**
             * 获取错误码所属的模块
             *
             * 模式：$保存接口，获取已存在错误码模块$
             * 模式解析方式：从控制台中获得---通过正则解析出原文件resCodeVariable.js中的错误码模块名
             *  （每次创建新模块时候，如果需要，提前创建好所需的错误码），
             *    然后运行npm run add 执行创建代码脚本时，从控制台选择所涉及到的模块错误码，
             *  替换为常量格式字符串
             */
            ctx.fail(resCode.get(ADMIN.USER_NAME_ALREADY_EXISTS))

        } else {
            let flag = await adminUserService.saveAdminUser(params)
            if (flag) {
                ctx.success()
            }
        }
    }
}

/**
 * 删除接口传入的参数是一个uid的数组
 * 数据库设计的时候，所有的主键规定都为uid，由服务端自行生成，
 * （除非中间表，不需要维护主键，选择id自增，由数据库自己维护）
 */
const deleteAdminUserByUid = async ctx => {
    let uids = ctx.request.body
    console.log(uids, 'uids')
    const {errorMsg, isValid} = deleteAdminUserByUidValidator(ctx.request.body)

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await adminUserService.deleteAdminUserByUid(uids)
        if (result) {
            ctx.success()
        }
    }
}

const queryAdminUserPage = async ctx => {
    /**
     * 这里把数据库表里的字段都声明出来
     * 除了 uid create_time update_time
     *
     * 这些都是可以从前台接收来的参数
     *
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        userName, userPassword, nickName, roleId,
        gender, loginIpAddress, lastLoginTime, orderNum,userEmail
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')
    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$分页查询接口，参数校验参数接收$
     * 模式解析方式：只需校验 currentPage, pageSize
     *
     */
    const {errorMsg, isValid} = queryAdminUserPageValidator(currentPage, pageSize)

    /**
     * 模糊查询，如果前台没有传入，就设置为空字符串
     *
     * 模式：$分页查询接口，未传递参数设置空字符串$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值，且默认值不为null的字段，替换为小驼峰格式字符串
     *
     */
    userName = userName ? userName : ''
    userPassword = userPassword ? userPassword : ''
    nickName = nickName ? nickName : ''
    roleId = roleId ? roleId : ''
    gender = gender ? gender : '%'
    loginIpAddress = loginIpAddress ? loginIpAddress : ''
    lastLoginTime = lastLoginTime ? lastLoginTime : ''
    userEmail = userEmail ? userEmail : ''
    orderNum = orderNum ? orderNum : '%'


    /**
     * 封装好处理过的参数
     *
     * 模式：$分页查询接口，封装处理过的参数$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，
     *
     */
    let params = {
        currentPage: +currentPage,
        pageSize: +pageSize,
        userName, userPassword, nickName, roleId,
        gender, loginIpAddress, lastLoginTime, orderNum,userEmail
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await adminUserService.queryAdminUserPage(params)
        let {total} = await adminUserService.queryAllCountAdminUser(params)
        let newResult = {
            result,
            total,
            currentPage,
            pageSize,
        }
        ctx.success(newResult)
    }
}

const queryAdminUserByUid = async ctx => {

    let {uid} = ctx.params
    let result = await adminUserService.queryAdminUserByUid(uid)
    ctx.success(result)

}


const updateAdminUserByUid = async ctx => {
    /**
     * 这里把数据库表里的字段都声明出来
     * 除了 create_time update_time
     *
     * 这些都是可以从前台接收来的参数
     *
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 createTime,updateTime
     */

    let {
        uid, userName, userProfile,
        nickName, userIntro,userProfession,roleId, gender, loginIpAddress,
        lastLoginTime, orderNum,userEmail
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')

    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$更新接口，参数校验参数接收$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 createTime,updateTime
     *
     */
    const {errorMsg, isValid} = updateAdminUserByUidValidator(
        uid, userName
    )

    /**
     * 为一些参数设置默认值，根据数据表中的默认值设置
     *
     * 模式：$更新接口，未传递参数设置默认值$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值的字段，替换为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    userName = userName ? userName : ''
    nickName = nickName ? nickName : ''
    userIntro = userIntro ? userIntro : ''
    userProfession = userProfession ? userProfession : ''
    userEmail = userEmail ? userEmail : ''
    roleId = roleId ? roleId : ''
    gender = gender ? gender : 1
    loginIpAddress = loginIpAddress ? loginIpAddress : ''
    lastLoginTime = lastLoginTime ? lastLoginTime : ''
    orderNum = orderNum ? orderNum : 0


    // 补充参数
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    /**
     * 封装好处理过的参数
     *
     * 模式：$保存接口，封装处理过的参数$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰变量
     *
     */
    let params = {
        uid, userName, userProfile,
        nickName,userIntro, userProfession,roleId, gender, loginIpAddress,
        lastLoginTime, orderNum, updateTime,userEmail
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {

        // 补充参数
        let {create_time} = await adminUserService.queryAdminUserByUid(uid)
        params.createTime = create_time

        // 根据uid修改这条记录
        let result = await adminUserService.updateAdminUserByUid(params)
        if (result) {
            ctx.success()
        }
    }

}

const queryAdminUserAll = async ctx => {
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await adminUserService.queryAdminUserAll()
    ctx.success(result)
}

const adminLogin = async ctx => {
    let {username, password, isRememberMe} = ctx.request.body;
    let expiresIn = isRememberMe ? 3600 * 24 * 7 : expires // token默认过期时间

    // 参数校验
    const {errorMsg, isValid} = adminLoginValidator(username, password);

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        /*
            1、查找用户存不存在
                不存在，返回 用户名不存在
                存在，验证密码是否正确
                    正确，登录成功，返回token
                    不正确，返回  密码不正确
        */
        let result = await adminUserService.queryUserByUsername(username);
        if (!result) { // 用户名不存在
            ctx.fail(resCode.get(ADMIN.ADMIN_USER_DOES_NOT_EXIST))
        } else {
            // 验证密码是否正确
            let isCorrect = await compare(password, result.user_password)
            if (isCorrect) { // 密码正确
                let token = await adminUserService.generateToken(result, expiresIn,'adminUser')
                ctx.success(token)
            } else { // 密码错误
                ctx.fail(resCode.get(ADMIN.ADMIN_USER_PASSWORD_IS_INCORRECT))
            }
        }
    }
}

const adminResetPasswordByUid = async ctx => {
    let {uid} = ctx.request.body

    // 参数校验
    const {errorMsg, isValid} = adminResetPasswordByUidValidator(uid);

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {

        let password = await encryption(restPassword) // 对密码进行加密

        /*
        * 1、查找这个用户 看是否存在
        *   如果存在，重置密码
        *   如果不存在 返回用户名不存在
        * */

        let result = await adminUserService.queryAdminUserByUid(uid)
        if (result) { // 用户名存在，重置密码
            await adminUserService.adminResetPasswordByUid(password, uid)
            ctx.success()
        } else { // 用户名不存在
            ctx.fail(resCode.get(ADMIN.ADMIN_USER_DOES_NOT_EXIST))
        }
    }
}

const adminInfo = async ctx => {
    console.log(ctx.request.body, 'ctx.request.body')
    ctx.success(ctx.state.user)
}

module.exports = {
    saveAdminUser,
    deleteAdminUserByUid,
    updateAdminUserByUid,
    queryAdminUserPage,
    queryAdminUserAll,
    adminLogin,
    adminResetPasswordByUid,
    adminInfo,
    queryAdminUserByUid,
}
