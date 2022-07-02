const oauthService = require('../service/oauth')

const resCode = require('../constant/resCode')
const {APP} = require('../constant/resCodeVariable')

// gitee授权参考地址：https://www.eoway.cn/article/1603360705.html
/**
 * 1、后端获取 code
 * 2、使用 code 获取 access_token
 * 3、使用 access_token 获取用户信息
 */
const oauthGitee = async ctx => {
    // gitee获取到临时code会重订向到这个接口上，
    // 拿到code后继续请求gitee的接口拿到access_token，然后使用access_token得到用户gitee上的信息
    let code = ctx.query.code || null

    if (code) {
        console.log(code,'oauthGitee')
        await oauthService.oauthGitee(code).then(async res => {
            // 登录成功
            await ctx.render('oauthSuccess', {token: res.token})
        }).catch(err => {
            // 登录失败
            ctx.fail(resCode.get(APP.GITEE_OAUTH_FAIL), err.errMsg)
        })
    }
}
// qq授权参考：https://juejin.cn/post/6977399909532041247
// https://wiki.connect.qq.com/%e4%bd%bf%e7%94%a8authorization_code%e8%8e%b7%e5%8f%96access_token
/**
 * 1、后端获取 code
 * 2、使用 code 获取 access_token
 * 3、使用 access_token 获取openid
 * 3、使用 access_token openid 获取用户信息
 */
const oauthQQ = async ctx => {
    // qq获取到临时code会重订向到这个接口上，
    // 拿到code后继续请求qq的接口拿到access_token，然后使用access_token得到用户qq上的信息
    let code = ctx.query.code || null

    if (code) {
        console.log(code,'oauthGitee')
        await oauthService.oauthQQ(code).then(async res => {
            // 登录成功
            await ctx.render('oauthSuccess', {token: res.token})
        }).catch(err => {
            // 登录失败
            ctx.fail(resCode.get(APP.QQ_OAUTH_FAIL), err.errMsg)
        })
    }
}
// todo 微博点击确认登录时的回调逻辑
const oauthWeiboConfirm = async ctx => {
    // qq获取到临时code会重订向到这个接口上，
    // 拿到code后继续请求qq的接口拿到access_token，然后使用access_token得到用户qq上的信息
    let code = ctx.query.code || null

    if (code) {
        console.log(code,'oauthWeiboConfirm')
        await oauthService.oauthWeiboConfirm(code).then(async res => {
            // 登录成功
            await ctx.render('oauthSuccess', {token: res.token})
        }).catch(err => {
            // 登录失败
            ctx.fail(resCode.get(APP.Microblog_OAUTH_FAIL), err.errMsg)
        })
    }
}

// todo 微博点击取消登录时的回调逻辑
const oauthWeiboCancel = async ctx => {
    ctx.success()
}




module.exports = {
    oauthGitee,
    oauthQQ,
    oauthWeiboConfirm,
    oauthWeiboCancel,
}
