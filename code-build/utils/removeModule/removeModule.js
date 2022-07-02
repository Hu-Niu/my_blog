const {
    pathDevelop,
} = require('../../config')

const koaReadPath = pathDevelop.koaWritePath
const vueApiReadPath = pathDevelop.vueAdminApiWritePath
const vueViewReadPath = pathDevelop.vueAdminViewWritePath


const fs = require('fs')
const path = require('path')
const readline = require('readline')

/**
 * @description 移除模块代码，遍历 /src/ 文件下所有该模块的代码
 * @param {String} moduleName 待删除的模块名
 * @param {String} vueModule 待删除的模块的前端页面所属模块名
 */
const removeModule = async (moduleName, vueModule) => {
    /**
     * 需要删除的模块文件和文件夹如下
     * 注意：
     *      /router/的index.js文件开发时需要从生产环境中读取 目录为 src/router/index.js
     *      这个文件需要删除文件中声明该模块的地方，其余地方保持不变
     *
     * 1、/router/
     *      ${moduleName}.js --删除
     *      index.js -- 读取原文件，删除声明处代码，其余代码保持不变
     * 2、/controller/
     *      ${moduleName}.js --删除
     * 3、/validation/${moduleName}/  --删除文件夹
     *      index.js
     *      save$VAR_BIG_HUMP$.js
     *      delete$VAR_BIG_HUMP$ByUid.js
     *      query$VAR_BIG_HUMP$Page.js
     *      update$VAR_BIG_HUMP$ByUid.js
     * 4、/service/
     *      ${moduleName}.js --删除
     * 5、/dao/
     *      ${moduleName}.js --删除
     * 6、/sql/
     *      ${moduleName}.js --删除
     *
     * // 前端代码删除
     * 7、/vue-blog-admin/src/api/
     *      ${moduleName}.js --删除
     *
     * 8、/vue-blog-admin/src/views/${vueModule}/ --文件夹删除
     */

    console.log('开始删除模块')

    // 先删除 koa中的相关后台代码
    await recursiveRemoveFile(koaReadPath, moduleName)

    // 再删除 vue-blog-admin/src/api 中的 api声明代码
    await recursiveRemoveFile(vueApiReadPath, moduleName)

    // 再删除 vue-blog-admin/src/views/${vueModule} 中的 vue和scss代码
    const scssOrVueFilePath = path.resolve(vueViewReadPath,vueModule)
    await recursiveRemoveFile(scssOrVueFilePath, moduleName)

    console.log('删除成功')

}

/**
 * @description 递归删除模块
 * @param {String} readPath 要删除的模块路径
 * @param {String} moduleName 要删除的模块名称
 */
const recursiveRemoveFile = async (readPath, moduleName) => {
    /**
     * 伪代码：
     *      input:
     *          ${readPath} = /output // 当前读取的目录路径
     *          ${moduleName} = moduleName // 待删除的模块名
     *      output:
     *          删除该模块所有的文件或文件夹
     *
     *      1、读取 ${readPath} 文件夹下面的所有文件
     *      2、判断文件夹是否等于${moduleName}，如果等于，删除这个文件夹下面所有文件和这个文件夹
     *      3、如果不等于，就读取这个文件夹下面的所有文件，删除文件名为${moduleName}的文件
     *      4、/src/router/index.js 文件需特殊处理，删除引入模块的代码
     */
    const allFiles = fs.readdirSync(readPath)
    for (const file of allFiles) {
        const thisFilePath = path.resolve(readPath, file)
        const stat = fs.statSync(thisFilePath)
        if (stat.isDirectory()) {
            const tempReadPath = path.resolve(readPath, file)
            if (file === moduleName) {
                deleteAllFile(tempReadPath)
            } else {
                await recursiveRemoveFile(tempReadPath, moduleName)
            }
        }
        if (stat.isFile()) {
            if (file === `${moduleName}.js` || file === `${moduleName}.scss` || file === `${moduleName}.vue`) {
                fs.unlinkSync(thisFilePath)
            } else if (file === 'index.js' && /router[\/|\\]i/.test(thisFilePath) ) { // 必须是 /router/index.js /router/ 文件夹下的index.js
                // 一行一行的读取这个文件 如果某一行包含 ${file} ，跳过
                // 把读取的内容在当前路径重新生成一份新的 index.js
                const str = await removeRouterIndexRequireModule(thisFilePath, moduleName)
                fs.writeFileSync(thisFilePath, str)
            }
        }
    }
}

/**
 * @description 递归删除这个文件夹下的所有文件和文件夹，包括自己
 * @param {String} readPath 需要删除的文件夹目录
 */
const deleteAllFile = (readPath) => {
    if (fs.existsSync(readPath)) {
        const files = fs.readdirSync(readPath)
        for (const file of files) {
            const currentReadPath = path.resolve(readPath, file)
            const stat = fs.statSync(currentReadPath)
            if (stat.isDirectory()) {
                deleteAllFile(currentReadPath)
            }
            if (stat.isFile()) {
                fs.unlinkSync(currentReadPath)
            }
        }
        fs.rmdirSync(readPath)
    }
}

/**
 * @description 读取生产环境下的 /src/router/index.js，排除包含该模块的行，将过滤后的文本生成一份新的index.js文件
 * @param {String} filePath pupublog.sql的数据库文件路径
 * @param {String} moduleName 需要删除的模块名
 * @return {Promise<String>} result 处理后的字符串
 */
async function removeRouterIndexRequireModule(filePath, moduleName) {
    const fileStream = fs.createReadStream(filePath);
    let result = ''
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // 注意：我们使用 crlfDelay 选项将 filePath 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。

    for await (const line of rl) {
        // filePath 中的每一行在这里将会被连续地用作 `line`。
        /**
         * 1、获取到 /src/router/index.js 文件的位置
         * 2、一行一行读取
         * 3、排除包含该模块的行
         * 4、将读取后的文本内容生成一份新的index.js文件
         */
        if (line.indexOf(`/${moduleName}'`) === -1) {
            result += `${line}\n`
        }
    }
    return result
}

module.exports = {
    removeModule,
}
