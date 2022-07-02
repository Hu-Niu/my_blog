const {
    saveContactWaySql,
    deleteContactWayByUidSql,
    updateContactWayByUidSql,
    queryContactWayPageSql,
    queryAllCountContactWaySql,
    queryContactWayByContactWaySql,
    queryContactWayByUidSql,
    queryContactWayAllSql,
} = require('../sql/contactWay')
const query = require('../utils/db')

const saveContactWay = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        uid, contactWay, wayNum, wayIconName,iconColor,linkAddress,
        isShow, orderNum, createTime, updateTime
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        saveContactWaySql,
        [
            uid, contactWay, wayNum, wayIconName,iconColor,linkAddress,
            isShow, orderNum, createTime, updateTime
        ]
    )
    return true
}


const queryContactWayPage = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        contactWay, wayNum, wayIconName,iconColor,linkAddress, isShow,
        orderNum
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        queryContactWayPageSql,
        [
            `%${contactWay}%`,
            `%${wayNum}%`,
            `%${wayIconName}%`,
            `%${iconColor}%`,
            `%${linkAddress}%`,
            `${isShow}`,
            `${orderNum}`,
            _currentPage,
            pageSize
        ])
}
const queryAllCountContactWay = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        contactWay, wayNum, wayIconName, iconColor,linkAddress,isShow,
        orderNum
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCountContactWaySql,
        [
            `%${contactWay}%`,
            `%${wayNum}%`,
            `%${wayIconName}%`,
            `%${iconColor}%`,
            `%${linkAddress}%`,
            `${isShow}`,
            `${orderNum}`
        ])
    return result[0]
}


const updateContactWayByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        uid, contactWay, wayNum, wayIconName,iconColor,linkAddress,
        isShow, orderNum, createTime, updateTime
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        updateContactWayByUidSql,
        [
            contactWay, wayNum, wayIconName,iconColor,linkAddress, isShow,
            orderNum,
            createTime, updateTime, uid
        ]
    )
    return true
}

const deleteContactWayByUid = async (uid) => {
    return await query(deleteContactWayByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const queryContactWayByContactWay = async (contactWay) => {
    const resultArr = await query(queryContactWayByContactWaySql, [contactWay])
    return resultArr[0]
}

const queryContactWayByUid = async (uid) => {
    const resultArr = await query(queryContactWayByUidSql, [uid])
    return resultArr[0]
}

const queryContactWayAll = async (params) => {
    let {
        contactWay, wayNum, wayIconName,iconColor,linkAddress, isShow,
        orderNum
    }  = params

    return await query(queryContactWayAllSql, [
        `%${contactWay}%`,
        `%${wayNum}%`,
        `%${wayIconName}%`,
        `%${iconColor}%`,
        `%${linkAddress}%`,
        `${isShow}`,
        `${orderNum}`,
    ])
}

module.exports = {
    saveContactWay,
    deleteContactWayByUid,
    updateContactWayByUid,
    queryContactWayPage,
    queryAllCountContactWay,
    queryContactWayByContactWay,
    queryContactWayByUid,
    queryContactWayAll,
}
