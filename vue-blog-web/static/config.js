/**
 * 控制是否是演示版本
 *  true：是，演示版本
 *  false：不是
 */
var isDemoVersion = false

var myConfig = {
    // 本地开发时使用
    apiUrlDevelopment: 'http://localhost:20517',
    // 腾讯云部署时使用，线上生产环境
    apiUrlProduction: 'http://api.bnbiye.cn',
    // 线上演示环境
    apiUrlDemo: 'http://8.141.57.223:20517',

}

var articleDetailBaseUrl = {
    // 本地开发时使用
    articleBaseUrlDevelopment: 'http://localhost',
    // 线上生产环境
    articleBaseUrlProduction: 'http://bnbiye.cn',
    // 演示环境
    articleBaseUrlDemo: 'http://8.141.57.223:20517',

}

// gitee登录
var myGiteeLogin = {
    // 本地开发时使用
    client_id_development: '26444783acc7336684cf1e73d6ffd4140c774100f651ae0d0979017cbc4fc1e3',
    // 腾讯云部署时使用，线上正式环境
    client_id_production: '3b96ac6294c2b72b5a665049554ad79a25da6f2e1e68ab4e2a4d554c3aa495bf',
    //线上演示环境
    client_id_demo: 'd6f106cf3b5e3c5f2daf58b7174219c1b818de1ce3d2476e2a6459a15f7a056d',
}

// qq登录
var qqLogin = {
    /*
    * qq登录不区分本地还是线上，只能是带域名的线上，限制的比较死
    * client_id就是申请时的appId
    * */
    client_id: '101976645',
}
// 微博登录
var weiboLogin = {
    /*
    * 微博登录不区分本地还是线上，只能有备案成功后的域名才能申请
    * client_id就是申请时的App Key
    * */
    client_id: '350202904',
}

