const resCode = require('../../constant/resCode')
const {APP} = require('../../constant/resCodeVariable')
/**
 * @desc 统一接口返回格式中间件
 */
const formatResponse = (option = {}) => {
    return async (ctx, next) => {
        /**
         * @desc 接口访问成功时返回到前台数据，统一封装，返回到前台的数据格式为
         *       {
         *           code: 1,
         *           msg: 'success',
         *           data: {}
         *       }
         * @param {Object} data 返回的数据
         * @param {String} successMsg 提示信息
         * @param {Number} code 状态码
         * @param {String} type 返回的数据类型
         */
        ctx.success = (data = {}, successMsg, code, type = 'json') => {
            ctx.type = type || option.type || 'json'
            ctx.body = {
                code: code || option.successCode || resCode.get(APP.SUCCESS).code,
                msg: successMsg || option.successMsg || resCode.get(APP.SUCCESS).msg,
                data
            }
        }

        /**
         * @desc 接口访问失败时返回到前台的数据 统一封装，返回到前台的数据格式为
         *       {
         *           code: 状态码,
         *           msg: ‘错误提示信息’
         *       }
         * @param {String} msg 错误提示信息
         * @param {Number} code 错误码
         * @param extendInfo 补充信息
         */
        ctx.fail = ({msg, code} = {},extendInfo) => {
            ctx.type = option.type || 'json'
            ctx.body = {
                code: code || option.failCode || resCode.get(APP.FAIL).code,
                msg: msg || option.failMsg || resCode.get(APP.FAIL).msg,
                extendInfo
            }
        }

        await next()

    }

}

module.exports = formatResponse
