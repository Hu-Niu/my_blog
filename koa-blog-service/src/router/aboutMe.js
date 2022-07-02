const Router = require('koa-router') // 引入路由
const aboutMeRouter = new Router()

const aboutMeController = require('../controller/aboutMe')

aboutMeRouter.post('/saveAboutMe', aboutMeController.saveAboutMe )
aboutMeRouter.post('/deleteAboutMeByUid', aboutMeController.deleteAboutMeByUid )
aboutMeRouter.post('/queryAboutMePage', aboutMeController.queryAboutMePage )
aboutMeRouter.post('/queryAboutMeByAdminUserId', aboutMeController.queryAboutMeByAdminUserId )
aboutMeRouter.post('/queryAboutMeAll', aboutMeController.queryAboutMeAll )
aboutMeRouter.post('/updateAboutMeByUid', aboutMeController.updateAboutMeByUid )


module.exports = aboutMeRouter
