const Router = require('koa-router') // 引入路由
const articleTagRouter = new Router()

const articleTagController = require('../controller/articleTag')

articleTagRouter.post('/saveArticleTag', articleTagController.saveArticleTag)
articleTagRouter.post('/deleteArticleTagByUid', articleTagController.deleteArticleTagByUid)
articleTagRouter.post('/queryArticleTagPage', articleTagController.queryArticleTagPage)
articleTagRouter.post('/queryArticleTagAll', articleTagController.queryArticleTagAll)

// 获取标签列表，带文章总数
articleTagRouter.post('/queryArticleTagAll2', articleTagController.queryArticleTagAll2)
articleTagRouter.post('/updateArticleTagByUid', articleTagController.updateArticleTagByUid)

articleTagRouter.post('/queryHotArticleTagPage', articleTagController.queryHotArticleTagPage)


module.exports = articleTagRouter
