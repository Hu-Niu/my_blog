const Router = require('koa-router') // 引入路由
const fileSortRouter = new Router()

const fileSortController = require('../controller/fileSort')

fileSortRouter.post('/saveFileSort', fileSortController.saveFileSort)
fileSortRouter.post('/deleteFileSortByUid', fileSortController.deleteFileSortByUid)
fileSortRouter.post('/queryFileSortPage', fileSortController.queryFileSortPage)
fileSortRouter.post('/updateFileSortByUid', fileSortController.updateFileSortByUid)


module.exports = fileSortRouter
