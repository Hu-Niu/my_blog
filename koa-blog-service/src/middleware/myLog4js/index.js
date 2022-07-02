const log4js = require('log4js');
const access = require("./access.js");
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]

const baseInfo = {
    appLogLevel: 'debug',
    dir: 'logs',
    env: 'dev',
}

module.exports = (options) => {
    const contextLogger = {}
    const appenders = {}
    const {env, appLogLevel, dir} = baseInfo

    appenders.cheese = {
        type: 'dateFile',
        filename: `${dir}/task`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
    }

    if (env === "dev" || env === "local" || env === "development") {
        appenders.out = {
            type: "console"
        }
    }
    let config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    }

    const logger = log4js.getLogger('cheese');

    return async (ctx, next) => {
        const start = Date.now()

        log4js.configure(config)
        methods.forEach(method => {
            contextLogger[method] = (message) => {
                logger[method](access(ctx, message))
            }
        })
        ctx.log = contextLogger;
        try {
            await next()
            console.log(ctx.status, 'ctx.statusctx.statusctx.statusctx.status')
            switch (ctx.status) {
                case 401:
                    ctx.log.warn({
                        msg: `接口未授权`
                    })
                    break
                case 404:
                    ctx.log.warn({
                        msg: `接口不存在`
                    })
                    break
                case 405:
                    ctx.log.warn({
                        msg: `方法不被允许 Method Not Allowed`
                    })
                    break
                default :
                    const responseTime = Date.now() - start;
                    ctx.log.info({
                        responseTime: `响应时间为${responseTime / 1000}s`
                    })
            }
        } catch (e) {
            ctx.log.error(e.stack);
            ctx.throw(e);
        }

    }
}
