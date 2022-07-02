const fs = require('fs')
const path = require('path')
const {
    pathDevelop,
} = require('../../config')
const configReadPath = pathDevelop.readPath
const configKoaWritePath = pathDevelop.koaWritePath
const configVueAdminApiWritePath = pathDevelop.vueAdminApiWritePath
const configVueAdminViewWritePath = pathDevelop.vueAdminViewWritePath
const productionRouterIndexJsPath = pathDevelop.productionRouterIndexJsPath

const {
    smallHumpPlaceholder,
    bigHumpPlaceholder,
    variableSmallHumpVerify,
    variableBigHumpVerify,

    transitionSmallHump,
    transitionBigHump,
} = require('./regular')

const {
    parseRouterIndex,
    parseRouter$VAR_SMALL_HUMP$,
    parseController$VAR_SMALL_HUMP$,

    parseValidation$VAR_SMALL_HUMP$Index,
    parseValidation$VAR_SMALL_HUMP$save$VAR_BIG_HUMP$,
    parseValidation$VAR_SMALL_HUMP$delete$VAR_BIG_HUMP$ByUid,
    parseValidation$VAR_SMALL_HUMP$query$VAR_BIG_HUMP$Page,
    parseValidation$VAR_SMALL_HUMP$update$VAR_BIG_HUMP$ByUid,

    parseService$VAR_SMALL_HUMP$,
    parseDao$VAR_SMALL_HUMP$,
    parseSql$VAR_SMALL_HUMP$,

    parseVueAdminApi$VAR_SMALL_HUMP$,
    parseVueAdminApi$VAR_SMALL_HUMP$$VAR_BIG_HUMP$Scss,
    parseVueAdminApi$VAR_SMALL_HUMP$$VAR_BIG_HUMP$Vue,


} = require('./parseRules')

/**
 * @param {String} moduleName 模块名
 * @param {Array} tableData 需要操作的数据表数据
 * @param {String} errCodeModule 错误码模块名
 * @param {String} vueModule vue代码生成目录
 * @description 解析模板，按照数据库表的字段、类型、默认值、是否必填，
 *              根据自定义模板和校验规则，生成这张表的增删该查接口代码
 */
const parseTemplate = (moduleName, tableData, errCodeModule, vueModule) => {
    /**
     * 伪代码：
     *      input:
     *          ${ReadPath} = /template // 当前读取的目录路径
     *          ${OutputPath} = /output // 当前输出的目录路径
     *      output:
     *          在目标目录下生成全新的替换后的文件夹和文件
     *
     *      1、遍历读取 ${ReadPath} 文件夹下面的所有文件或文件夹
     *      2、当是文件夹时：获得当前文件夹路径 ${CurrentReadPath} 跳转至3，当不为文件夹时，跳转至5
     *      3、根据自定义规则替换文件夹名称，得到替换后得文件夹 ${ProcessedOutputPath}
     *      4、在对应输出目录 ${OutputPath} 创建替换后的文件夹 ${ProcessedOutputPath} 跳转回1，
     *         且 ${ReadPath} = ${CurrentReadPath}
     *           ${OutputPath} = ${ProcessedOutputPath}
     *      5、当是文件时：读取文件内容 ${FileContent}
     *      6、根据自定义规则替换文件内容${FileContent} 得到按自定义规则替换后的文件内容 ${ProcessedFileContent}
     *      7、将处理后的文件内容写入到 ${OutputPath} 目录下
     *
     *      重复上述步骤，直到所有的文件和文件夹都替换并生成完毕结束。
     */
    console.log('开始解析代码模板')
    let readPath = configReadPath
    let koaWritePath = configKoaWritePath
    let vueAdminViewWritePath = configVueAdminViewWritePath
    let vueAdminApiWritePath = configVueAdminApiWritePath

    // 如果根目录不存在，先创建根目录，防止报错
    if (!fs.existsSync(readPath)) {
        fs.mkdirSync(readPath)
    }
    if (!fs.existsSync(koaWritePath)) {
        fs.mkdirSync(koaWritePath)
    }

    // 下面的是生成 前端代码生成的目录，先提前声明好 待会直接往里面塞文件
    if (!fs.existsSync(vueAdminViewWritePath)) { // /views 文件夹
        fs.mkdirSync(vueAdminViewWritePath)
    }
    if (!fs.existsSync(vueAdminApiWritePath)) { // /api 文件夹
        fs.mkdirSync(vueAdminApiWritePath)
    }

    const vueModulePath = path.resolve(vueAdminViewWritePath, vueModule)
    if (!fs.existsSync(vueModulePath)) { // /views/${vueModule} vue模块目录
        fs.mkdirSync(vueModulePath)
    }

    const vueFileWritePath = path.resolve(vueModulePath,moduleName)
    if (!fs.existsSync(vueFileWritePath)) { // /views/${vueModule}/${moduleName} 子模块目录，最后解析后的vue和scss文件都塞在这里
        fs.mkdirSync(vueFileWritePath)
    }
    // 开始解析
    recursiveParseTemplate(readPath, koaWritePath, moduleName, tableData, errCodeModule, vueFileWritePath)
    console.log('模板解析完毕，所有文件已生成')
}

/**
 * @param {String} readPath 读取的目录路径，如果是文件夹: /xxx/xxx 如果是文件: /xxx/xxx.txt
 * @param {String} koaWritePath koa接口代码的写入的目录路径
 * @param {String} moduleName 模块名
 * @param {Array} tableData 需要操作的数据表数据
 * @param {String} errCodeModule 错误码模块名
 * @param {String} vueFileWritePath vue文件的写入路径
 * @description 递归解析模板
 * @author cheny
 * @date 2021/7/29
 * @date 2021/8/18 逻辑修改：前端文件输出目录特殊处理，api声明文件输出值 vue-blog-admin/src/api 目录下 对应的vue和scss输出至 vue-blog-admin/src/views/${vueModule}/${moduleName} 目录下
 */
function recursiveParseTemplate(readPath, koaWritePath, moduleName, tableData, errCodeModule, vueFileWritePath) {
    // 读出当前目录下的所有文件夹和文件，得到的是一个数组，包含当前目录下所有文件夹名和文件名
    let files = fs.readdirSync(readPath)
    // console.log(files, 'files')
    // 遍历得到的数组
    for (const file of files) {
        // 拼接当前这个文件夹或者文件的路径，获取这个文件状态，为了判断它是文件夹还是文件
        let stat = fs.statSync(path.resolve(readPath, file))

        //如果是文件夹的话，就把这个文件夹的名字使用自定义规则替换一下，然后在目标目录下新建一下，文件夹名字就是替换后的字符串
        if (stat.isDirectory()) {
            // console.log('我是文件夹', file)
            // 按照自定义匹配规则 替换文件夹名字
            let newFileName = replaceFileNameToBigOrSmallHump(file, moduleName)
            // 在指定目录下新建替换后的文件夹

            const currentWritePath = path.resolve(koaWritePath, newFileName)
            let isExist = fs.existsSync(currentWritePath)
            if (!isExist && !/\$vueAdmin\$/.test(currentWritePath)) { // 存放前端模板的路径排除掉
                fs.mkdirSync(currentWritePath)
            } else if (/\$vueAdmin\$/.test(currentWritePath)) {
                console.log(currentWritePath, '前端模块文件夹，不在此处生成')
            } else {
                console.log(currentWritePath, '文件夹已存在')
            }

            // 然后进入这个文件下继续遍历
            let tempReadPath = path.resolve(readPath, file)
            let tempKoaWritePath = path.resolve(koaWritePath, newFileName)
            recursiveParseTemplate(tempReadPath, tempKoaWritePath, moduleName, tableData, errCodeModule, vueFileWritePath)
        }
        /**
         * 如果是文件的话，就把这个文件的名字使用自定义规则替换一下，
         * 同时按自定义规则替换文件里的内容，
         * 然后在目标目录新建一下，文件名字就是替换后的字符串，内容就是替换后的内容
         *
         * 开始解析模板文件
         * 需要解析的文件如下 每个文件解析时须遵循自定义的格式，最后将解析后的文件，输出至目标目录中
         * 注意：
         *      /router/的index.js文件开发时需要从生产环境中读取 目录为 src/router/index.js
         *      只有这个文件需要基于开发环境中已有的内容再追加，别的文件都是新生成的
         *
         * 后台接口：
         * 1、/router/
         *      $VAR_SMALL_HUMP$.js
         *      index.js
         * 2、/controller/
         *      $VAR_SMALL_HUMP$.js
         * 3、/validation/$VAR_SMALL_HUMP$/
         *      index.js
         *      save$VAR_BIG_HUMP$.js
         *      delete$VAR_BIG_HUMP$ByUid.js
         *      query$VAR_BIG_HUMP$Page.js
         *      update$VAR_BIG_HUMP$ByUid.js
         * 4、/service/
         *      $VAR_SMALL_HUMP$.js
         * 5、/dao/
         *      $VAR_SMALL_HUMP$.js
         * 6、/sql/
         *      $VAR_SMALL_HUMP$.js
         */
        /**
         * 前台Vue文件：
         * 7、/vueAdmin/api/
         *      $VAR_SMALL_HUMP$.js
         * 8、/vueAdmin/$VAR_SMALL_HUMP$/
         *      $VAR_BIG_HUMP$.scss
         *      $VAR_BIG_HUMP$.vue
         */
        if (stat.isFile()) {
            console.log('我是文件', file)
            const newFileName = replaceFileNameToBigOrSmallHump(file, moduleName)
            const readFilePath = path.resolve(readPath, file)
            const writeKoaFilePath = path.resolve(koaWritePath, newFileName)
            let parsedFileContent = ''

            // 1.1、/router/index.js
            if (/router[\/|\\]i/.test(readFilePath) && newFileName === 'index.js') {
                console.log(readFilePath, 'readFilePath /router/index.js')
                // let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 生产环境中读取当前的/router/index.js
                const fileContent = getRouterIndexFromProductionEnvironment(productionRouterIndexJsPath)

                // 获取解析后的文件内容
                parsedFileContent = parseRouterIndex(fileContent, moduleName)
            }

            // 1.2、/router/$VAR_SMALL_HUMP$.js
            if (/router[\/|\\]\$/.test(readFilePath) && newFileName === `${moduleName}.js`) {
                console.log(readFilePath, 'readFilePath /router/$VAR_SMALL_HUMP$.js')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseRouter$VAR_SMALL_HUMP$(fileContent, moduleName)
            }

            // 2、/controller/$VAR_SMALL_HUMP$.js
            if (/controller[\/|\\]\$/.test(readFilePath) && newFileName === `${moduleName}.js`) {
                console.log(readFilePath, 'readFilePath /controller/$VAR_SMALL_HUMP$.js')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseController$VAR_SMALL_HUMP$(fileContent, moduleName, errCodeModule, tableData)
            }

            // 3.1、 /validation/$VAR_SMALL_HUMP$/index.js
            if (/validation[\/|\\]\$/.test(readFilePath) && newFileName === 'index.js') {
                console.log(readFilePath, 'readFilePath /validation/$VAR_SMALL_HUMP$/index.js')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseValidation$VAR_SMALL_HUMP$Index(fileContent, moduleName)
            }
            // 3.2、 /validation/$VAR_SMALL_HUMP$/save$VAR_BIG_HUMP$.js
            if (/validation[\/|\\]\$/.test(readFilePath) && newFileName.slice(0, 4) === `save`) {
                console.log(readFilePath, 'readFilePath /validation/$VAR_SMALL_HUMP$/save$VAR_BIG_HUMP$.js')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseValidation$VAR_SMALL_HUMP$save$VAR_BIG_HUMP$(fileContent, moduleName, tableData)
            }

            // 3.3、 /validation/$VAR_SMALL_HUMP$/delete$VAR_BIG_HUMP$ByUid.js
            if (/validation[\/|\\]\$/.test(readFilePath) && newFileName.slice(0, 6) === `delete`) {
                console.log(readFilePath, 'readFilePath /validation/$VAR_SMALL_HUMP$/delete$VAR_BIG_HUMP$ByUid.js')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseValidation$VAR_SMALL_HUMP$delete$VAR_BIG_HUMP$ByUid(fileContent, moduleName, tableData)
            }

            // 3.4、 /validation/$VAR_SMALL_HUMP$/query$VAR_BIG_HUMP$Page.js
            if (/validation[\/|\\]\$/.test(readFilePath) && newFileName.slice(0, 5) === `query`) {
                console.log(readFilePath, 'readFilePath /validation/$VAR_SMALL_HUMP$/query$VAR_BIG_HUMP$Page.js')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseValidation$VAR_SMALL_HUMP$query$VAR_BIG_HUMP$Page(fileContent, moduleName, tableData)
            }

            // 3.5、 /validation/$VAR_SMALL_HUMP$/update$VAR_BIG_HUMP$ByUid.js
            if (/validation[\/|\\]\$/.test(readFilePath) && newFileName.slice(0, 6) === `update`) {
                console.log(readFilePath, 'readFilePath /validation/$VAR_SMALL_HUMP$/update$VAR_BIG_HUMP$ByUid.js')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseValidation$VAR_SMALL_HUMP$update$VAR_BIG_HUMP$ByUid(fileContent, moduleName, tableData)
            }

            // 4、 /service/$VAR_SMALL_HUMP$.js
            if (/service[\/|\\]\$/.test(readFilePath) && newFileName === `${moduleName}.js`) {
                console.log(readFilePath, 'readFilePath /service/$VAR_SMALL_HUMP$.js')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // // 获取解析后的文件内容
                parsedFileContent = parseService$VAR_SMALL_HUMP$(fileContent, moduleName, tableData)
            }

            // 5、 /dao/$VAR_SMALL_HUMP$.js
            if (/dao[\/|\\]\$/.test(readFilePath) && newFileName === `${moduleName}.js`) {
                console.log(readFilePath, 'readFilePath /dao/$VAR_SMALL_HUMP$.js')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseDao$VAR_SMALL_HUMP$(fileContent, moduleName, tableData)
            }

            // 6、 /sql/$VAR_SMALL_HUMP$.js
            if (/sql[\/|\\]\$/.test(readFilePath) && newFileName === `${moduleName}.js`) {
                console.log(readFilePath, 'readFilePath /sql/$VAR_SMALL_HUMP$.js')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseSql$VAR_SMALL_HUMP$(fileContent, moduleName, tableData)
            }


            // 7.1、 /$vueAdmin$/api/$VAR_SMALL_HUMP$.js
            if (/api[\/|\\]\$/.test(readFilePath) && newFileName === `${moduleName}.js`) {
                console.log(readFilePath, 'readFilePath /vueAdmin/api/$VAR_SMALL_HUMP$.js')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseVueAdminApi$VAR_SMALL_HUMP$(fileContent, moduleName)
            }

            // 8.1、 /$vueAdmin$/$VAR_SMALL_HUMP$/$VAR_BIG_HUMP$.scss
            if (/\$vueAdmin\$[\/|\\]\$/.test(readFilePath) && newFileName.toUpperCase() === `${moduleName.toUpperCase()}.SCSS`) {
                console.log(readFilePath, 'readFilePath /vueAdmin/$VAR_SMALL_HUMP$/$VAR_BIG_HUMP$.scss')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseVueAdminApi$VAR_SMALL_HUMP$$VAR_BIG_HUMP$Scss(fileContent, moduleName)
            }

            // 8.2、 /$vueAdmin$/$VAR_SMALL_HUMP$/$VAR_BIG_HUMP$.vue
            if (/\$vueAdmin\$[\/|\\]\$/.test(readFilePath) && newFileName.toUpperCase() === `${moduleName.toUpperCase()}.VUE`) {
                console.log(readFilePath, 'readFilePath /vueAdmin/$VAR_SMALL_HUMP$/$VAR_BIG_HUMP$.vue')
                let fileContent = fs.readFileSync(readFilePath, 'utf-8')
                // 获取解析后的文件内容
                parsedFileContent = parseVueAdminApi$VAR_SMALL_HUMP$$VAR_BIG_HUMP$Vue(fileContent, moduleName, tableData)
            }



            // 在指定目录下生成替换后的文件
            if(/\$vueAdmin\$.*\.(scss|vue)$/.test(writeKoaFilePath)){ // 若果是scss或者vue文件

                const scssOrVueWritePath = path.resolve(vueFileWritePath,newFileName)
                fs.writeFileSync(scssOrVueWritePath, parsedFileContent)

            }else if(/\$vueAdmin\$(\\|\/)api.*\.js$/.test(writeKoaFilePath)) { // 如果是api声明文件

                const apiVueWritePath = path.resolve(configVueAdminApiWritePath,newFileName)
                fs.writeFileSync(apiVueWritePath, parsedFileContent)

            } else { // 剩余的都是koa接口文件

                fs.writeFileSync(writeKoaFilePath, parsedFileContent)

            }

        }
    }
}


/**
 * @param {String} file 文件或者文件夹的名称
 * @param {String} moduleName 模块的名称
 * @return {String} newFileName 替换后的名称
 * @description 将文件或者文件夹名称转换为大驼峰或者小驼峰的格式
 * @author cheny
 * @date 2021/7/29
 */
const replaceFileNameToBigOrSmallHump = (file, moduleName) => {
    let newFileName = file
    // 正则校验，如果匹配到了，就替换
    let verifySmallHumpResult = variableSmallHumpVerify(file)
    let verifyBigHumpResult = variableBigHumpVerify(file)
    if (verifySmallHumpResult) {
        newFileName = file.replace(smallHumpPlaceholder, transitionSmallHump(moduleName))
    }
    if (verifyBigHumpResult) {
        newFileName = file.replace(bigHumpPlaceholder, transitionBigHump(moduleName))
    }
    return newFileName
}

/**
 * @description 从生产环境中读取 src/router/index.js的文件内容
 * @param {String} routerIndexPath 生产环境中 src/router/index.js 的文件路径
 * @return {String} readContent 读取到的内容文件
 */
const getRouterIndexFromProductionEnvironment = (routerIndexPath) => {
    let readContent = ''
    if (fs.existsSync(routerIndexPath)) {
        readContent = fs.readFileSync(routerIndexPath, 'utf-8')
    }
    return readContent
}


module.exports = {
    parseTemplate,
}
