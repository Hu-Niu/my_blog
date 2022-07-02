const {
    getAllColumnsName,
    getNotNullColumns,
    convertToString,
    hyphenToSmallHump,
    hyphenToBigHump,
    excludeSomeColumns,
    excludeSomeColumnsType,
    setFuzzyQueryString,
} = require('../../parseUtils')

/**
 * @description 第二个参数大驼峰格式占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionDaoQueryInterfaceSecondParamBigHumpPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         取第二个参数
     *         将连字符变量，替换为为大驼峰格式字符串，
     */
    console.log('DaoQueryInterfaceSecondParamBigHumpPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、转换为小驼峰格式
    const bigHumpColumns = hyphenToBigHump(allColumns)
    // 3、返回第二个参数
    return bigHumpColumns[1]

}

/**
 * @description 第二个参数小驼峰格式占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionDaoQueryInterfaceSecondParamSmallHumpPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         取第二个参数
     *         将连字符变量，替换为为小驼峰格式字符串，
     */
    console.log('DaoQueryInterfaceSecondParamSmallHumpPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(allColumns)
    // 3、返回第二个参数
    return smallHumpColumns[1]
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionDaoSaveInterfaceReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         将连字符变量，替换为为小驼峰格式字符串，
     */
    console.log('DaoSaveInterfaceReceiveParamsPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(allColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionDaoSaveInterfaceSqlReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         将连字符变量，替换为为小驼峰格式字符串，
     */
    console.log('DaoSaveInterfaceSqlReceiveParamsPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(allColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 12)
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionDaoQueryPageInterfaceReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid
     */
    console.log('DaoQueryPageInterfaceReceiveParamsPlaceholder 替换')
    // 1、获取排除过 'uid'字段的列名
    const excludedColumns = excludeSomeColumns(
        getNotNullColumns(tableData),
        ['uid']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionDaoQueryPageInterfaceSqlReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid
     *         需根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *         例如：            `%${blogTitle}%`,\n            `%${blogAuthorId}%`,\n
     *         注意：区分int类型和varchar类型的模糊查询，int类型不带%，varchar类型带%
     *         巧用like %% 和 like xx
     */
    console.log('DaoQueryPageInterfaceSqlReceiveParamsPlaceholder 替换')
    // 1、获取排除过 'uid' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getNotNullColumns(tableData),
        ['uid']
    )
    // 2、获取排除过 'uid' 字段的列名类型
    const excludedColumnsType = excludeSomeColumnsType(
        tableData,
        excludedColumns
    )
    // 3、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 4、拼接模糊查询字符串 区分int类型和varchar类型的模糊查询，int类型不带%，varchar类型带%
    return setFuzzyQueryString(smallHumpColumns,excludedColumnsType)
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionDaoQueryCountInterfaceReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid
     */
    console.log('DaoQueryCountInterfaceReceiveParamsPlaceholder 替换')
    // 1、获取排除过 'uid' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getNotNullColumns(tableData),
        ['uid']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionDaoQueryCountInterfaceSqlReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid
     *         需根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *         例如：            `%${blogTitle}%`,\n            `%${blogAuthorId}%`,\n
     */
    console.log('DaoQueryCountInterfaceSqlReceiveParamsPlaceholder 替换')
    // 1、获取排除过 'uid' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getNotNullColumns(tableData),
        ['uid']
    )
    // 2、获取排除过 'uid' 字段的列名类型
    const excludedColumnsType = excludeSomeColumnsType(
        tableData,
        excludedColumns
    )
    // 3、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 4、拼接模糊查询字符串 区分int类型和varchar类型的模糊查询，int类型不带%，varchar类型带%
    return setFuzzyQueryString(smallHumpColumns,excludedColumnsType)
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionDaoUpdateInterfaceReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         将连字符变量，替换为为小驼峰格式字符串，
     */
    console.log('DaoUpdateInterfaceReceiveParamsPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(allColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionDaoUpdateInterfaceSqlReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid,create_time,update_time
     */
    console.log('DaoUpdateInterfaceSqlReceiveParamsPlaceholder 替换')
    // 1、获取排除过 'uid', 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getAllColumnsName(tableData),
        ['uid', 'create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 12)
}

module.exports = {
    transitionDaoQueryInterfaceSecondParamBigHumpPlaceholder,
    transitionDaoQueryInterfaceSecondParamSmallHumpPlaceholder,
    transitionDaoSaveInterfaceReceiveParamsPlaceholder,
    transitionDaoSaveInterfaceSqlReceiveParamsPlaceholder,
    transitionDaoQueryPageInterfaceReceiveParamsPlaceholder,
    transitionDaoQueryPageInterfaceSqlReceiveParamsPlaceholder,
    transitionDaoQueryCountInterfaceReceiveParamsPlaceholder,
    transitionDaoQueryCountInterfaceSqlReceiveParamsPlaceholder,
    transitionDaoUpdateInterfaceReceiveParamsPlaceholder,
    transitionDaoUpdateInterfaceSqlReceiveParamsPlaceholder,

}
