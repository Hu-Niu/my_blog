// &nbsp& 代表注释里的空格
/**
 * 错误模块声明标准格式：const APP = {
 *
 * 1、errCodeModule 错误码模块名：以 const &nbsp& 开始，匹配到 &nbsp& = 结束，中间夹着的字符串
 */
const errCodeModule = /(?<=const ).*?(?= \=)/g


module.exports = {
    errCodeModuleVerify: (file) => {
        return file.match(errCodeModule)
    }
}
