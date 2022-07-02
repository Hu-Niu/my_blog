const fs = require('fs')
const {errCodeModuleVerify} = require('./regular')

const {
    pathDevelop,
} = require('../../config')

const readPath = pathDevelop.productionConstantResCodeVariableJsPath
const errCodeModuleDefaultValue = pathDevelop.errCodeModuleDefaultValue

console.log(readPath,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

/**
 * @description 解析 src/constant/resCodeVariable.js 文件， 获取已声明过的错误码模块名称
 * @return {Array} result 已声明过的错误码模块名称
 */
const getErrorCodeModule = () => {
    console.log('获取已声明的错误码模块')
    /**
     * 1、读取 src/constant/resCodeVariable.js 文件
     * 2、使用正则获取所有模块名
     * 3、如果没有匹配到 就给个默认值
     */
    let result = []

    if (fs.existsSync(readPath)) {
        const file = fs.readFileSync(readPath,'utf-8')
        result = errCodeModuleVerify(file)
    }

    return result.length > 0 ? result : [errCodeModuleDefaultValue]

}

module.exports = {
    getErrorCodeModule,
}
