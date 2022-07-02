const Koa = require('koa2')
const app = new Koa()
const ip = require('ip')

const middleware = require('./middleware')

middleware(app)

const port = 20517 // 监听端口 端口的范围在 0-65535 随便取 别冲突就行
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} swagger is running at http://localhost:${port}/doc`)
    console.log(`Server is running at http://${ip.address()}:${port} swagger is running at http://${ip.address()}:${port}/doc`)
})
