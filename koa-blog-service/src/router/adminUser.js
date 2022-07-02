const Router = require('koa-router') // 引入路由
const adminUserRouter = new Router()
const passport = require('koa-passport')

const adminUserController = require('../controller/adminUser')

adminUserRouter.post('/saveAdminUser', adminUserController.saveAdminUser )
adminUserRouter.post('/deleteAdminUserByUid', adminUserController.deleteAdminUserByUid )
adminUserRouter.post('/queryAdminUserPage',adminUserController.queryAdminUserPage )
adminUserRouter.post('/queryAdminUserAll', adminUserController.queryAdminUserAll )
adminUserRouter.post('/updateAdminUserByUid', adminUserController.updateAdminUserByUid )

adminUserRouter.post('/adminLogin', adminUserController.adminLogin )
adminUserRouter.post('/adminResetPasswordByUid', adminUserController.adminResetPasswordByUid )
adminUserRouter.post('/adminInfo', passport.authenticate('jwt', {session: false}), adminUserController.adminInfo )


adminUserRouter.get('/queryAdminUserByUid/:uid', adminUserController.queryAdminUserByUid )



module.exports = adminUserRouter
