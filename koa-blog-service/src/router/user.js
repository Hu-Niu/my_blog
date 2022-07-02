const Router = require('koa-router') // 引入路由
const userRouter = new Router()
const passport = require('koa-passport')

const userController = require('../controller/user')

userRouter.post('/login', userController.login)

userRouter.post('/register', userController.register)

userRouter.post('/resetPassword', passport.authenticate('jwt', {session: false}), userController.resetPassword)

module.exports = userRouter
