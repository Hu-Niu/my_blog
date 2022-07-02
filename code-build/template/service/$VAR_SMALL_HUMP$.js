const $VAR_SMALL_HUMP$Dao = require('../dao/$VAR_SMALL_HUMP$')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const query$VAR_BIG_HUMP$By$VAR_SERVICE_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP$ = async ($VAR_SERVICE_QUERY_INTERFACE_SECOND_PARAM_SMALL_HUMP$) => {
    return await $VAR_SMALL_HUMP$Dao.query$VAR_BIG_HUMP$By$VAR_SERVICE_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP$($VAR_SERVICE_QUERY_INTERFACE_SECOND_PARAM_SMALL_HUMP$)
}

const query$VAR_BIG_HUMP$ByUid = async (uid) => {
    return await $VAR_SMALL_HUMP$Dao.query$VAR_BIG_HUMP$ByUid(uid)
}

const save$VAR_BIG_HUMP$ = async (params) => {
    return await $VAR_SMALL_HUMP$Dao.save$VAR_BIG_HUMP$(params)
}

const query$VAR_BIG_HUMP$Page = async (params) => {
    return await $VAR_SMALL_HUMP$Dao.query$VAR_BIG_HUMP$Page(params)
}

const update$VAR_BIG_HUMP$ByUid = async (params) => {
    return await $VAR_SMALL_HUMP$Dao.update$VAR_BIG_HUMP$ByUid(params)
}

const delete$VAR_BIG_HUMP$ByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push($VAR_SMALL_HUMP$Dao.delete$VAR_BIG_HUMP$ByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCount$VAR_BIG_HUMP$ = async (params) => {
    return await $VAR_SMALL_HUMP$Dao.queryAllCount$VAR_BIG_HUMP$(params)
}

const query$VAR_BIG_HUMP$All = async () => {
    return await $VAR_SMALL_HUMP$Dao.query$VAR_BIG_HUMP$All()
}

module.exports = {
    save$VAR_BIG_HUMP$,
    delete$VAR_BIG_HUMP$ByUid,
    update$VAR_BIG_HUMP$ByUid,
    query$VAR_BIG_HUMP$Page,
    query$VAR_BIG_HUMP$All,
    queryAllCount$VAR_BIG_HUMP$,
    query$VAR_BIG_HUMP$By$VAR_SERVICE_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP$,
    query$VAR_BIG_HUMP$ByUid,
}
