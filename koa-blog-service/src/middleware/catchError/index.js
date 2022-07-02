const {maxFileSize} = require('../../constant/config')
const {FILE} = require('../../constant/resCodeVariable')
const resCode = require('../../constant/resCode')
// 中间件 全局异常捕获
const catchError = () => {
    return async (ctx, next) => {
        try {
            await next()
        } catch (error) {
            console.log(error, 'errorerrorerrorerror')
            switch (error.name) {
                case FILE.FILE_UPLOAD_ERROR:
                    ctx.fail(
                        resCode.get(FILE.FILE_UPLOAD_ERROR),
                        `文件大小不能超过${maxFileSize / 1024 / 1024}M`
                    )
                    break
                default:
                    ctx.fail({
                        code: 0,
                        msg: '服务端异常',
                        name: error.name
                    })
            }
        }
    }
}

module.exports = catchError
