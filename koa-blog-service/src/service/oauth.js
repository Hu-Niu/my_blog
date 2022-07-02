const webUserController = require('../controller/webUser')
const adminUserService = require('../service/adminUser')

const axios = require('axios')
const {giteeLogin} = require('../constant/config')
const {qqLogin} = require('../constant/config')
const {weiboLogin} = require('../constant/config')
const {baseUrl} = require('../constant/config')


/**
 * Gitee登录
 * 1、后端获取 code
 * 2、使用 code 获取 access_token
 * 3、使用 access_token 获取用户信息
 */
const oauthGitee = async code => {
    let myToken; // 自己生成的token

    // 1、使用 code 获取 access_token
    let {access_token} = await getGiteeAccessToken(code)

    // 2、使用 access_token 获取用户信息
    let userInfo = await getGiteeUserInfoByAccessToken(access_token)

    // 3、判断数据库中是否已经存过当前用户的信息
    let findResult = await getUserInfoFromDataBase(userInfo, 'Gitee')
    console.log(findResult, 'findResult findResult findResult')

    if (!findResult) { // 如果没有存在 保存数据到数据库中
        console.log('不存在，保存数据')
        let saveResult = await saveInfoToDataBase(userInfo, 'Gitee')
        if (saveResult) {
            // 4、生成token返回给前台，获取用户信息
            let dataBaseUserInfo = await getUserInfoFromDataBase(userInfo, 'Gitee')
            // 生成token
            myToken = await adminUserService.generateToken(dataBaseUserInfo, giteeLogin.expires, 'webUser')
        }
    } else { // 已存在不需要保存
        console.log('已存在，不需要保存')
        // 生成token
        myToken = await adminUserService.generateToken(findResult, giteeLogin.expires, 'webUser')
    }

    return Promise.resolve({
        loginSuccess: true, // 登录成功
        token: myToken
    })

}
/**
 * QQ登录
 * 1、后端获取 code
 * 2、使用 code 获取 access_token
 * 3、使用 access_token 获取 openid
 * 4、使用 access_token openid 获取用户信息
 */
const oauthQQ = async code => {
    let myToken; // 自己生成的token
    console.log(code, 'qq code')

    // 1、使用 code 获取 access_token
    let {access_token} = await getQQAccessToken(code)
    console.log(access_token, 'access_token')

    // 2、使用 access_token 获取 openid
    let {openid} = await getQQOpenIdByAccessToken(access_token)
    console.log(openid, 'openid')

    // 3、使用 access_token 和 openid 获取 用户信息
    let userInfo = await getQQUserInfoByAccessTokenAndOpenid(access_token, openid)
    console.log(userInfo, 'userInfo')

    // 4、判断数据库中是否已经存过当前用户的信息
    let findResult = await getUserInfoFromDataBase(userInfo, 'QQ')
    console.log(findResult,'findResult findResult findResult')

    if (!findResult) { // 如果没有存在 保存数据到数据库中
        console.log('不存在，保存数据')
        let saveResult = await saveInfoToDataBase(userInfo, 'QQ')
        if(saveResult){
            // 4、生成token返回给前台，获取用户信息
            let dataBaseUserInfo = await getUserInfoFromDataBase(userInfo, 'QQ')
            // 生成token
            myToken = await adminUserService.generateToken(dataBaseUserInfo,qqLogin.expires,'webUser')
        }
    } else { // 已存在不需要保存
        console.log('已存在，不需要保存')
        // 生成token
        myToken = await adminUserService.generateToken(findResult,qqLogin.expires,'webUser')
    }

    return Promise.resolve({
        loginSuccess: true, // 登录成功
        token: myToken
    })

}

/**
 * 微博登录
 * 1、后端获取 code
 * 2、使用 code 获取 access_token
 * 3、使用 access_token 获取用户信息
 */
const oauthWeiboConfirm = async code => {
    let myToken // 自己生成的token
    console.log(code, 'qq code')
    // 1、使用 code 获取 access_token
    let {access_token, uid} = await getWeiboAccessToken(code)
    console.log(access_token, 'access_token')
    // 2、使用 access_token 获取 用户信息
    let userInfo = await getWeiboUserInfoByAccessToken(access_token, uid)
    console.log(userInfo, 'userInfo')
    // 4、判断数据库中是否已经存过当前用户的信息
    let findResult = await getUserInfoFromDataBase(userInfo, 'Microblog')
    console.log(findResult,'findResult findResult findResult')

    if (!findResult) { // 如果没有存在 保存数据到数据库中
        console.log('不存在，保存数据')
        let saveResult = await saveInfoToDataBase(userInfo, 'Microblog')
        if(saveResult){
            // 4、生成token返回给前台，获取用户信息
            let dataBaseUserInfo = await getUserInfoFromDataBase(userInfo, 'Microblog')
            // 生成token
            myToken = await adminUserService.generateToken(dataBaseUserInfo,weiboLogin.expires,'webUser')
        }
    } else { // 已存在不需要保存
        console.log('已存在，不需要保存')
        // 生成token
        myToken = await adminUserService.generateToken(findResult,weiboLogin.expires,'webUser')
    }

    return Promise.resolve({
        loginSuccess: true, // 登录成功
        token: myToken
    })

}

/**
 * @description 判断第三方数据是否已经在数据库中保存过
 * @param {Object} userInfo 第三方获取来的用户信息
 * @param {String} accountSource 用户信息获取来源：Gitee、Github、Microblog、QQ
 * @return {Boolean} true：存在；false：不存在
 */
async function getUserInfoFromDataBase(userInfo, accountSource) {
    // 拼接个参数，利用已有接口，从数据库查询当前用户是否存在
    const params = {
        request: {
            body: {
                accountSource,
                internalCalls: true, // 内部调用，不是接口，模拟个ctx
            }
        }
    }
    switch (accountSource) {
        case 'Gitee':
            params.request.body.userGitee = userInfo.login
            break
        case 'QQ':
            params.request.body.userQq = userInfo.openid
            break
        case 'Microblog':
            params.request.body.userMicroblog = userInfo.idstr
            break

    }

    console.log(params, 'getUserInfoFromDataBase')

    let findResult = await webUserController.queryWebUser(params)

    return findResult[0]
}

/**
 * @description 保存第三方信息到数据库中
 * @param {Object} userInfo 第三方获取来的用户信息
 * @param {String} accountSource 用户信息获取来源：Gitee、Github、Microblog、QQ
 */
async function saveInfoToDataBase(userInfo, accountSource) {

    // 内部调用，不是接口，模拟个ctx
    const params = {
        request: {
            body: {}
        }
    }

    switch (accountSource) {
        case 'Gitee':
            params.request.body = {
                accountSource,
                userGitee: userInfo.login,
                nickName: userInfo.name,
                userProfile: userInfo.avatar_url,
                userEmail: userInfo.email,
                internalCalls: true, // 内部调用，不是接口，模拟个ctx
            }
            break
        case 'QQ':
            params.request.body = {
                accountSource,
                userQq: userInfo.openid,
                nickName: userInfo.nickname,
                userProfile: userInfo.figureurl_qq_2,
                gender: userInfo.gender_type,
                internalCalls: true, // 内部调用，不是接口，模拟个ctx
            }
            break
        case 'Microblog':
            params.request.body = {
                accountSource,
                userMicroblog: userInfo.idstr,
                nickName: userInfo.name,
                userProfile: userInfo.avatar_large,
                internalCalls: true, // 内部调用，不是接口，模拟个ctx
            }
            break


    }

    console.log(params, 'saveInfoToDataBase')

    await webUserController.saveWebUser(params)

    return true
}

function getGiteeUserInfoByAccessToken(access_token) {
    return new Promise((resolve, reject) => {
        let option = {
            method: 'get',
            url: `https://gitee.com/api/v5/user`,
            params: {
                access_token
            }
        }
        axios(option).then(async res => {
            if (res.status === 200) {
                resolve(res.data)
            }
        }).catch(err => {
            console.log(err, 'getGiteeUserInfoByAccessToken')
            reject(err)
        })
    })
}

function getQQOpenIdByAccessToken(access_token) {
    return new Promise((resolve, reject) => {
        let option = {
            method: 'get',
            url: `https://graph.qq.com/oauth2.0/me`,
            params: {
                access_token
            }
        }
        axios(option).then(async res => {
            // callback( {"client_id":"101976645","openid":"2FAD4E4983918F90B4716FDDE01BF923"} );

            const result  = parseQQOpenidStringToObject(res.data)
            console.log(result, 'getQQOpenIdByAccessToken success')
            if(result.openid) {
                resolve(result)
            }else {
                reject({
                    loginSuccess: false, // 登录失败
                    errMsg: result.msg ? result.msg : ''
                })
            }
        }).catch(err => {
            console.log(err, 'getQQOpenIdByAccessToken')
            reject({
                loginSuccess: false, // 登录失败
                errMsg: err.msg ? err.msg : ''
            })
        })
    })
}
// // callback( {"client_id":"101976645","openid":"2FAD4E4983918F90B4716FDDE01BF923"} );
function parseQQOpenidStringToObject (str) {
    const reg = /\{.*\}/
    const str2=  reg.exec(str)[0] // {"client_id":"101976645","openid":"2FAD4E4983918F90B4716FDDE01BF923"}
    return JSON.parse(str2)
}

function getQQUserInfoByAccessTokenAndOpenid(access_token, openid) {
    return new Promise((resolve, reject) => {
        let option = {
            method: 'get',
            url: `https://graph.qq.com/user/get_user_info`,
            params: {
                access_token,
                openid,
                oauth_consumer_key: qqLogin.client_id
            }
        }
        axios(option).then(async res => {
            const result = res.data
            console.log(result, 'getQQUserInfoByAccessTokenAndOpenid success')
            if(result.ret === 0){
                // 返回结果没有这个账号的openid，我们把它带上，用作这个qq号的的唯一标识
                result.openid = openid
                resolve(result)
            }else {
                reject({
                    loginSuccess: false, // 登录失败
                    errMsg: result.msg ? result.msg : ''
                })
            }
        }).catch(err => {
            console.log(err, 'getQQUserInfoByAccessTokenAndOpenid error')
            reject({
                loginSuccess: false, // 登录失败
                errMsg: err.msg ? err.msg : ''
            })
        })
    })
}

function getWeiboUserInfoByAccessToken(access_token, uid) {
    // uid是微博用户的id
    return new Promise((resolve, reject) => {
        let option = {
            method: 'get',
            url: `https://api.weibo.com/2/users/show.json`,
            params: {
                access_token,
                uid,
            }
        }
        axios(option).then(async res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err, 'getWeiboUserInfoByAccessToken error')
            reject({
                loginSuccess: false, // 登录失败
                errMsg: err.msg ? err.msg : ''
            })
        })
    })
}



function getGiteeAccessToken(code) {
    return new Promise((resolve, reject) => {
        let client_id = giteeLogin.client_id
        let client_secret = giteeLogin.client_secret
        let redirect_uri = `${baseUrl}/oauth/callback/gitee`

        let option = {
            method: 'post',
            url: `https://gitee.com/oauth/token`,
            data: {
                grant_type: 'authorization_code',
                code,
                client_id,
                client_secret,
                redirect_uri
            }
        }

        axios(option).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            }
        }).catch(err => {
            console.log(err, 'getGiteeAccessToken')
            reject({
                loginSuccess: false, // 登录失败
                errMsg: err.response ? err.response.data.error_description : ''
            })
        })

    })

}

function getQQAccessToken(code) {
    return new Promise((resolve, reject) => {
        let client_id = qqLogin.client_id
        let client_secret = qqLogin.client_secret
        let redirect_uri = `${baseUrl}/oauth/callback/qq`
        axios.get(
            `https://graph.qq.com/oauth2.0/token`,
            {
                params: {
                    grant_type: 'authorization_code',
                    client_id,
                    client_secret,
                    code,
                    redirect_uri,
                }
            }
        ).then(res => {
            // data: 'access_token=89AFF8548B91EE7ED107DA451E313AB4&expires_in=7776000&refresh_token=9CC01E7751C7604EE73886CA140D326B'
            const result = serializeStringToObject(res.data)
            console.log(result, 'getQQAccessToken success')
            if(result.access_token) {
                resolve(result)
            }else {
                reject({
                    loginSuccess: false, // 登录失败
                    errMsg: result.msg ? result.msg : ''
                })
            }

        }).catch(err => {
            console.log(err, 'getQQAccessToken error')
            reject({
                loginSuccess: false, // 登录失败
                errMsg: err.msg ? err.msg : ''
            })
        })
    })

}

function getWeiboAccessToken(code) {
    return new Promise((resolve, reject) => {
        let client_id = weiboLogin.client_id
        let client_secret = weiboLogin.client_secret
        let redirect_uri = `${baseUrl}/oauth/callback/weiboConfirm`

        let option = {
            method: 'post',
            url: `https://api.weibo.com/oauth2/access_token`,
            params: {
                grant_type: 'authorization_code',
                code,
                client_id,
                client_secret,
                redirect_uri
            }
        }

        console.log(option,'getWeiboAccessToken')


        axios(option).then(res => {
            const result = res.data
            console.log(result, 'getWeiboAccessToken success')
            if(result.access_token) {
                resolve(result)
            }else {
                reject({
                    loginSuccess: false, // 登录失败
                    errMsg: result.msg ? result.msg : ''
                })
            }

        }).catch(err => {
            console.log(err, 'getWeiboAccessToken error')
            reject({
                loginSuccess: false, // 登录失败
                errMsg: err.error_description ? err.error_description : ''
            })
        })
    })

}

// 将序列化字符串转为对象
// data: 'access_token=89AFF8548B91EE7ED107DA451E313AB4&expires_in=7776000&refresh_token=9CC01E7751C7604EE73886CA140D326B'
function serializeStringToObject (str) {
    const result = {}
    str.split('&').forEach(item=>{
        const tempArr = item.split('=')
        result[tempArr[0]] = tempArr[1]
    })

    return result
}


module.exports = {
    oauthGitee,
    oauthQQ,
    oauthWeiboConfirm,
}
