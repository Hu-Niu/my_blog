const {
    getRequiredColumns,
    getAllColumnsName,
    convertToString,
    hyphenToSmallHump,
    hyphenToBigHump,
    hyphenToConstant,
    excludeSomeColumns,
    getNotNullColumns,
    getColumnsDefaultValues,
    setDefaultValuePlaceholder,
    setDefaultValueAsEmptyStringPlaceholder,
    setVerityParamsCommentPlaceholder,
    setVerityTemporaryParamsPlaceholder,
    setVerityParamsJudgePlaceholder,
} = require('../../parseUtils')


/**
 * @description 接收参数注释占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionValidationSaveInterfaceReceiveParamsCommentPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         属性为必填，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid,create_time,update_time
     *         根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *         例如： * @param blogTitle 不能为空\n * @param isOriginal 不能为空\n
     */
    console.log('ValidationSaveInterfaceReceiveParamsCommentPlaceholder 替换')
    // 1、获取排除过 'uid', 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getRequiredColumns(tableData),
        ['uid', 'create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 4、拼接字符串
    return setVerityParamsCommentPlaceholder(smallHumpColumns)
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionValidationSaveInterfaceReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         属性为必填，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid,create_time,update_time
     */
    console.log('ValidationSaveInterfaceReceiveParamsPlaceholder 替换')
    // 1、获取排除过 'uid', 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getRequiredColumns(tableData),
        ['uid', 'create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4,4)
}

/**
 * @description 临时参数占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionValidationSaveInterfaceTemporaryParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         属性为必填，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid,create_time,update_time
     *         根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *         例如：    let _blogTitle = isEmpty(blogTitle) ? '' : blogTitle\n    let _isOriginal = isEmpty(isOriginal) ? '' : isOriginal\n
     */
    console.log('ValidationSaveInterfaceTemporaryParamsPlaceholder 替换')
    // 1、获取排除过 'uid', 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getRequiredColumns(tableData),
        ['uid', 'create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、设置临时参数
    return setVerityTemporaryParamsPlaceholder(smallHumpColumns)
}

/**
 * @description 参数校验占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionValidationSaveInterfaceParamsVerifyPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         属性为必填，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid,create_time,update_time
     *         根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *         例如：    if (!_blogTitle) {\n        return {\n            errorMsg: 'blogTitle不能为空',\n            isValid,\n        }\n    }\n
     */
    console.log('ValidationSaveInterfaceParamsVerifyPlaceholder 替换')
    // 1、获取排除过 'uid', 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getRequiredColumns(tableData),
        ['uid', 'create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、设置参数校验字符串
    return setVerityParamsJudgePlaceholder(smallHumpColumns)
}


/**
 * @description 接收参数注释占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionValidationUpdateInterfaceReceiveParamsCommentPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         属性为必填，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 create_time,update_time
     *         根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *         例如： * @param blogTitle 不能为空\n * @param isOriginal 不能为空\n
     */
    console.log('ValidationUpdateInterfaceReceiveParamsCommentPlaceholder 替换')
    // 1、获取排除过 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getRequiredColumns(tableData),
        ['create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 4、拼接字符串
    return setVerityParamsCommentPlaceholder(smallHumpColumns)
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionValidationUpdateInterfaceReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         属性为必填，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 create_time,update_time
     */
    console.log('ValidationUpdateInterfaceReceiveParamsPlaceholder 替换')
    // 1、获取排除过 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getRequiredColumns(tableData),
        ['create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4,4)
}

/**
 * @description 临时参数占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionValidationUpdateInterfaceTemporaryParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         属性为必填，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 create_time,update_time
     *         根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *         例如：    let _blogTitle = isEmpty(blogTitle) ? '' : blogTitle\n    let _isOriginal = isEmpty(isOriginal) ? '' : isOriginal\n
     */
    console.log('ValidationUpdateInterfaceTemporaryParamsPlaceholder 替换')
    // 1、获取排除过 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getRequiredColumns(tableData),
        ['create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、设置临时参数
    return setVerityTemporaryParamsPlaceholder(smallHumpColumns)
}

/**
 * @description 参数校验占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionValidationUpdateInterfaceParamsVerifyPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         属性为必填，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 create_time,update_time
     *         根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *         例如：    if (!_blogTitle) {\n        return {\n            errorMsg: 'blogTitle不能为空',\n            isValid,\n        }\n    }\n
     */
    console.log('ValidationUpdateInterfaceParamsVerifyPlaceholder 替换')
    // 1、获取排除过 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getRequiredColumns(tableData),
        ['create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、设置参数校验字符串
    return setVerityParamsJudgePlaceholder(smallHumpColumns)
}


module.exports = {
    transitionValidationSaveInterfaceReceiveParamsCommentPlaceholder,
    transitionValidationSaveInterfaceReceiveParamsPlaceholder,
    transitionValidationSaveInterfaceTemporaryParamsPlaceholder,
    transitionValidationSaveInterfaceParamsVerifyPlaceholder,

    transitionValidationUpdateInterfaceReceiveParamsCommentPlaceholder,
    transitionValidationUpdateInterfaceReceiveParamsPlaceholder,
    transitionValidationUpdateInterfaceTemporaryParamsPlaceholder,
    transitionValidationUpdateInterfaceParamsVerifyPlaceholder,

}
