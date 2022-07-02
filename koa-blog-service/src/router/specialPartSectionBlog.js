const Router = require('koa-router') // 引入路由
const specialPartSectionBlogRouter = new Router()

const specialPartSectionBlogController = require('../controller/specialPartSectionBlog')

specialPartSectionBlogRouter.post('/saveSpecialPartSectionBlog', specialPartSectionBlogController.saveSpecialPartSectionBlog )
specialPartSectionBlogRouter.post('/deleteSpecialPartSectionBlogByUid', specialPartSectionBlogController.deleteSpecialPartSectionBlogByUid )
specialPartSectionBlogRouter.post('/querySpecialPartSectionBlogPage', specialPartSectionBlogController.querySpecialPartSectionBlogPage )
specialPartSectionBlogRouter.post('/querySpecialPartSectionBlogAll', specialPartSectionBlogController.querySpecialPartSectionBlogAll )
specialPartSectionBlogRouter.post('/updateSpecialPartSectionBlogByUid', specialPartSectionBlogController.updateSpecialPartSectionBlogByUid )


module.exports = specialPartSectionBlogRouter
