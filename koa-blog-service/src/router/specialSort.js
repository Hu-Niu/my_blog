const Router = require('koa-router') // 引入路由
const specialSortRouter = new Router()

const specialSortController = require('../controller/specialSort')

specialSortRouter.post('/saveSpecialSort', specialSortController.saveSpecialSort )
specialSortRouter.post('/deleteSpecialSortByUid', specialSortController.deleteSpecialSortByUid )
specialSortRouter.post('/querySpecialSortPage', specialSortController.querySpecialSortPage )
specialSortRouter.post('/querySpecialSortAll', specialSortController.querySpecialSortAll )
specialSortRouter.post('/updateSpecialSortByUid', specialSortController.updateSpecialSortByUid )


module.exports = specialSortRouter
