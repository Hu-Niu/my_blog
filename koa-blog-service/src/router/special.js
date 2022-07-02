const Router = require('koa-router') // 引入路由
const specialRouter = new Router()

const specialController = require('../controller/special')

specialRouter.post('/saveSpecial', specialController.saveSpecial )
specialRouter.post('/deleteSpecialByUid', specialController.deleteSpecialByUid )
specialRouter.post('/querySpecialPage', specialController.querySpecialPage )
specialRouter.post('/querySpecialAll', specialController.querySpecialAll )
specialRouter.post('/updateSpecialByUid', specialController.updateSpecialByUid )


module.exports = specialRouter
