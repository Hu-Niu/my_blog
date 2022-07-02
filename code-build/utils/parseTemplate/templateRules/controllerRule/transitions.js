const {
    pathDevelop,
} = require('../../../../config')

const errCodeModuleDefaultValue = pathDevelop.errCodeModuleDefaultValue

const {
    getRequiredColumns,
    getAllColumnsName,
    getNotNullColumnsType,
    convertToString,
    hyphenToSmallHump,
    hyphenToBigHump,
    hyphenToConstant,
    excludeSomeColumns,
    getNotNullColumns,
    getColumnsDefaultValues,
    setDefaultValuePlaceholder,
    setDefaultValueAsEmptyStringPlaceholder,
} = require('../../parseUtils')

/**
 * @description 错误码模块声明占位符 替换
 * @param {String} errCodeModule 错误码模块名
 * @return {String} 处理过的，占位符替换内容
 */
const transitionDeclarationErrorCodeModulePlaceholder = (errCodeModule) => {
    /**
     * 替换方式：判断 errCodeModule === 'APP'
     *         如果等于，declarationErrorCodeModulePlaceholder = APP
     *         如果不等于，declarationErrorCodeModulePlaceholder = errCodeModule, APP
     */
    return errCodeModule === errCodeModuleDefaultValue ? errCodeModuleDefaultValue : `${errCodeModule} ,${errCodeModuleDefaultValue}`
}

/**
 * @description 错误码模块使用占位符 替换
 * @param {String} errCodeModule 错误码模块名
 * @return {String} 处理过的，占位符替换内容
 */
const transitionUseErrorCodeModulePlaceholder = (errCodeModule) => {
    /**
     * 替换方式：替换为 errCodeModule
     */
    // 这个 errCodeModule 在从控制台选择的之前就是提前定义好的 比如 APP、USER等 所以直接返回
    return errCodeModule
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerSaveInterfaceReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid,create_time,update_time
     */
    console.log('ControllerSaveInterfaceReceiveParamsPlaceholder 替换')
    // 1、获取排除过 'uid', 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getAllColumnsName(tableData),
        ['uid', 'create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

/**
 * @description 校验参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerSaveInterfaceReceiveVerifyParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         属性为必填，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid,create_time,update_time
     */
    console.log('ControllerSaveInterfaceReceiveVerifyParamsPlaceholder 替换')
    // 1、获取排除过 'uid', 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getRequiredColumns(tableData),
        ['uid', 'create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

/**
 * @description 默认值设置占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerSaveInterfaceSetDefaultValuePlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid,create_time,update_time
     *         需根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *         例如：blogSummary = blogSummary ? blogSummary : ''\nrecommendLevel = recommendLevel ? recommendLevel : '-1'\n
     */
    console.log('ControllerSaveInterfaceSetDefaultValuePlaceholder 替换')
    // 1、获取排除过 'uid', 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getNotNullColumns(tableData),
        ['uid', 'create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、获取默认值
    const defaultValues = getColumnsDefaultValues(tableData, excludedColumns)
    // smallHumpColumns和defaultValues 是一一对应的，列名-默认值

    // 4、拼接字符串
    return setDefaultValuePlaceholder(smallHumpColumns, defaultValues)
}

/**
 * @description 参数封装占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerSaveInterfaceParamsPackagePlaceholder = (tableData) => {
    /**
     *  替换方式：从tableData提取出所有列名，
     *          将连字符变量，替换为为小驼峰格式字符串，
     *          排除 uid,create_time,update_time
     */
    console.log('ControllerSaveInterfaceParamsPackagePlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(allColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

/**
 * @description 第二个参数大驼峰格式占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerSaveInterfaceSecondParamBigHumpPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         取第二个参数
     *         将连字符变量，替换为为大驼峰格式字符串，
     */
    console.log('ControllerSaveInterfaceSecondParamBigHumpPlaceholder 替换')
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
const transitionControllerSaveInterfaceSecondParamSmallHumpPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         取第二个参数
     *         将连字符变量，替换为为小驼峰格式字符串，
     */
    console.log('ControllerSaveInterfaceSecondParamSmallHumpPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(allColumns)
    // 3、返回第二个参数
    return smallHumpColumns[1]
}

/**
 * @description 第二个参数常量格式占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerSaveInterfaceSecondParamConstantPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         取第二个参数
     *         将连字符变量，替换为为常量格式字符串，
     */
    console.log('ControllerSaveInterfaceSecondParamConstantPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、转换为常量格式
    const constantColumns = hyphenToConstant(allColumns)
    // 3、返回第二个参数
    return constantColumns[1]

}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerQueryPageInterfaceReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null
     *         将连字符变量，替换为为小驼峰格式字符串，
     */
    console.log('ControllerQueryPageInterfaceReceiveParamsPlaceholder 替换')
    // 1、获取 有默认值，且默认值不为null 字段的列名
    const notNullColumns = getNotNullColumns(tableData)
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(notNullColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

/**
 * @description 默认值设置为空字符串占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerQueryPageInterfaceSetDefaultValueAsEmptyStringPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         需根据数据循环拼接字符串，关键值使用列名的小驼峰格式，默认值设为空字符串
     *         例如：blogSummary = blogSummary ? blogSummary : ''\nrecommendLevel = recommendLevel ? recommendLevel : ''\n
     *         注意：区分int类型和varchar类型的模糊查询，int类型有值就是值，无值就是% varchar类型有值就是值，无值就是''
     */
    console.log('ControllerQueryPageInterfaceSetDefaultValueAsEmptyStringPlaceholder 替换')
    // 1、获取 有默认值，且默认值不为null， 字段的列名
    const notNullColumns = getNotNullColumns(tableData)
    // 2、获取 有默认值，且默认值不为null， 字段的类型
    const notNullColumnsType = getNotNullColumnsType(tableData)
    // 3、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(notNullColumns)
    // 4、设置默认值为空字符串或% int类型有值就是值，无值就是% varchar类型有值就是值，无值就是''
    return setDefaultValueAsEmptyStringPlaceholder(smallHumpColumns, notNullColumnsType)
}

/**
 * @description 参数封装占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerQueryPageInterfaceParamsPackagePlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         将连字符变量，替换为为小驼峰格式字符串，
     */
    console.log('ControllerQueryPageInterfaceParamsPackagePlaceholder 替换')
    // 1、获取 有默认值，且默认值不为null 字段的列名
    const notNullColumns = getNotNullColumns(tableData)
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(notNullColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

/**
 * @description 参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerUpdateInterfaceReceiveParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 create_time,update_time
     */
    console.log('ControllerUpdateInterfaceReceiveParamsPlaceholder 替换')
    // 1、获取排除过 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getAllColumnsName(tableData),
        ['create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

/**
 * @description 校验参数接收占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerUpdateInterfaceReceiveVerifyParamsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         属性为必填，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 create_time,update_time
     */
    console.log('ControllerUpdateInterfaceReceiveVerifyParamsPlaceholder 替换')
    // 1、获取排除过 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getRequiredColumns(tableData),
        ['create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

/**
 * @description 默认值设置占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerUpdateInterfaceSetDefaultValuePlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 uid,create_time,update_time
     *         需根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *         例如：blogSummary = blogSummary ? blogSummary : ''\nrecommendLevel = recommendLevel ? recommendLevel : '-1'\n
     */
    console.log('ControllerUpdateInterfaceSetDefaultValuePlaceholder 替换')
    // 1、获取排除过 'uid', 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getNotNullColumns(tableData),
        ['uid', 'create_time', 'update_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、获取默认值
    const defaultValues = getColumnsDefaultValues(tableData, excludedColumns)
    // smallHumpColumns和defaultValues 是一一对应的，列名-默认值

    // 4、拼接字符串
    return setDefaultValuePlaceholder(smallHumpColumns, defaultValues)
}

/**
 * @description 参数封装占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionControllerUpdateInterfaceParamsPackagePlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         将连字符变量，替换为为小驼峰格式字符串，
     *         排除 create_time
     */
    console.log('ControllerUpdateInterfaceParamsPackagePlaceholder 替换')
    // 1、获取排除过 'uid', 'create_time', 'update_time' 字段的列名
    const excludedColumns = excludeSomeColumns(
        getAllColumnsName(tableData),
        ['create_time']
    )
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、拼接字符串
    return convertToString(smallHumpColumns, 4, 8)
}

module.exports = {
    transitionDeclarationErrorCodeModulePlaceholder,
    transitionUseErrorCodeModulePlaceholder,
    transitionControllerSaveInterfaceReceiveParamsPlaceholder,
    transitionControllerSaveInterfaceReceiveVerifyParamsPlaceholder,
    transitionControllerSaveInterfaceSetDefaultValuePlaceholder,
    transitionControllerSaveInterfaceParamsPackagePlaceholder,
    transitionControllerSaveInterfaceSecondParamBigHumpPlaceholder,
    transitionControllerSaveInterfaceSecondParamSmallHumpPlaceholder,
    transitionControllerSaveInterfaceSecondParamConstantPlaceholder,

    transitionControllerQueryPageInterfaceReceiveParamsPlaceholder,
    transitionControllerQueryPageInterfaceSetDefaultValueAsEmptyStringPlaceholder,
    transitionControllerQueryPageInterfaceParamsPackagePlaceholder,

    transitionControllerUpdateInterfaceReceiveParamsPlaceholder,
    transitionControllerUpdateInterfaceReceiveVerifyParamsPlaceholder,
    transitionControllerUpdateInterfaceSetDefaultValuePlaceholder,
    transitionControllerUpdateInterfaceParamsPackagePlaceholder,

}
