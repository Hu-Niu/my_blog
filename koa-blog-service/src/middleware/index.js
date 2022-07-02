const router = require('../router') // 路由
const cors = require('koa2-cors') // 跨域配置
const path = require('path')
const static = require('koa-static')
const views = require('koa-views')

const koaBody = require('koa-body') // post参数接收 文件接收中间件，代替koa-bodyparser
const passport = require('koa-passport') // 路由鉴权拦截
const formatResponse = require('./formatResponse') // 自定义统一接口数据中间件
const catchError = require('./catchError') // 自定义全局异常捕获中间件
const {koaSwagger} = require('koa2-swagger-ui') // swagger-ui
const swaggerRouter = require('../utils/swagger')
const myLog = require('./myLog4js')
const ip = require("ip")
const {maxFileSize} = require('../constant/config')
const {FILE} = require('../constant/resCodeVariable')

const {cosWhiteList} = require('../constant/config')

module.exports = app => {

// 注意使用app.use时是分先后顺序的，先配置跨域，再配置路由，否则跨域无效
    app.use(cors({
        origin: ctx => {
            const requestOrigin = ctx.get('Origin')
            console.log(requestOrigin, 'requestOrigin')
            console.log(cosWhiteList, 'cosWhiteList')
            if (cosWhiteList.test(requestOrigin)) {
                return requestOrigin
            }
            return false
        }
    })) // 先设置跨域

    // app.use(cors())

    app.use(formatResponse()) // 统一接口返回格式中间件

    app.use(catchError()) // 全局异常错误处理

    app.use(static(
        path.resolve(__dirname, '../../public')
    ))
    app.use(myLog({
        projectName: 'koa2-service',
        appLogLevel: 'debug',
        serverIp: ip.address()
    }));

    app.use(koaBody({
        multipart: true,
        formidable: {
            maxFileSize: maxFileSize    // 设置上传文件大小最大限制 单位是Bytes
        },
        onError: (err,ctx) => {
            ctx.throw(500,err.message,{name: FILE.FILE_UPLOAD_ERROR})
        }
    }))

    app.use(views(path.resolve(__dirname,'../views'),{
        extension: 'ejs'
    }))

    app.use(router.routes()) // 启动路由
    app.use(router.allowedMethods()) // 允许任何请求 get、post、pull、delete等
    app.use(swaggerRouter.routes()) // 启动swagger接口文档路由
    app.use(swaggerRouter.allowedMethods())

    // 配置Swagger-ui
    app.use(koaSwagger({
        routePrefix: '/doc', // 访问文档时的路径，例如：http://localhost:20517/doc
        swaggerOptions: {
            url: '/swagger.json', //
        },
    }))

    app.use(passport.initialize()) // 初始化passport，可以对路由进行一个拦截
    app.use(passport.session())
    require('../utils/passport')(passport) // 回调到utils中的passport.js

}
