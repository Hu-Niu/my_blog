const Router = require('koa-router') // 引入路由
const articleRecommendRouter = new Router()

const articleRecommendController = require('../controller/articleRecommend')


articleRecommendRouter.post('/updateArticleRecommendByUid', articleRecommendController.updateArticleRecommendByUid )


module.exports = articleRecommendRouter
