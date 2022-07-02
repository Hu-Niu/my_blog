const Router = require('koa-router') // 引入路由
const $VAR_SMALL_HUMP$Router = new Router()

const $VAR_SMALL_HUMP$Controller = require('../controller/$VAR_SMALL_HUMP$')

$VAR_SMALL_HUMP$Router.post('/save$VAR_BIG_HUMP$', $VAR_SMALL_HUMP$Controller.save$VAR_BIG_HUMP$ )
$VAR_SMALL_HUMP$Router.post('/delete$VAR_BIG_HUMP$ByUid', $VAR_SMALL_HUMP$Controller.delete$VAR_BIG_HUMP$ByUid )
$VAR_SMALL_HUMP$Router.post('/query$VAR_BIG_HUMP$Page', $VAR_SMALL_HUMP$Controller.query$VAR_BIG_HUMP$Page )
$VAR_SMALL_HUMP$Router.post('/query$VAR_BIG_HUMP$All', $VAR_SMALL_HUMP$Controller.query$VAR_BIG_HUMP$All )
$VAR_SMALL_HUMP$Router.post('/update$VAR_BIG_HUMP$ByUid', $VAR_SMALL_HUMP$Controller.update$VAR_BIG_HUMP$ByUid )


module.exports = $VAR_SMALL_HUMP$Router
