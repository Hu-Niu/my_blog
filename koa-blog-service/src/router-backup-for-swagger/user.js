const Router = require('koa-router') // 引入路由
const userRouter = new Router()
const passport = require('koa-passport')

const userController = require('../controller/user')
/**
 * @openapi
 * /user/login:
 *   post:
 *     tags: ['user']
 *     summary: 用户登录
 *     description: 登录接口
 *     requestBody:
 *       description: 用户登录时所需的信息
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *       required: true
 *     responses:
 *       200:
 *         description: 调用成功
 *         content: {}
 *
 */
userRouter.post('/login', userController.login)
/**
 * @openapi
 * /user/register:
 *   post:
 *     tags: ['user']
 *     summary: 用户注册
 *     description: 注册接口
 *     requestBody:
 *       description: 用户注册时所需的信息
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *       required: true
 *     responses:
 *       200:
 *         description: 调用成功
 *         content: {}
 *
 */
userRouter.post('/register', userController.register)
/**
 * @openapi
 * /user/resetPassword:
 *   post:
 *     tags: ['user']
 *     summary: 重置密码
 *     description: 管理员登录账户后，重置其他用户密码
 *     requestBody:
 *       description: 重置密码时提交的参数
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *       required: true
 *     responses:
 *       200:
 *         description: 调用成功
 *         content: {}
 *
 */
userRouter.post('/resetPassword', passport.authenticate('jwt', {session: false}), userController.resetPassword)

module.exports = userRouter

/**
 * @openapi
 * components:
 *  schemas:
 *    UserLogin:
 *      required: ['username','password']
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: 用户名
 *          enum: ['admin','cheny','xzz']
 *        password:
 *          type: string
 *          description: 登录密码
 *          enum: ['123123']
 *        isRememberMe:
 *          type: boolean
 *          description: 七天免登录
 *          default: false
 *      xml:
 *        name: UserLogin
 *    UserRegister:
 *      required: ['username','password']
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: 用户名
 *        password:
 *          type: string
 *          description: 登录密码
 *          enum: ['123123']
 *      xml:
 *        name: UserLogin
 *    ResetPassword:
 *      required: ['username']
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: 用户名
 *          enum: ['admin']
 *      xml:
 *        name: ResetPassword
 */
