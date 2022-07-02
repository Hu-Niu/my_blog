/**
 * 代码移除
 * 1、解析 src/controller/目录下所有文件名，获取到已创建过的模块名
 * 2、声明 inquirer 配置项
 * 3、从控制台接收参数 {moduleName}
 * 4、传入所需参数{moduleName}，遍历目标目录文件夹及文件，删除对应的文件或文件夹
 */
(async () => {
    const inquirer = require('inquirer');
    const {getAllModules} = require('./utils/getAllModules')
    const {getAllViewsModules} = require('./utils/getAllViewsModules')
    const {removeModule} = require('./utils/removeModule')


    // 1、解析 src/controller/目录下所有文件名，获取到已创建过的模块名
    const allModules = getAllModules()
    console.log(allModules, 'allModules')

    // 1.2、解析 vue-blog-admin/src/views/目录下所有文件名，获取到已创建过的vue页面模块名
    const allViewsModules = getAllViewsModules()
    console.log(allViewsModules, 'allViewsModules')

    /**
     * 2、声明 inquirer 配置项，从控制台选择要移除的module
     * [moduleName]
     */
    const promptList = [
        {
            type: 'list',
            message: '*请选择想要移除的模块名:',
            name: 'moduleName',
            choices: allModules,
            filter: val => val
        },
        {
            type: 'list',
            message: '*请选择该模块前端页面所属模块:',
            name: 'vueModule',
            choices: allViewsModules,
            filter: val => val
        },
    ];

    inquirer.prompt(promptList).then(async res => {
        /**
         * 6、从控制台接收参数
         * moduleName：待移除的模块名
         * vueModule：前端页面所属模块名
         */
        const {moduleName, vueModule} = res
        console.log(res, 'res')

        // 8、传入所需参数{moduleName}，遍历目标目录文件夹及文件，删除对应的文件或文件夹
        await removeModule(moduleName, vueModule)
    })
})()
