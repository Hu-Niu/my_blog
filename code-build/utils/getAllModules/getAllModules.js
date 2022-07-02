const fs = require('fs')
const {
    pathDevelop
} = require('../../config')

const readPath = pathDevelop.productionControllerPath

/**
 * @description 解析 src/controller/目录下所有文件名，获取到已创建过的模块名
 * @param {String} format 获取模块名的格式：全大写 UpperCase、或全小写 LowerCase、默认是原名
 * @return {Array} result 解析出来的所有错误码模块
 */
const getAllModules = (format = '') => {
    console.log('开始解析所有已创建过的模块')
    let result = []
    if (fs.existsSync(readPath)) {
        const folders = fs.readdirSync(readPath)
        if (folders.length > 0) {
            result = folders.reduce((prev, current) => {
                switch (format) {
                    case 'UpperCase':
                        prev.push(current.split('.')[0].toUpperCase())
                        break
                    case 'LowerCase':
                        break
                    default:
                        prev.push(current.split('.')[0])

                }
                return prev
            }, [])
        }

    }
    return result
}

module.exports = {
    getAllModules
}
