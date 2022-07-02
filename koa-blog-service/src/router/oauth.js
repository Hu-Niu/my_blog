const Router = require('koa-router') // 引入路由
const oauthRouter = new Router()

const oauthController = require('../controller/oauth')

oauthRouter.get('/callback/gitee', oauthController.oauthGitee)
oauthRouter.get('/callback/qq', oauthController.oauthQQ)
// 微博点击确认时的回调
oauthRouter.get('/callback/weiboConfirm', oauthController.oauthWeiboConfirm)
// 微博点击取消时的回调
oauthRouter.get('/callback/weiboCancel', oauthController.oauthWeiboCancel)

module.exports = oauthRouter
