const webUserService = require('../service/webUser')
const {
    saveWebUserValidator,
    deleteWebUserByUidValidator,
    updateWebUserByUidValidator,
    queryWebUserPageValidator,
} = require('../validation/webUser')
const resCode = require('../constant/resCode')
/**
 * 获取错误码所属的模块
 *
 * 模式：$保存接口，获取已存在错误码模块$
 * 模式解析方式：从控制台中获得---通过正则解析出原文件resCodeVariable.js中的错误码模块名
 *  （每次创建新模块时候，如果需要，提前创建好所需的错误码），
 *    然后运行npm run add 执行创建代码脚本时，从控制台选择所涉及到的模块错误码，
 *  替换为常量格式字符串
 */
const {WEB_USER ,APP} = require('../constant/resCodeVariable')
const generateUuid = require('../utils/generateUuid')
const dayjs = require('dayjs')

const saveWebUser = async ctx => {
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
        userTel, userProfile,userWechat, userMicroblog, userGitee,
        userGithub, userQq, userEmail, userPassword,
        nickName, userPosition, userCompany, userWebsite,
        userIntro, gender, userIdentity,loginIpAddress, lastLoginTime,
        accountStatus, dataAuditStatus, accountSource, orderNum,
        // internalCalls 特殊的参数，只需要后台调用时传递，为了区别一下，仅仅保存数据，不是为了返回给前台结果
        internalCalls
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')
    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$保存接口，参数校验参数接收$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    const {errorMsg, isValid} = saveWebUserValidator(
        accountSource
    )

    /**
     * 为一些参数设置默认值，根据数据表中的默认值设置
     *
     * 模式：$新增接口，未传递参数设置默认值$
     * 模式解析方式：提取出解析过的数据表中，有默认值的字段，替换为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    userTel = userTel ? userTel : ''
    userProfile = userProfile ? userProfile : ''
    userWechat = userWechat ? userWechat : ''
    userMicroblog = userMicroblog ? userMicroblog : ''
    userGitee = userGitee ? userGitee : ''
    userGithub = userGithub ? userGithub : ''
    userQq = userQq ? userQq : ''
    userEmail = userEmail ? userEmail : ''
    userPassword = userPassword ? userPassword : ''
    nickName = nickName ? nickName : ''
    userPosition = userPosition ? userPosition : ''
    userCompany = userCompany ? userCompany : ''
    userWebsite = userWebsite ? userWebsite : ''
    userIntro = userIntro ? userIntro : ''
    gender = gender ? gender : 1
    userIdentity = userIdentity ? userIdentity : 1
    loginIpAddress = loginIpAddress ? loginIpAddress : ''
    lastLoginTime = lastLoginTime ? lastLoginTime : ''
    accountStatus = accountStatus ? accountStatus : 1
    dataAuditStatus = dataAuditStatus ? dataAuditStatus : 1
    accountSource = accountSource ? accountSource : ''
    orderNum = orderNum ? orderNum : 0


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
        uid, userTel,userProfile, userWechat, userMicroblog,
        userGitee, userGithub, userQq, userEmail,
        userPassword, nickName, userPosition, userCompany,
        userWebsite, userIntro, gender, userIdentity,loginIpAddress,
        lastLoginTime, accountStatus, dataAuditStatus, accountSource,
        orderNum, createTime, updateTime
    }
    if(internalCalls){ // 内部服务器调用，不用返回给前台数据，只是为了保存数据
        return await webUserService.saveWebUser(params)
    }else { // 正常接口访问
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
            let result = await webUserService.queryWebUserByUserTel(userTel)

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
                ctx.fail(resCode.get(WEB_USER.WEB_USER_TEL_ALREADY_EXISTS))

            } else {
                let flag = await webUserService.saveWebUser(params)
                if (flag) {
                    ctx.success()
                }
            }
        }
    }


}

/**
 * 删除接口传入的参数是一个uid的数组
 * 数据库设计的时候，所有的主键规定都为uid，由服务端自行生成，
 * （除非中间表，不需要维护主键，选择id自增，由数据库自己维护）
 */
const deleteWebUserByUid = async ctx => {
    let uids = ctx.request.body
    console.log(uids, 'uids')
    const {errorMsg, isValid} = deleteWebUserByUidValidator(ctx.request.body)

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await webUserService.deleteWebUserByUid(uids)
        if (result) {
            ctx.success()
        }
    }
}

const queryWebUserPage = async ctx => {
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
        userTel, userProfile,userWechat, userMicroblog, userGitee,
        userGithub, userQq, userEmail, userPassword,
        nickName, userPosition, userCompany, userWebsite,
        userIntro, gender, userIdentity,loginIpAddress, lastLoginTime,
        accountStatus, dataAuditStatus, accountSource, orderNum
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')
    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$分页查询接口，参数校验参数接收$
     * 模式解析方式：只需校验 currentPage, pageSize
     *
     */
    const {errorMsg, isValid} = queryWebUserPageValidator(currentPage, pageSize)

    /**
     * 模糊查询，如果前台没有传入，就设置为空字符串
     *
     * 模式：$分页查询接口，未传递参数设置空字符串$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值，且默认值不为null的字段，替换为小驼峰格式字符串
     *
     */
    userTel = userTel ? userTel : ''
    userProfile = userProfile ? userProfile : ''
    userWechat = userWechat ? userWechat : ''
    userMicroblog = userMicroblog ? userMicroblog : ''
    userGitee = userGitee ? userGitee : ''
    userGithub = userGithub ? userGithub : ''
    userQq = userQq ? userQq : ''
    userEmail = userEmail ? userEmail : ''
    userPassword = userPassword ? userPassword : ''
    nickName = nickName ? nickName : ''
    userPosition = userPosition ? userPosition : ''
    userCompany = userCompany ? userCompany : ''
    userWebsite = userWebsite ? userWebsite : ''
    userIntro = userIntro ? userIntro : ''
    gender = gender ? gender : '%'
    userIdentity = userIdentity ? userIdentity : '%'
    loginIpAddress = loginIpAddress ? loginIpAddress : ''
    lastLoginTime = lastLoginTime ? lastLoginTime : ''
    accountStatus = accountStatus ? accountStatus : '%'
    dataAuditStatus = dataAuditStatus ? dataAuditStatus : '%'
    accountSource = accountSource ? accountSource : ''
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
        userTel, userProfile,userWechat, userMicroblog, userGitee,
        userGithub, userQq, userEmail, userPassword,
        nickName, userPosition, userCompany, userWebsite,
        userIntro, gender, userIdentity,loginIpAddress, lastLoginTime,
        accountStatus, dataAuditStatus, accountSource, orderNum
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {
        let result = await webUserService.queryWebUserPage(params)
        let {total} = await webUserService.queryAllCountWebUser(params)
        let newResult = {
            result,
            total,
            currentPage,
            pageSize,
        }
        ctx.success(newResult)
    }
}

const queryWebUser = async ctx => {
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
        userTel, userProfile,userWechat, userMicroblog, userGitee,
        userGithub, userQq, userEmail, userPassword,
        nickName, userPosition, userCompany, userWebsite,
        userIntro, gender, userIdentity,loginIpAddress, lastLoginTime,
        accountStatus, dataAuditStatus, accountSource, orderNum,

        // internalCalls 特殊的参数，只需要后台调用时传递，为了区别一下，仅仅保存数据，不是为了返回给前台结果
        internalCalls

    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')


    /**
     * 模糊查询，如果前台没有传入，就设置为空字符串
     *
     * 模式：$分页查询接口，未传递参数设置空字符串$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值，且默认值不为null的字段，替换为小驼峰格式字符串
     *
     */
    userTel = userTel ? userTel : ''
    userProfile = userProfile ? userProfile : ''
    userWechat = userWechat ? userWechat : ''
    userMicroblog = userMicroblog ? userMicroblog : ''
    userGitee = userGitee ? userGitee : ''
    userGithub = userGithub ? userGithub : ''
    userQq = userQq ? userQq : ''
    userEmail = userEmail ? userEmail : ''
    userPassword = userPassword ? userPassword : ''
    nickName = nickName ? nickName : ''
    userPosition = userPosition ? userPosition : ''
    userCompany = userCompany ? userCompany : ''
    userWebsite = userWebsite ? userWebsite : ''
    userIntro = userIntro ? userIntro : ''
    gender = gender ? gender : '%'
    userIdentity = userIdentity ? userIdentity : '%'
    loginIpAddress = loginIpAddress ? loginIpAddress : ''
    lastLoginTime = lastLoginTime ? lastLoginTime : ''
    accountStatus = accountStatus ? accountStatus : '%'
    dataAuditStatus = dataAuditStatus ? dataAuditStatus : '%'
    accountSource = accountSource ? accountSource : ''
    orderNum = orderNum ? orderNum : '%'


    /**
     * 封装好处理过的参数
     *
     * 模式：$分页查询接口，封装处理过的参数$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，
     *
     */
    let params = {
        userTel,userProfile, userWechat, userMicroblog, userGitee,
        userGithub, userQq, userEmail, userPassword,
        nickName, userPosition, userCompany, userWebsite,
        userIntro, gender, userIdentity,loginIpAddress, lastLoginTime,
        accountStatus, dataAuditStatus, accountSource, orderNum
    }

    let result = await webUserService.queryWebUser(params)

    if(internalCalls){ // 内部调用，返回结果
        return result
    }else { // 正常接口调用
        ctx.success(result)
    }
}

const updateWebUserByUid = async ctx => {
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
        uid, userTel, userProfile,userWechat, userMicroblog,
        userGitee, userGithub, userQq, userEmail,
        userPassword, nickName, userPosition, userCompany,
        userWebsite, userIntro, gender, userIdentity,loginIpAddress,
        lastLoginTime, accountStatus, dataAuditStatus, accountSource,
        orderNum
    } = ctx.request.body

    console.log(ctx.request.body, 'ctx.request.body')

    /**
     * 这里把需要校验的参数传递进去
     *
     * 模式：$更新接口，参数校验参数接收$
     * 模式解析方式：提取出解析过的数据表，属性为必填的字段，替换为为小驼峰格式字符串，排除 createTime,updateTime
     *
     */
    const {errorMsg, isValid} = updateWebUserByUidValidator(
        uid, accountSource
    )

    /**
     * 为一些参数设置默认值，根据数据表中的默认值设置
     *
     * 模式：$更新接口，未传递参数设置默认值$
     * 模式解析方式：提取出所有解析过的数据表字段，有默认值的字段，替换为小驼峰格式字符串，排除 uid,createTime,updateTime
     *
     */
    userTel = userTel ? userTel : ''
    userProfile = userProfile ? userProfile : ''
    userWechat = userWechat ? userWechat : ''
    userMicroblog = userMicroblog ? userMicroblog : ''
    userGitee = userGitee ? userGitee : ''
    userGithub = userGithub ? userGithub : ''
    userQq = userQq ? userQq : ''
    userEmail = userEmail ? userEmail : ''
    userPassword = userPassword ? userPassword : ''
    nickName = nickName ? nickName : ''
    userPosition = userPosition ? userPosition : ''
    userCompany = userCompany ? userCompany : ''
    userWebsite = userWebsite ? userWebsite : ''
    userIntro = userIntro ? userIntro : ''
    gender = gender ? gender : 1
    userIdentity = userIdentity ? userIdentity : 1
    loginIpAddress = loginIpAddress ? loginIpAddress : ''
    lastLoginTime = lastLoginTime ? lastLoginTime : ''
    accountStatus = accountStatus ? accountStatus : 1
    dataAuditStatus = dataAuditStatus ? dataAuditStatus : 1
    accountSource = accountSource ? accountSource : ''
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
        uid, userTel,userProfile, userWechat, userMicroblog,
        userGitee, userGithub, userQq, userEmail,
        userPassword, nickName, userPosition, userCompany,
        userWebsite, userIntro, gender, userIdentity,loginIpAddress,
        lastLoginTime, accountStatus, dataAuditStatus, accountSource,
        orderNum, updateTime
    }

    if (!isValid) { // 校验不通过
        ctx.fail(resCode.get(APP.PARAMETER_INVALID), errorMsg)
    } else {

        // 补充参数
        let {create_time} = await webUserService.queryWebUserByUid(uid)
        params.createTime = create_time

        // 根据uid修改这条记录
        let result = await webUserService.updateWebUserByUid(params)
        if (result) {
            ctx.success()
        }
    }

}


const queryWebUserAll = async ctx => {
    console.log(ctx.request.body, 'ctx.request.body')
    let result = await webUserService.queryWebUserAll()
    ctx.success(result)
}

const webUserInfo = async ctx => {
    console.log(ctx.request.body, 'ctx.request.body')
    ctx.success(ctx.state.user)
}


module.exports = {
    saveWebUser,
    deleteWebUserByUid,
    updateWebUserByUid,
    queryWebUserPage,
    queryWebUserAll,
    queryWebUser,
    webUserInfo,
}
