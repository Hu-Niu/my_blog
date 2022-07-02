const Router = require('koa-router') // 引入路由
const router = new Router()

const userRouter = require('./user')
const articleSortRouter = require('./articleSort')
const articleTagRouter = require('./articleTag')
const fileRouter = require('./file')
const fileSortRouter = require('./fileSort')
const articleRouter = require('./article')
const articleRecommendRouter = require('./articleRecommend')

const oauthRouter = require('./oauth')


router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/articleSort', articleSortRouter.routes(), articleSortRouter.allowedMethods())
router.use('/articleTag', articleTagRouter.routes(), articleTagRouter.allowedMethods())
router.use('/file', fileRouter.routes(), fileRouter.allowedMethods())
router.use('/fileSort', fileSortRouter.routes(), fileSortRouter.allowedMethods())
router.use('/article', articleRouter.routes(), articleRouter.allowedMethods())
router.use('/articleRecommend', articleRecommendRouter.routes(), articleRecommendRouter.allowedMethods())
router.use('/oauth', oauthRouter.routes(), oauthRouter.allowedMethods())


router.get('/', async ctx => {
    // ctx.throw('出错啦，哈哈哈哈')
    // ctx.throw(419,'出错啦，哈哈哈哈',{name:"cheny不犯错"})
    ctx.body = {
        msg: 'hello koa2',
    }
})

const specialSortRouter = require('./specialSort')
router.use('/specialSort', specialSortRouter.routes(), specialSortRouter.allowedMethods())
const specialRouter = require('./special')
router.use('/special', specialRouter.routes(), specialRouter.allowedMethods())
const specialPartRouter = require('./specialPart')
router.use('/specialPart', specialPartRouter.routes(), specialPartRouter.allowedMethods())
const specialPartSectionRouter = require('./specialPartSection')
router.use('/specialPartSection', specialPartSectionRouter.routes(), specialPartSectionRouter.allowedMethods())
const specialPartSectionBlogRouter = require('./specialPartSectionBlog')
router.use('/specialPartSectionBlog', specialPartSectionBlogRouter.routes(), specialPartSectionBlogRouter.allowedMethods())
const contactWayRouter = require('./contactWay')
router.use('/contactWay', contactWayRouter.routes(), contactWayRouter.allowedMethods())
const friendLinkRouter = require('./friendLink')
router.use('/friendLink', friendLinkRouter.routes(), friendLinkRouter.allowedMethods())
const adminRoleRouter = require('./adminRole')
router.use('/adminRole', adminRoleRouter.routes(), adminRoleRouter.allowedMethods())
const adminUserRouter = require('./adminUser')
router.use('/adminUser', adminUserRouter.routes(), adminUserRouter.allowedMethods())
const aboutMeRouter = require('./aboutMe')
router.use('/aboutMe', aboutMeRouter.routes(), aboutMeRouter.allowedMethods())
const webUserRouter = require('./webUser')
router.use('/webUser', webUserRouter.routes(), webUserRouter.allowedMethods())
const commentRouter = require('./comment')
router.use('/comment', commentRouter.routes(), commentRouter.allowedMethods())
const commentReactionRouter = require('./commentReaction')
router.use('/commentReaction', commentReactionRouter.routes(), commentReactionRouter.allowedMethods())
const commentInformRouter = require('./commentInform')
router.use('/commentInform', commentInformRouter.routes(), commentInformRouter.allowedMethods())
const blogLikeRouter = require('./blogLike')
router.use('/blogLike', blogLikeRouter.routes(), blogLikeRouter.allowedMethods())
module.exports = router // 导出router给app.js使用
