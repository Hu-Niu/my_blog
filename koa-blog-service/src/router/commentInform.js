const Router = require('koa-router') // 引入路由
const commentInformRouter = new Router()

const commentInformController = require('../controller/commentInform')

commentInformRouter.post('/saveCommentInform', commentInformController.saveCommentInform )
commentInformRouter.post('/deleteCommentInformByUid', commentInformController.deleteCommentInformByUid )
commentInformRouter.post('/queryCommentInformPage', commentInformController.queryCommentInformPage )
commentInformRouter.post('/queryCommentInformAll', commentInformController.queryCommentInformAll )
commentInformRouter.post('/updateCommentInformByUid', commentInformController.updateCommentInformByUid )


module.exports = commentInformRouter
