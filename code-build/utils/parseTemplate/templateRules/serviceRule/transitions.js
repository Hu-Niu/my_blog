const {
    getAllColumnsName,
    hyphenToSmallHump,
    hyphenToBigHump,
} = require('../../parseUtils')


/**
 * @description 第二个参数大驼峰格式占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionServiceQueryInterfaceSecondParamBigHumpPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         取第二个参数
     *         将连字符变量，替换为为大驼峰格式字符串，
     */
    console.log('ServiceQueryInterfaceSecondParamBigHumpPlaceholder 替换')
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
const transitionServiceQueryInterfaceSecondParamSmallHumpPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         取第二个参数
     *         将连字符变量，替换为为小驼峰格式字符串，
     */
    console.log('ServiceQueryInterfaceSecondParamSmallHumpPlaceholder 替换')
    // 1、获取所有字段的列名
    const allColumns = getAllColumnsName(tableData)
    // 2、转换为小驼峰格式
    const smallHumpColumns = hyphenToSmallHump(allColumns)
    // 3、返回第二个参数
    return smallHumpColumns[1]
}


module.exports = {
    transitionServiceQueryInterfaceSecondParamBigHumpPlaceholder,
    transitionServiceQueryInterfaceSecondParamSmallHumpPlaceholder,
}
