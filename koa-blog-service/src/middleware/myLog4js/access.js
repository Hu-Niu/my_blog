const ip = require("ip")

// 打印公共信息
const commonInfo = {
    projectName: 'koa-blog-service',
    serverIp: ip.address(),
}
/**
 * 记录用户端信息函数
 * @param {any} ctx  全局上下文参数
 * @param {string} message  log 打印信息
 * @returns
 */
module.exports = (ctx, message) => {
    let {
        method,
        url,
        host,
        headers,
        ip,
    } = ctx.request;
    const client = {
        method,
        path: `${host}${url}`,
        ip: ip.replace('::ffff:',''),
        message,
        userAgent: headers['user-agent']
    }

    return JSON.stringify(Object.assign(commonInfo, client)).replace(/\\n /g, "\n");
}
