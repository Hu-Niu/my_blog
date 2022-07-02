const Router = require('koa-router') // 引入路由
const contactWayRouter = new Router()

const contactWayController = require('../controller/contactWay')

contactWayRouter.post('/saveContactWay', contactWayController.saveContactWay )
contactWayRouter.post('/deleteContactWayByUid', contactWayController.deleteContactWayByUid )
contactWayRouter.post('/queryContactWayPage', contactWayController.queryContactWayPage )
contactWayRouter.post('/queryContactWayAll', contactWayController.queryContactWayAll )
contactWayRouter.post('/updateContactWayByUid', contactWayController.updateContactWayByUid )


module.exports = contactWayRouter
