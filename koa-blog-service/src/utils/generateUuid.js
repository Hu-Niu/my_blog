// 生成uuid的工具函数
const uuidv1 = require('uuid').v1
const generateUuid = () => {
    return uuidv1()
}

module.exports = generateUuid
