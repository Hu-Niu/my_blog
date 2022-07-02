/**
 * 代码生成
 * 1、解析 koa-blog-service/src/constant/resCodeVariable.js 文件， 获取已声明过的错误码模块名称
 * 2、解析 koa-blog-service/src/controller/目录下所有文件名，获取到已创建过的koa接口模块名
 *
 * 2.2 解析 vue-blog-admin/src/views/目录下所有文件名，获取到已创建过的vue页面模块名
 *
 * 3、解析数据库sql文件，转为json对象格式
 * 4、根据解析后的sql，获取所有已创建的数据表名
 * 5、声明 inquirer 配置项
 * 6、从控制台接收参数 {moduleName,tableName,errCodeModule}
 * 7、根据控制台传过来的 tableName 拿到该表相关的json数据 tableData
 * 8、传入所需参数{moduleName, tableData, errCodeModule}，解析自定义代码模板，按照定义规则替换模板中的占位符，生成新模块的业务代码，将最终结果输出至对应目录下
 */
(async () => {
    const inquirer = require('inquirer');
    const {parseSqlFile} = require('./utils/parseSqlFile')
    const {getErrorCodeModule} = require('./utils/getErrorCodeModule')
    const {getAllModules} = require('./utils/getAllModules')
    const {getAllViewsModules} = require('./utils/getAllViewsModules')
    const {getDataFromParseSql} = require('./utils/getDataFromParseSql')
    const {parseTemplate} = require('./utils/parseTemplate')
    const {pathDevelop} = require('./config')

    // 1、解析 src/constant/resCodeVariable.js 文件， 获取已声明过的错误码模块名称
    let errCodeModules = getErrorCodeModule()
    console.log(errCodeModules, 'errCodeModules')

    // 2、解析 src/controller/目录下所有文件名，获取到已创建过的模块名
    const allModules = getAllModules('UpperCase')
    console.log(allModules, 'allModules')

    // 2.2、解析 vue-blog-admin/src/views/目录下所有文件名，获取到已创建过的vue页面模块名
    const allViewsModules = getAllViewsModules()
    console.log(allViewsModules, 'allViewsModules')

    // 3、解析数据库sql文件，转为json对象格式
    const sqlJson = await parseSqlFile()
    console.table(sqlJson)


    // 4、根据解析后的sql，获取所有已创建的数据表名
    let allTableName = sqlJson.reduce((prev, current) => {
        prev.push(current.name)
        return prev
    }, [])

    /**
     * 5、声明 inquirer 配置项，从控制台接收三个参数
     * [moduleName,tableName,errCodeModule]
     */
    const promptList = [
        {
            type: 'input',
            message: '*新添加的模块名(小驼峰):',
            name: 'moduleName',
            validate: (val) => {
                const reg = /([a-z])([a-zA-Z0-9]+)/
                if (val === '') {
                    return '模块名不能为空'
                }
                if (allModules.includes(val.toUpperCase())) {
                    return '模块名已存在'
                }
                if (reg.test(val)) {
                    return true
                }
                return '必须为小驼峰的命名格式，且至少有两个字母'
            }
        },
        {
            type: 'input',
            message: '*操作的数据库表名(t_xxx):',
            name: 'tableName',
            validate: (val) => {
                if (val === '') {
                    return '表名不能为空'
                }
                if (allTableName.includes(val)) {
                    return true
                }
                return `表\`${val}\`尚未创建，请重新输入`
            }
        },
        {
            type: 'list',
            message: '*请选择对应的错误码提示模块:',
            name: 'errCodeModule',
            choices: errCodeModules,
            filter: val => val
        },
        {
            type: 'list',
            message: '*请选择前端vue代码生成目录:',
            name: 'vueModule',
            choices: allViewsModules.length > 0 ? allViewsModules : [pathDevelop.tempViewModuleValue], // 如果没有，默认给一个
            filter: val => val,
        },
    ];

    inquirer.prompt(promptList).then(async res => {
        /**
         * 6、从控制台接收参数
         * moduleName：新建的模块，小驼峰命名格式
         * tableName：操作的数据库表的名字
         * errCodeModule：错误码模块，参数校验，返回校验结果的时候用
         * vueModule：前端代码生成的目录，必须在views/目录下的一个子目录里，相当于是一个大模块的二级页面
         */
        const {moduleName, tableName, errCodeModule, vueModule} = res
        console.log(res, 'res')


        // 7、根据控制台传过来的 tableName 拿到该表相关的json数据 tableData
        const tableData = getDataFromParseSql(sqlJson, tableName)
        console.table(tableData)

        // 8、传入所需参数{moduleName, tableData, errCodeModule, vueModule}，解析自定义代码模板，按照定义规则替换模板中的占位符，生成新模块的业务代码，将最终结果输出至对应目录下
        parseTemplate(moduleName, tableData, errCodeModule, vueModule)
    })
})()




