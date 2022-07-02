const Router = require('koa-router') // 引入路由
const articleRouter = new Router()
const passport = require('koa-passport')

const articleController = require('../controller/article')

articleRouter.post('/saveArticle', passport.authenticate('jwt', {session: false}), articleController.saveArticle)
articleRouter.post('/deleteArticleByUid', articleController.deleteArticleByUid)
articleRouter.post('/queryArticlePage', articleController.queryArticlePage)
articleRouter.get('/queryArticleByRecommendLevel', articleController.queryArticleByRecommendLevel)
articleRouter.post('/updateArticleByUid', articleController.updateArticleByUid)
articleRouter.post('/importArticle', passport.authenticate('jwt', {session: false}), articleController.importArticle)
articleRouter.post('/exportArticle', articleController.exportArticle)

articleRouter.post('/queryArticleAll', articleController.queryArticleAll)


articleRouter.get('/queryRecommendArticleByRecommendLevel/:levelId', articleController.queryRecommendArticleByRecommendLevel)
articleRouter.post('/queryHotArticlePage', articleController.queryHotArticlePage)

// 条件查询
articleRouter.post('/queryArticleAll2', articleController.queryArticleAll2)
// 根据uid查询文章
articleRouter.get('/queryArticleByUid/:uid', articleController.queryArticleByUid)

// 查询文章创建时间列表
articleRouter.get('/queryAllArticleCreateTimeList', articleController.queryAllArticleCreateTimeList)


module.exports = articleRouter
