const {
    getAllColumnsName,
    getNotNullColumns,
    convertToString,
    hyphenToSmallHump,
    hyphenToBigHump,
    excludeSomeColumns,
    setFuzzyQueryString,
    setQuestionMarkPlaceholderString,
    convertToQuestionMarkString1,
    convertToQuestionMarkString2,
} = require('../../parseUtils')


/**
 * @description 第二个参数大驼峰格式占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionSqlQueryInterfaceSecondParamBigHumpPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         取第二个参数
     *         将连字符变量，替换为为大驼峰格式字符串，
     */
    console.log('SqlQueryInterfaceSecondParamBigHumpPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、转换为小驼峰格式
    const bigHumpColumns = hyphenToBigHump(allColumns)
    // 3、返回第二个参数
    return bigHumpColumns[1]

}

/**
 * @description 第二个参数 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionSqlQueryInterfaceSecondParamPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         取第二个参数
     */
    console.log('SqlQueryInterfaceSecondParamPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、返回第二个参数
    return allColumns[1]
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionSqlSaveInterfaceReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     */
    console.log('SqlSaveInterfaceReceiveParamsPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、拼接字符串
    return convertToString(allColumns, 4, 8)
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionSqlSaveInterfaceReceiveParamsQuestionMarkPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         需根据数据循环拼接 ? 占位符 字符串
     *         例如：?,?,?,?,?,?,?,?,?,?,?,?,?,?
     */
    console.log('SqlSaveInterfaceReceiveParamsQuestionMarkPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、根据列名拼接 ? 占位符字符串
    return setQuestionMarkPlaceholderString(allColumns)
}

/**
 * @description 参数接收问号占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionSqlUpdateInterfaceReceiveParamsQuestionMarkPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         排除 uid
     *         需根据数据循环拼接字符串，关键值使用原列名
     *         例如：blog_title = ?, blog_summary = ?, blog_author_id = ?,
     */
    console.log('SqlUpdateInterfaceReceiveParamsQuestionMarkPlaceholder 替换')
    // 1、获取排除过 'uid' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getAllColumnsName(tableData),
        ['uid']
    )
    // 3、拼接接收问号占位符字符串
    return convertToQuestionMarkString1(excludedColumns, 4, 8)
}

/**
 * @description 参数接收问号占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionSqlQueryPageInterfaceReceiveParamsQuestionMarkPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         排除 uid
     *         例如：blog_title like ?\n        and blog_author_id like ?
     */
    console.log('SqlQueryPageInterfaceReceiveParamsQuestionMarkPlaceholder 替换')
    // 1、获取排除过 'uid' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getNotNullColumns(tableData),
        ['uid']
    )
    // 2、拼接接收问号占位符字符串
    return convertToQuestionMarkString2(excludedColumns)
}

/**
 * @description 参数接收问号占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionSqlQueryCountInterfaceReceiveParamsQuestionMarkPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         排除 uid
     *         例如：blog_title like ?\n        and blog_author_id like ?
     */
    console.log('SqlQueryCountInterfaceReceiveParamsQuestionMarkPlaceholder 替换')
    // 1、获取排除过 'uid' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getNotNullColumns(tableData),
        ['uid']
    )
    // 2、拼接接收问号占位符字符串
    return convertToQuestionMarkString2(excludedColumns)
}

module.exports = {
    transitionSqlQueryInterfaceSecondParamBigHumpPlaceholder,
    transitionSqlQueryInterfaceSecondParamPlaceholder,
    transitionSqlSaveInterfaceReceiveParamsPlaceholder,
    transitionSqlSaveInterfaceReceiveParamsQuestionMarkPlaceholder,
    transitionSqlUpdateInterfaceReceiveParamsQuestionMarkPlaceholder,
    transitionSqlQueryPageInterfaceReceiveParamsQuestionMarkPlaceholder,
    transitionSqlQueryCountInterfaceReceiveParamsQuestionMarkPlaceholder,
}
