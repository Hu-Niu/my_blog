const Router = require('koa-router') // 引入路由
const fileRouter = new Router()

const fileController = require('../controller/file')

fileRouter.post('/uploadFile', fileController.uploadFile )
fileRouter.post('/queryAllFileSort', fileController.queryAllFileSort )
fileRouter.post('/queryAllFilePage', fileController.queryAllFilePage )
fileRouter.post('/deleteFileByUid', fileController.deleteFileByUid )
fileRouter.post('/updateFileSortByUid', fileController.updateFileSortByUid )

fileRouter.post('/queryAllFile', fileController.queryAllFile )


module.exports = fileRouter
