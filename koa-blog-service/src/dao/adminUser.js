const {
    saveAdminUserSql,
    deleteAdminUserByUidSql,
    updateAdminUserByUidSql,
    queryAdminUserPageSql,
    queryAllCountAdminUserSql,
    queryAdminUserByUserNameSql,
    queryAdminUserByUidSql,
    queryAdminUserAllSql,
    queryUserByUsernameSql,
    adminResetPasswordByUidSql,
} = require('../sql/adminUser')
const query = require('../utils/db')

const saveAdminUser = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, userName, userPassword, userProfile,
        nickName,userIntro, userProfession,roleId, gender, loginIpAddress,
        lastLoginTime, orderNum, createTime, updateTime,userEmail
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveAdminUserSql,
        [
            uid, userName, userPassword, userProfile,
            nickName,userIntro,userProfession,userEmail, roleId, gender, loginIpAddress,
            lastLoginTime, orderNum, createTime, updateTime
        ]
    )
    return true
}


const queryAdminUserPage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        userName, userPassword, nickName, roleId,
        gender, loginIpAddress, lastLoginTime, orderNum,userEmail
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryAdminUserPageSql,
        [
            `%${userName}%`,
            `%${userPassword}%`,
            `%${nickName}%`,
            `%${userEmail}%`,
            `%${roleId}%`,
            `${gender}`,
            `%${loginIpAddress}%`,
            `%${lastLoginTime}%`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountAdminUser = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        userName, userPassword, nickName, roleId,userEmail,
        gender, loginIpAddress, lastLoginTime, orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountAdminUserSql,
        [
            `%${userName}%`,
            `%${userPassword}%`,
            `%${nickName}%`,
            `%${userEmail}%`,
            `%${roleId}%`,
            `${gender}`,
            `%${loginIpAddress}%`,
            `%${lastLoginTime}%`,
            `${orderNum}`
        ])
    return result[0]
}


const updateAdminUserByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, userName, userProfile,
        nickName,userIntro,userProfession, roleId, gender, loginIpAddress,
        lastLoginTime, orderNum, createTime, updateTime,userEmail
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateAdminUserByUidSql,
        [
            userName, userProfile, nickName,userIntro,userProfession,userEmail,
            roleId, gender, loginIpAddress, lastLoginTime,
            orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteAdminUserByUid = async (uid) => {
    return await query(deleteAdminUserByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const queryAdminUserByUserName = async (userName) => {
    const resultArr = await query(queryAdminUserByUserNameSql, [userName])
    return resultArr[0]
}

const queryAdminUserByUid = async (uid) => {
    const resultArr = await query(queryAdminUserByUidSql, [uid])
    return resultArr[0]
}

const queryAdminUserAll = async () => {
    return await query(queryAdminUserAllSql, [])
}

const queryUserByUsername = async (username) => {
    let resultArr = await query(queryUserByUsernameSql, [username])
    return resultArr[0]
}

const adminResetPasswordByUid = async (password, uid) => {
    await query(adminResetPasswordByUidSql, [password, uid])
}

module.exports = {
    saveAdminUser,
    deleteAdminUserByUid,
    updateAdminUserByUid,
    queryAdminUserPage,
    queryAllCountAdminUser,
    queryAdminUserByUserName,
    queryAdminUserByUid,
    queryAdminUserAll,
    queryUserByUsername,
    adminResetPasswordByUid,
}
