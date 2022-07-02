const Router = require('koa-router') // 引入路由
const commentReactionRouter = new Router()

const commentReactionController = require('../controller/commentReaction')

commentReactionRouter.post('/saveCommentReaction', commentReactionController.saveCommentReaction )
commentReactionRouter.post('/deleteCommentReactionByUid', commentReactionController.deleteCommentReactionByUid )
commentReactionRouter.post('/queryCommentReactionPage', commentReactionController.queryCommentReactionPage )
commentReactionRouter.post('/queryCommentReactionAll', commentReactionController.queryCommentReactionAll )
commentReactionRouter.post('/updateCommentReactionByUid', commentReactionController.updateCommentReactionByUid )


module.exports = commentReactionRouter
