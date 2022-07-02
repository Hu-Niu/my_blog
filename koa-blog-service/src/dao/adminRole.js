const {
    saveAdminRoleSql,
    deleteAdminRoleByUidSql,
    updateAdminRoleByUidSql,
    queryAdminRolePageSql,
    queryAllCountAdminRoleSql,
    queryAdminRoleByRoleNameSql,
    queryAdminRoleByUidSql,
    queryAdminRoleAllSql,
} = require('../sql/adminRole')
const query = require('../utils/db')

const saveAdminRole = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, roleName, roleIntro, orderNum,
        createTime, updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveAdminRoleSql,
        [
            uid, roleName, roleIntro, orderNum,
            createTime, updateTime
        ]
    )
    return true
}


const queryAdminRolePage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        roleName, roleIntro, orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryAdminRolePageSql,
        [
            `%${roleName}%`,
            `%${roleIntro}%`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountAdminRole = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        roleName, roleIntro, orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountAdminRoleSql,
        [
            `%${roleName}%`,
            `%${roleIntro}%`,
            `${orderNum}`
        ])
    return result[0]
}


const updateAdminRoleByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, roleName, roleIntro, orderNum,
        createTime, updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateAdminRoleByUidSql,
        [
            roleName, roleIntro, orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteAdminRoleByUid = async (uid) => {
    return await query(deleteAdminRoleByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const queryAdminRoleByRoleName = async (roleName) => {
    const resultArr = await query(queryAdminRoleByRoleNameSql, [roleName])
    return resultArr[0]
}

const queryAdminRoleByUid = async (uid) => {
    const resultArr = await query(queryAdminRoleByUidSql, [uid])
    return resultArr[0]
}

const queryAdminRoleAll = async () => {
    return await query(queryAdminRoleAllSql, [])
}

module.exports = {
    saveAdminRole,
    deleteAdminRoleByUid,
    updateAdminRoleByUid,
    queryAdminRolePage,
    queryAllCountAdminRole,
    queryAdminRoleByRoleName,
    queryAdminRoleByUid,
    queryAdminRoleAll,
}
