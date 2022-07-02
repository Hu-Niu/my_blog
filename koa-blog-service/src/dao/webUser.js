const {
    saveWebUserSql,
    deleteWebUserByUidSql,
    updateWebUserByUidSql,
    queryWebUserPageSql,
    queryWebUserSql,
    queryAllCountWebUserSql,
    queryWebUserByUserTelSql,
    queryWebUserByUidSql,
    queryWebUserAllSql,
} = require('../sql/webUser')
const query = require('../utils/db')

const saveWebUser = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, userTel,userProfile, userWechat, userMicroblog,
        userGitee, userGithub, userQq, userEmail,
        userPassword, nickName, userPosition, userCompany,
        userWebsite, userIntro, gender, userIdentity,loginIpAddress,
        lastLoginTime, accountStatus, dataAuditStatus, accountSource,
        orderNum, createTime, updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveWebUserSql,
        [
            uid, userTel,userProfile, userWechat, userMicroblog,
            userGitee, userGithub, userQq, userEmail,
            userPassword, nickName, userPosition, userCompany,
            userWebsite, userIntro, gender, userIdentity,loginIpAddress,
            lastLoginTime, accountStatus, dataAuditStatus, accountSource,
            orderNum, createTime, updateTime
        ]
    )
    return true
}


const queryWebUserPage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        userTel,userProfile, userWechat, userMicroblog, userGitee,
        userGithub, userQq, userEmail, userPassword,
        nickName, userPosition, userCompany, userWebsite,
        userIntro, gender, userIdentity,loginIpAddress, lastLoginTime,
        accountStatus, dataAuditStatus, accountSource, orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryWebUserPageSql,
        [
            `%${userTel}%`,
            `%${userProfile}%`,
            `%${userWechat}%`,
            `%${userMicroblog}%`,
            `%${userGitee}%`,
            `%${userGithub}%`,
            `%${userQq}%`,
            `%${userEmail}%`,
            `%${userPassword}%`,
            `%${nickName}%`,
            `%${userPosition}%`,
            `%${userCompany}%`,
            `%${userWebsite}%`,
            `%${userIntro}%`,
            `${gender}`,
            `${userIdentity}`,
            `%${loginIpAddress}%`,
            `%${lastLoginTime}%`,
            `${accountStatus}`,
            `${dataAuditStatus}`,
            `%${accountSource}%`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryWebUser = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        userTel,userProfile, userWechat, userMicroblog, userGitee,
        userGithub, userQq, userEmail, userPassword,
        nickName, userPosition, userCompany, userWebsite,
        userIntro, gender, userIdentity,loginIpAddress, lastLoginTime,
        accountStatus, dataAuditStatus, accountSource, orderNum
    }  = params


    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryWebUserSql,
        [
            `%${userTel}%`,
            `%${userProfile}%`,
            `%${userWechat}%`,
            `%${userMicroblog}%`,
            `%${userGitee}%`,
            `%${userGithub}%`,
            `%${userQq}%`,
            `%${userEmail}%`,
            `%${userPassword}%`,
            `%${nickName}%`,
            `%${userPosition}%`,
            `%${userCompany}%`,
            `%${userWebsite}%`,
            `%${userIntro}%`,
            `${gender}`,
            `${userIdentity}`,
            `%${loginIpAddress}%`,
            `%${lastLoginTime}%`,
            `${accountStatus}`,
            `${dataAuditStatus}`,
            `%${accountSource}%`,
            `${orderNum}`,
        ])
}

const queryAllCountWebUser = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        userTel, userWechat, userMicroblog, userGitee,
        userGithub, userQq, userEmail, userPassword,
        nickName, userPosition, userCompany, userWebsite,
        userIntro, gender, userIdentity,loginIpAddress, lastLoginTime,
        accountStatus, dataAuditStatus, accountSource, orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountWebUserSql,
        [
            `%${userTel}%`,
            `%${userWechat}%`,
            `%${userMicroblog}%`,
            `%${userGitee}%`,
            `%${userGithub}%`,
            `%${userQq}%`,
            `%${userEmail}%`,
            `%${userPassword}%`,
            `%${nickName}%`,
            `%${userPosition}%`,
            `%${userCompany}%`,
            `%${userWebsite}%`,
            `%${userIntro}%`,
            `${gender}`,
            `${userIdentity}`,
            `%${loginIpAddress}%`,
            `%${lastLoginTime}%`,
            `${accountStatus}`,
            `${dataAuditStatus}`,
            `%${accountSource}%`,
            `${orderNum}`
        ])
    return result[0]
}


const updateWebUserByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, userTel,userProfile, userWechat, userMicroblog,
        userGitee, userGithub, userQq, userEmail,
        userPassword, nickName, userPosition, userCompany,
        userWebsite, userIntro, gender, userIdentity,loginIpAddress,
        lastLoginTime, accountStatus, dataAuditStatus, accountSource,
        orderNum, createTime, updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateWebUserByUidSql,
        [
            userTel,userProfile, userWechat, userMicroblog, userGitee,
            userGithub, userQq, userEmail, userPassword,
            nickName, userPosition, userCompany, userWebsite,
            userIntro, gender, userIdentity,loginIpAddress, lastLoginTime,
            accountStatus, dataAuditStatus, accountSource, orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteWebUserByUid = async (uid) => {
    return await query(deleteWebUserByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const queryWebUserByUserTel = async (userTel) => {
    const resultArr = await query(queryWebUserByUserTelSql, [userTel])
    return resultArr[0]
}

const queryWebUserByUid = async (uid) => {
    const resultArr = await query(queryWebUserByUidSql, [uid])
    return resultArr[0]
}

const queryWebUserAll = async () => {
    return await query(queryWebUserAllSql, [])
}

module.exports = {
    saveWebUser,
    deleteWebUserByUid,
    updateWebUserByUid,
    queryWebUserPage,
    queryWebUser,
    queryAllCountWebUser,
    queryWebUserByUserTel,
    queryWebUserByUid,
    queryWebUserAll,
}
