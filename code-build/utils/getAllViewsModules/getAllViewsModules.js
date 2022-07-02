const fs = require('fs')
const {
    pathDevelop
} = require('../../config')

const readPath = pathDevelop.productionViewsPath

/**
 * @description 解析 vue-blog-admin/src/views/目录下所有文件名，获取到已创建过的前端模块名
 * @return {Array} result 解析出来的所有错误码模块
 */
const getAllViewsModules = () => {
    console.log('开始解析所有已创建过的前端模块')
    let result = []
    if (fs.existsSync(readPath)) {
        result = fs.readdirSync(readPath)
    }
    return result
}

module.exports = {
    getAllViewsModules
}
