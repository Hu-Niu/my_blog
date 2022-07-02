const path = require('path')
const {database} = require('../koa-blog-service/src/constant/config')

/**
 * readPath 自定义模板所在位置的根目录
 * databaseSqlFilePath 数据库文件位置全路径，包含文件名 xxx.sql
 *
 * koaWritePath 生成后端koa代码输出目录的根目录
 *
 * vueAdminViewWritePath 生成前端Vue代码输出目录的根目录
 * vueAdminApiWritePath 生成前端api引用代码输出目录的根目录
 * productionViewsPath 生产环境中 src/views/的路径， 用来解析现在已存在的前端vue模块
 * tempViewModuleValue 生产环境中如果没有解析到前端vue模块，给个默认值
 *
 * productionControllerPath 生产环境中 src/controller/的路径， 用来解析现在已存在的后台koa模块
 * productionRouterIndexJsPath 生产环境中 src/router/index.js 文件全路径，模板解析的时候会基于这个文件内容添加新内容
 * productionConstantResCodeVariableJsPath 生产环境中 src/constant/resCodeVariable.js 文件全路径，模板解析的时候会解析这个文件 获取已声明过的错误提示模块
 * errCodeModuleDefaultValue 生产环境中如果错误解析模块没有声明，给的默认值
 *
 *
 */
// 测试环境
/*const pathDevelop = {
    readPath: path.resolve(__dirname,'./','template/'),
    databaseSqlFilePath: path.resolve(__dirname,'../koa-blog-service/',`${database.database}.sql`),

    koaWritePath: path.resolve(__dirname,'./','output'),

    vueAdminViewWritePath: path.resolve(__dirname,'./','output/adminViews'),
    vueAdminApiWritePath: path.resolve(__dirname,'./','output/adminViews/api'),
    productionViewsPath: path.resolve(__dirname,'../','vue-blog-admin/src/views'),
    tempViewModuleValue: 'tempViewModule',

    productionControllerPath: path.resolve(__dirname,'./','output/controller'),
    productionRouterIndexJsPath: path.resolve(__dirname,'./','template/router/index.js'),
    productionConstantResCodeVariableJsPath: path.resolve(__dirname,'../koa-blog-service/','src/constant/resCodeVariable.js'),
    errCodeModuleDefaultValue: 'APP',
}*/

/**
 * readPath 自定义模板所在位置的根目录
 * databaseSqlFilePath 数据库文件位置全路径，包含文件名 xxx.sql
 *
 * koaWritePath 生成后端koa代码输出目录的根目录
 *
 * vueAdminViewWritePath 生成前端Vue代码输出目录的根目录
 * vueAdminApiWritePath 生成前端api引用代码输出目录的根目录
 * productionViewsPath 生产环境中 src/views/的路径， 用来解析现在已存在的前端vue模块
 * tempViewModuleValue 生产环境中如果没有解析到前端vue模块，给个默认值
 *
 * productionControllerPath 生产环境中 src/controller/的路径， 用来解析现在已存在的后台koa模块
 * productionRouterIndexJsPath 生产环境中 src/router/index.js 文件全路径，模板解析的时候会基于这个文件内容添加新内容
 * productionConstantResCodeVariableJsPath 生产环境中 src/constant/resCodeVariable.js 文件全路径，模板解析的时候会解析这个文件 获取已声明过的错误提示模块
 * errCodeModuleDefaultValue 生产环境中如果错误解析模块没有声明，给的默认值
 */
// 开发环境
const pathDevelop = {
    readPath: path.resolve(__dirname,'./','template/'),
    databaseSqlFilePath: path.resolve(__dirname,'../',`koa-blog-service/${database.database}.sql`),

    koaWritePath: path.resolve(__dirname,'../','koa-blog-service/src'),

    vueAdminViewWritePath: path.resolve(__dirname,'../','vue-blog-admin/src/views'),
    vueAdminApiWritePath: path.resolve(__dirname,'../','vue-blog-admin/src/api'),
    productionViewsPath: path.resolve(__dirname,'../','vue-blog-admin/src/views'),
    tempViewModuleValue: 'tempViewModule',

    productionControllerPath: path.resolve(__dirname,'../koa-blog-service/','src/controller'),
    productionRouterIndexJsPath: path.resolve(__dirname,'../koa-blog-service/','src/router/index.js'),
    productionConstantResCodeVariableJsPath: path.resolve(__dirname,'../koa-blog-service/','src/constant/resCodeVariable.js'),
    errCodeModuleDefaultValue: 'APP',
}


module.exports = {
    pathDevelop,
}
