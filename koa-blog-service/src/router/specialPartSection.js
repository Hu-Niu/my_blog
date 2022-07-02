const Router = require('koa-router') // 引入路由
const specialPartSectionRouter = new Router()

const specialPartSectionController = require('../controller/specialPartSection')

specialPartSectionRouter.post('/saveSpecialPartSection', specialPartSectionController.saveSpecialPartSection )
specialPartSectionRouter.post('/deleteSpecialPartSectionByUid', specialPartSectionController.deleteSpecialPartSectionByUid )
specialPartSectionRouter.post('/querySpecialPartSectionPage', specialPartSectionController.querySpecialPartSectionPage )
specialPartSectionRouter.post('/querySpecialPartSectionAll', specialPartSectionController.querySpecialPartSectionAll )
specialPartSectionRouter.post('/updateSpecialPartSectionByUid', specialPartSectionController.updateSpecialPartSectionByUid )

// 四级树-不带文章列表 第一级是 specialSort  specialSort -> special -> specialPart -> specialSection
specialPartSectionRouter.get('/querySpecialPartSectionTree', specialPartSectionController.querySpecialPartSectionTree )

// 五级树 specialSort -> special -> specialPart -> specialSection -> specialSectionBlog
specialPartSectionRouter.get('/querySpecialPartSectionTree2', specialPartSectionController.querySpecialPartSectionTree2 )

// 四级树- 带文章列表 第一级是 special  special -> specialPart -> specialSection -> specialSectionBlog
specialPartSectionRouter.get('/querySpecialPartSectionBlogTreeBySpecialUid/:uid', specialPartSectionController.querySpecialPartSectionBlogTreeBySpecialUid )


module.exports = specialPartSectionRouter
