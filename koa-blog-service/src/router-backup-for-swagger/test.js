const Router = require('koa-router') // 引入路由
const testRouter = new Router()
const passport = require('koa-passport')
/**
 * @openapi
 * /test/tokenTest:
 *   get:
 *     tags: ['test']
 *     summary: JWT鉴权接口测试
 *     description: 测试passport拦截器，校验token，如果token未校验通过，会返回401未授权
 *     responses:
 *       200:
 *         description: 调用成功
 *         content: {}
 *
 */
testRouter.get('/tokenTest', passport.authenticate('jwt', {session: false}), async ctx => {
    console.log(ctx.state.user, 'ctx.state.user') // 从passport传过来的值
    ctx.body = ctx.state.user
})

/**
 * @openapi
 * /test/query:
 *   get:
 *     tags: ['test']
 *     summary: get接口测试
 *     description: get请求直接在路径拼接参数接口测试
 *     parameters:
 *       - name: status
 *         in: query
 *         description: get传参测试
 *         example: 456456
 *         required: true
 *         schema:
 *           type: string
 *       - name: xzz
 *         in: query
 *         description: get传参测试
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 调用成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Invalid status value
 *         content: {}
 *     security:
 *       bearerAuth: []
 */
testRouter.get('/query', async ctx => {
    console.log('aaaaa')
    ctx.body = ctx.query
})

/**
 * @openapi
 * /test/query:
 *   get:
 *     tags: ['test']
 *     summary: 作废接口测试
 *     description: get请求直接在路径拼接参数接口测试
 *     parameters:
 *       - name: status
 *         in: query
 *         description: get传参测试
 *         example: 456456
 *         required: true
 *         schema:
 *           type: string
 *       - name: xzz
 *         in: query
 *         description: get传参测试
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 调用成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Invalid status value
 *         content: {}
 *     deprecated: true
 */
testRouter.get('/queryAbandoned', async ctx => {
    console.log(ctx.query)
    ctx.body = ctx.query
})

/**
 * @openapi
 * /test/query/{uid}:
 *   get:
 *     tags: ['test']
 *     summary: get接口测试 restful
 *     description: restful风格API测试 get
 *     parameters:
 *       - name: uid
 *         in: path
 *         description: get restful 传参测试
 *         example: 456456
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 调用成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Invalid status value
 *         content: {}
 */
testRouter.get('/query/:uid', async ctx => {
    console.log(ctx.params)
    ctx.body = ctx.params
})

/**
 * @openapi
 * /test/save:
 *   post:
 *     tags: ['test']
 *     summary: post接口测试
 *     description: post接口测试
 *     requestBody:
 *       description: 用户登录时所需的信息
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *       required: true
 *     responses:
 *       200:
 *         description: 调用成功
 *         content: {}
 *
 */
testRouter.post('/save', async ctx => {
    console.log(ctx.request.body, 'ctx')
    ctx.body = ctx.request.body
})


/**
 * @openapi
 * /test/delete/{uid}:
 *   delete:
 *     tags: ['test']
 *     summary: delete接口测试 restful
 *     description: restful风格API测试 delete
 *     parameters:
 *       - name: uid
 *         in: path
 *         description: delete restful 传参测试
 *         example: 456456
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 调用成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Invalid status value
 *         content: {}
 */
testRouter.delete('/delete/:uid', async ctx => {
    console.log(ctx.params)
    ctx.body = ctx.params
})


/**
 * @openapi
 * /test/put:
 *   put:
 *     tags: ['test']
 *     summary: put接口测试
 *     description: put接口测试
 *     requestBody:
 *       description: 用户登录时所需的信息
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *       required: true
 *     responses:
 *       200:
 *         description: 调用成功
 *         content: {}
 *
 */
testRouter.put('/put', async ctx => {
    console.log(ctx.request.body, 'ctx')
    ctx.body = ctx.request.body
})



testRouter.get('/hh', async ctx => {
    ctx.success({aa: 'cheny'})
})

testRouter.get('/aa', async ctx => {
    ctx.fail()
})


module.exports = testRouter
/**
 * @openapi
 * components:
 *  schemas:
 *    Pet:
 *      required: ['name','photoUrls']
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *          description: 主键id
 *          enum: [123,456]
 *        name:
 *          type: string
 *          description: 用户名
 *          example: doggie
 *        photoUrls:
 *          type: array
 *          description: 图片地址数组
 *          xml:
 *            name: photoUrl
 *            wrapped: true
 *          items:
 *            type: string
 *        status:
 *          type: string
 *          description: 状态
 *          enum: ['available','pending','sold']
 *      xml:
 *        name: Pet
 */
