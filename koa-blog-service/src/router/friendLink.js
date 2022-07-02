const Router = require('koa-router') // 引入路由
const friendLinkRouter = new Router()

const friendLinkController = require('../controller/friendLink')

friendLinkRouter.post('/saveFriendLink', friendLinkController.saveFriendLink )
friendLinkRouter.post('/deleteFriendLinkByUid', friendLinkController.deleteFriendLinkByUid )
friendLinkRouter.post('/queryFriendLinkPage', friendLinkController.queryFriendLinkPage )
friendLinkRouter.post('/queryFriendLinkAll', friendLinkController.queryFriendLinkAll )
friendLinkRouter.post('/updateFriendLinkByUid', friendLinkController.updateFriendLinkByUid )


module.exports = friendLinkRouter
