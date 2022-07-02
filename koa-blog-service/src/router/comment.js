const Router = require('koa-router') // 引入路由
const commentRouter = new Router()

const commentController = require('../controller/comment')

commentRouter.post('/saveComment', commentController.saveComment )
commentRouter.post('/deleteCommentByUid', commentController.deleteCommentByUid )
commentRouter.post('/passOrRejectCommentByUid/:commentStatus', commentController.passOrRejectCommentByUid )
// 管理员用的接口
commentRouter.post('/queryCommentPage', commentController.queryCommentPage )
commentRouter.post('/queryCommentAll', commentController.queryCommentAll )
commentRouter.post('/updateCommentByUid', commentController.updateCommentByUid )

// 前台用，查出所有评论，然后前台分页
commentRouter.post('/queryComment', commentController.queryComment )


module.exports = commentRouter
