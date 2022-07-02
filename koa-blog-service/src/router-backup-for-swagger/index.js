const Router = require('koa-router') // 引入路由
const router = new Router()
const userRouter = require('./user')
const articleRouter = require('./article')
const testRouter = require('./test')
/**
 * @openapi
 * tags:
 *   - name: user
 *     description: 用户模块
 *   - name: article
 *     description: 文章模块
 *   - name: test
 *     description: 测试模块
 */
router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/article', articleRouter.routes(), articleRouter.allowedMethods())
router.use('/test', testRouter.routes(), testRouter.allowedMethods())


/**
 * @openapi
 * /:
 *   get:
 *     tags: ['test']
 *     summary: hello koa2
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: hello koa2
 *
 */
router.get('/', async ctx => {
    // ctx.throw('出错啦，哈哈哈哈')
    ctx.body = {
        msg: 'hello koa2',
    }
})

module.exports = router // 导出router给app.js使用
