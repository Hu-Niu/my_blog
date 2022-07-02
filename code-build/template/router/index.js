const Router = require('koa-router') // 引入路由
const router = new Router()

const userRouter = require('./user')
const articleSortRouter = require('./articleSort')
const articleTagRouter = require('./articleTag')

router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/articleSort', articleSortRouter.routes(), articleSortRouter.allowedMethods())
router.use('/articleTag', articleTagRouter.routes(), articleTagRouter.allowedMethods())

module.exports = router
