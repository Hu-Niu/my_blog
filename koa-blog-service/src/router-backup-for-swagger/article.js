const Router = require('koa-router') // 引入路由
const articleRouter = new Router()
const passport = require('koa-passport')

const articleController = require('../controller/articleSort')


articleRouter.post('/saveArticle', articleController.saveArticle )

/**
 * @openapi
 * /article/saveArticleSort:
 *   post:
 *     tags: ['article']
 *     summary: 新增文章分类
 *     description: 新增文章分类
 *     requestBody:
 *       description: 新增分类时所需的字段信息
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleSort'
 *       required: true
 *     responses:
 *       200:
 *         description: 调用成功
 *         content: {}
 *
 */
articleRouter.post('/saveArticleSort', articleController.saveArticleSort )


module.exports = articleRouter
