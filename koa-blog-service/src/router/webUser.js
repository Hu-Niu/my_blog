const Router = require('koa-router') // 引入路由
const webUserRouter = new Router()
const passport = require('koa-passport')

const webUserController = require('../controller/webUser')

webUserRouter.post('/saveWebUser', webUserController.saveWebUser )
webUserRouter.post('/deleteWebUserByUid', webUserController.deleteWebUserByUid )
webUserRouter.post('/queryWebUserPage', webUserController.queryWebUserPage )
webUserRouter.post('/queryWebUser', webUserController.queryWebUser )
webUserRouter.post('/queryWebUserAll', webUserController.queryWebUserAll )
webUserRouter.post('/updateWebUserByUid', webUserController.updateWebUserByUid )

webUserRouter.post('/webUserInfo', passport.authenticate('jwt', {session: false}), webUserController.webUserInfo )


module.exports = webUserRouter
