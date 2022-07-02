const Router = require('koa-router') // 引入路由
const articleRouter = new Router()
const passport = require('koa-passport')

const articleSortController = require('../controller/articleSort')

articleRouter.post('/saveArticleSort', articleSortController.saveArticleSort )
articleRouter.post('/deleteArticleSortByUid', articleSortController.deleteArticleSortByUid )
articleRouter.post('/queryArticleSortPage', articleSortController.queryArticleSortPage )
articleRouter.post('/queryArticleSortAll', articleSortController.queryArticleSortAll )

articleRouter.post('/queryArticleSortAll2', articleSortController.queryArticleSortAll2 )


articleRouter.post('/updateArticleSortByUid', articleSortController.updateArticleSortByUid )


module.exports = articleRouter
