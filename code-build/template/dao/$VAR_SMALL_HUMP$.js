const {
    save$VAR_BIG_HUMP$Sql,
    delete$VAR_BIG_HUMP$ByUidSql,
    update$VAR_BIG_HUMP$ByUidSql,
    query$VAR_BIG_HUMP$PageSql,
    queryAllCount$VAR_BIG_HUMP$Sql,
    query$VAR_BIG_HUMP$By$VAR_DAO_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP$Sql,
    query$VAR_BIG_HUMP$ByUidSql,
    query$VAR_BIG_HUMP$AllSql,
} = require('../sql/$VAR_SMALL_HUMP$')
const query = require('../utils/db')

const save$VAR_BIG_HUMP$ = async (params) => {
    /**
     * 模式：$保存接口，参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    let {
        $VAR_DAO_SAVE_INTERFACE_RECEIVE_PARAMS$
    } = params

    /**
     * 模式：$保存接口，sql参数接收$
     * 替换方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串
     */
    await query(
        save$VAR_BIG_HUMP$Sql,
        [
            $VAR_DAO_SAVE_INTERFACE_SQL_RECEIVE_PARAMS$
        ]
    )
    return true
}


const query$VAR_BIG_HUMP$Page = async (params) => {
    /**
     * 模式：$分页查询接口，参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    let {
        currentPage, pageSize,
        $VAR_DAO_QUERY_PAGE_INTERFACE_RECEIVE_PARAMS$
    }  = params

    let _currentPage = (currentPage - 1) * pageSize

    /**
     * 模式：$分页查询接口，sql参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid，新增 currentPage, pageSize
     */
    return await query(
        query$VAR_BIG_HUMP$PageSql,
        [
$VAR_DAO_QUERY_PAGE_INTERFACE_SQL_RECEIVE_PARAMS$,
            _currentPage,
            pageSize
        ])
}
const queryAllCount$VAR_BIG_HUMP$ = async (params) => {
    /**
     * 模式：$查询接口，查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    let {
        $VAR_DAO_QUERY_COUNT_INTERFACE_RECEIVE_PARAMS$
    }  = params

    /**
     * 模式：$查询接口，sql查询总条数参数接收$
     * 模式解析方式：提取解析过的数据表，默认值不为null的字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid
     */
    const result = await query(
        queryAllCount$VAR_BIG_HUMP$Sql,
        [
$VAR_DAO_QUERY_COUNT_INTERFACE_SQL_RECEIVE_PARAMS$
        ])
    return result[0]
}


const update$VAR_BIG_HUMP$ByUid = async (params) => {
    /**
     * 模式：$更新接口，参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    let {
        $VAR_DAO_UPDATE_INTERFACE_RECEIVE_PARAMS$
    } = params

    /**
     * 模式：$更新接口，sql参数接收$
     * 模式解析方式：提取出所有解析过的数据表字段，将连字符变量，替换为为小驼峰格式字符串，排除 uid createTime,updateTime
     */
    await query(
        update$VAR_BIG_HUMP$ByUidSql,
        [
            $VAR_DAO_UPDATE_INTERFACE_SQL_RECEIVE_PARAMS$,
            createTime, updateTime, uid
        ]
    )
    return true
}

const delete$VAR_BIG_HUMP$ByUid = async (uid) => {
    return await query(delete$VAR_BIG_HUMP$ByUidSql, [uid])
}

/**
 * 模式 $查询接口 第二个参数大驼峰$ $查询接口 第二个参数小驼峰$
 *  替换方式：获取第二个参数，转换为大驼峰和小驼峰的格式
 */
const query$VAR_BIG_HUMP$By$VAR_DAO_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP$ = async ($VAR_DAO_QUERY_INTERFACE_SECOND_PARAM_SMALL_HUMP$) => {
    const resultArr = await query(query$VAR_BIG_HUMP$By$VAR_DAO_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP$Sql, [$VAR_DAO_QUERY_INTERFACE_SECOND_PARAM_SMALL_HUMP$])
    return resultArr[0]
}

const query$VAR_BIG_HUMP$ByUid = async (uid) => {
    const resultArr = await query(query$VAR_BIG_HUMP$ByUidSql, [uid])
    return resultArr[0]
}

const query$VAR_BIG_HUMP$All = async () => {
    return await query(query$VAR_BIG_HUMP$AllSql, [])
}

module.exports = {
    save$VAR_BIG_HUMP$,
    delete$VAR_BIG_HUMP$ByUid,
    update$VAR_BIG_HUMP$ByUid,
    query$VAR_BIG_HUMP$Page,
    queryAllCount$VAR_BIG_HUMP$,
    query$VAR_BIG_HUMP$By$VAR_DAO_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP$,
    query$VAR_BIG_HUMP$ByUid,
    query$VAR_BIG_HUMP$All,
}
