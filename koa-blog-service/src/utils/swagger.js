const swaggerJSDoc = require('swagger-jsdoc')
const Router = require('koa-router')
const router = new Router()
const path = require('path')

const options = {
    definition: {
        // openapi: '3.0.0', // optional, defaults to swagger: '2.0',默认是 2.0
        info: {
            title: 'pupublog接口文档',
            version: '1.0.0',
            description: `后台使用的koa2，接口文档使用了两个中间件 [koa2-swagger-ui](https://www.npmjs.com/package/koa2-swagger-ui) 和 [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc).<br>
                          本文档使用的版本是\`openapi 3.0.0\`<br>
                          附上几个参考链接：[node环境 Express编写的后台接口如何结合swagger-ui](https://blog.csdn.net/QiZi_Zpl/article/details/105215214)、[editor.swagger.io](https://editor.swagger.io/)、[koa2中使用swagger](https://segmentfault.com/a/1190000022057905)、
                          [Security Definitions#141](https://github.com/Surnet/swagger-jsdoc/issues/141)、[bearer-authentication](https://swagger.io/docs/specification/authentication/bearer-authentication/)、
                          [swagger.io/specification](https://swagger.io/specification/#specification)、[schema的规范](https://json-schema.org/understanding-json-schema/)`,
        },
        externalDocs: {
            description: '广告位',
            url: 'https://www.baidu.com'
        },
        // 服务器
        servers: [
            {
                url: 'http://localhost:20517'
            },
        ],
        // 全局配置JWT授权
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: [path.join(__dirname, '../router/*.js')], //这里指明接口路由存放的文件夹
};

const openapiSpecification = swaggerJSDoc(options)

// 开放 swagger 相关接口，相当于把处理后的json文件返回出去，然后 koa2-swagger-ui 这个中间件就可以使用这个json文件回显页面
router.get('/swagger.json', async ctx => {
    ctx.set('Content-Type', 'application/json');
    ctx.body = openapiSpecification
})

module.exports = router
