const Router = require('koa-router') // 引入路由
const blogLikeRouter = new Router()

const blogLikeController = require('../controller/blogLike')

blogLikeRouter.post('/saveBlogLike', blogLikeController.saveBlogLike )
blogLikeRouter.post('/deleteBlogLikeByUid', blogLikeController.deleteBlogLikeByUid )
blogLikeRouter.post('/queryBlogLikePage', blogLikeController.queryBlogLikePage )
blogLikeRouter.post('/queryBlogLikeAll', blogLikeController.queryBlogLikeAll )

// 条件查询
blogLikeRouter.post('/queryBlogLikeAll2', blogLikeController.queryBlogLikeAll2 )
blogLikeRouter.post('/updateBlogLikeByUid', blogLikeController.updateBlogLikeByUid )


module.exports = blogLikeRouter
