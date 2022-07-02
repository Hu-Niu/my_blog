const Router = require('koa-router') // 引入路由
const adminRoleRouter = new Router()

const adminRoleController = require('../controller/adminRole')

adminRoleRouter.post('/saveAdminRole', adminRoleController.saveAdminRole )
adminRoleRouter.post('/deleteAdminRoleByUid', adminRoleController.deleteAdminRoleByUid )
adminRoleRouter.post('/queryAdminRolePage', adminRoleController.queryAdminRolePage )
adminRoleRouter.post('/queryAdminRoleAll', adminRoleController.queryAdminRoleAll )
adminRoleRouter.post('/updateAdminRoleByUid', adminRoleController.updateAdminRoleByUid )


module.exports = adminRoleRouter
