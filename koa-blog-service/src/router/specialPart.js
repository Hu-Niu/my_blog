const Router = require('koa-router') // 引入路由
const specialPartRouter = new Router()

const specialPartController = require('../controller/specialPart')

specialPartRouter.post('/saveSpecialPart', specialPartController.saveSpecialPart )
specialPartRouter.post('/deleteSpecialPartByUid', specialPartController.deleteSpecialPartByUid )
specialPartRouter.post('/querySpecialPartPage', specialPartController.querySpecialPartPage )
specialPartRouter.post('/querySpecialPartAll', specialPartController.querySpecialPartAll )
specialPartRouter.post('/updateSpecialPartByUid', specialPartController.updateSpecialPartByUid )


module.exports = specialPartRouter
