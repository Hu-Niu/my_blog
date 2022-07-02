/**
 * 一旦部署服务器记得修改几处地方
 * 1、mysql配置的用户名和密码
 * 2、baseUrl 改成服务器地址
 * 3、giteeLogin 里的client_id 和 client_secret 你自己在gitee上申请的
 * 4、qqLogin 里的client_id 和 client_secret 你在qq互联里申请的，域名备案成功后才能申请
 */



// mysql配置
const database = {
    host: '039.106.76.25', // 连接的服务器（代码托管到线上后，需改为内网IP，而非外网）
    port: 3306, // mysql服务运行的端口
    database: 'pupublog', // 连接的数据库
    user: 'pupublog', // 用户名
    password: '123123' //用户密码

    // host:'39.106.76.25',
    // port:'3306',
    // user:'experrApp',
    // password:'12345678',
    // database:'experrapp'
}

/**
 * 1、如果是本地运行
 *  http://localhost:20517
 * 2、如果是部署到服务器，正式生产环境
 *  http://api.bnbiye.cn
 * 3、如果是部署到演示环境
 *  http://8.141.57.223:20517
 *
 */
const baseUrl = 'http://localhost:20517'


const keys = 'secret' // 设置token时的key

// 后台管理员登录默认失效时间
const expires = 3600 // token默认过期时间，单位是秒 3600s就是一小时

const restPassword = '123123' // 默认重置的密码

// 单位是KB 最大上传文件大小
const maxFileSize = 5 * 1024 * 1024 // 5M 最大上传文件大小  1M = 1024 KB  1 KB = 1024 Bytes  1 Bytes = 8 Bit

/**
 * Gitee登录相关参数 https://www.eoway.cn/article/1603360705.html
 *
 * 1、如果是本地运行
 *  client_id: '26444783acc7336684cf1e73d6ffd4140c774100f651ae0d0979017cbc4fc1e3',
 *  client_secret: '1f7aed7978e13824bc64b6bd86d0a91a79926f8a83b4e175d70a5e16a30a063c',
 *
 * 2、如果是线上运行，正式环境
 *  client_id: '3b96ac6294c2b72b5a665049554ad79a25da6f2e1e68ab4e2a4d554c3aa495bf',
 *  client_secret: '0db54df0cac1e7e756b4a365b19e8fb548b1c195ddd179d4c8788ad53028be2f',
 *
 * 2、如果是线上演示环境
 *  client_id: 'd6f106cf3b5e3c5f2daf58b7174219c1b818de1ce3d2476e2a6459a15f7a056d',
 *  client_secret: '03606ba9c4cc7b47b0844c97d67a5f9b26f08d5c27703074f51c471c310c3187',
 *
 */
const giteeLogin = {
    client_id: '26444783acc7336684cf1e73d6ffd4140c774100f651ae0d0979017cbc4fc1e3',
    client_secret: '1f7aed7978e13824bc64b6bd86d0a91a79926f8a83b4e175d70a5e16a30a063c',
    expires: 3600, // token默认过期时间，单位是秒 3600s就是一小时
}

/**
 * qq登录
 *
 */
const qqLogin = {
    client_id: '101976645', // 就是你的appId
    client_secret: 'e442ba232f1e632ce90a000f1d77f1f5', // 就是你的appKey
    expires: 3600, // token默认过期时间，单位是秒 3600s就是一小时
}
/**
 * 微博登录
 *
 */
const weiboLogin = {
    client_id: '350202904', // 就是你的app key
    client_secret: 'eadd947bd7e3f919d63d95758b7e3b96', // 就是你的App Secret
    expires: 3600, // token默认过期时间，单位是秒 3600s就是一小时
}

/*
* 1. 线上环境配置跨域，配置成一个正则表达式
*  /bnbiye.cn/
* 2. 本地启动
* /localhost/
* */
const cosWhiteList = /localhost/


module.exports = {
    database,
    baseUrl,
    keys,
    expires,
    restPassword,
    maxFileSize,
    giteeLogin,
    weiboLogin,
    qqLogin,
    cosWhiteList,
}
