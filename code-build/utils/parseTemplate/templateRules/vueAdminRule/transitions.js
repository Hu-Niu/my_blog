const {
    smallHumpToSmallHumpHyphen,

    getAllColumnsName,
    getNotNullColumns,
    convertToString,
    hyphenToSmallHump,
    hyphenToBigHump,
    excludeSomeColumns,
    getChineseColumnsAnnotation,
    convertToFilterInputBoxString,
    convertToTableContentString,
    convertToAddOrModifyDialogContentString,
    convertToFormContentDataString,
    convertToSearchParamContentDataString,
    convertToAddEventFormDataInitString,
    convertToEditMethodFormContentDataString,
} = require('../../parseUtils')

/**
 * @description 小驼峰替换为类名格式字符串 替换
 * @param {String} moduleName 模块名
 * @return {String} 处理过的，占位符替换内容
 */
const transitionClassNamePlaceholder = (moduleName) => {
    /**
     * 替换方式：小驼峰替换为类名格式字符串
     */
    console.log('VAR_CLASS_NAME 替换')
    return smallHumpToSmallHumpHyphen([moduleName])[0]
}

/**
 * @description 筛选条件输入框占位符替换 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionVueAdminVueFileFilterInputBoxPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         转换为小驼峰格式
     *         排除 uid、create_time、update_time
     *         例如：<el-input clearable style="width: 150px;" v-model="searchParam.sortName" placeholder="请输入分类名" @keyup.enter.native="handleFind"/>
     *         注意：请输入分类名，汉字提示用注释里的中文冒号提取出来，注释都按照 ${分类名：存储分类的名字} 格式命名的
     *                 <el-input
                            clearable
                            style="width: 150px;"
                            v-model="searchParam.sortName"
                            placeholder="请输入分类名"
                            @keyup.enter.native="handleFind"
                         />
     */
    console.log('vueAdminVueFileFilterInputBoxPlaceholder 替换')
    // 1、获取排除过 uid、create_time、update_time 字段的列名
    const excludedColumns = excludeSomeColumns(
        getNotNullColumns(tableData),
        ['uid', 'create_time', 'update_time']
    )
    // 2、获取列名的中文注释
    const chineseColumnsAnnotation = getChineseColumnsAnnotation(tableData, excludedColumns)
    // 3、列名转换为小驼峰
    const smallHumpColumns = hyphenToSmallHump(chineseColumnsAnnotation.map(item => item.label))

    // 3、筛选条件输入框占位符替换
    return convertToFilterInputBoxString(chineseColumnsAnnotation,smallHumpColumns)
}

/**
 * @description 数据表内容占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionVueAdminVueFileTableContentsPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         排除 uid、update_time
     *         例如：
     *               <el-table-column label="分类名" min-width="100" align="center">
     *                   <template slot-scope="scope">
     *                      <span>{{ scope.row.sort_name }}</span>
     *                   </template>
     *               </el-table-column>
     */
    console.log('vueAdminVueFileTableContentsPlaceholder 替换')
    // 1、获取排除过 uid、update_time 字段的列名
    const excludedColumns = excludeSomeColumns(
        getAllColumnsName(tableData),
        ['uid', 'update_time']
    )
    // 2、获取列名的中文注释
    const chineseColumnsAnnotation = getChineseColumnsAnnotation(tableData, excludedColumns)

    // 3、数据表内容占位符替换
    return convertToTableContentString(chineseColumnsAnnotation)
}

/**
 * @description 添加或修改对话框内容占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionVueAdminVueFileAddOrModifyDialogContentPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         排除 uid、create_time、update_time
     *         例如：
     *             <el-row>
     *                 <el-col :span="12">
     *                     <el-form-item label="分类名" label-width="120px" prop="sortName">
     *                        <el-input v-model="form.sortName" auto-complete="off"></el-input>
     *                     </el-form-item>
     *                 </el-col>
     *             </el-row>
     */
    console.log('vueAdminVueFileAddOrModifyDialogContentPlaceholder 替换')
    // 1、获取排除过 uid、create_time、update_time 字段的列名
    const excludedColumns = excludeSomeColumns(
        getAllColumnsName(tableData),
        ['uid', 'create_time','update_time']
    )
    // 2、获取列名的中文注释
    const chineseColumnsAnnotation = getChineseColumnsAnnotation(tableData, excludedColumns)

    // 3、列名转换为小驼峰
    const smallHumpColumns = hyphenToSmallHump(chineseColumnsAnnotation.map(item => item.label))

    // 4、添加或修改对话框内容占位符替换
    return convertToAddOrModifyDialogContentString(chineseColumnsAnnotation,smallHumpColumns)
}

/**
 * @description form内容数据占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionVueAdminVueFileFormContentDataPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         转换为小驼峰格式
     *         排除 uid、create_time、update_time
     *         例如：
     *               form: {
     *                   sortName: null,
     *                   intro: null,
     *                   order: null
     *               }
     */
    console.log('vueAdminVueFileFormContentDataPlaceholder 替换')
    // 1、获取排除过 uid、create_time、update_time 字段的列名
    const excludedColumns = excludeSomeColumns(
        getAllColumnsName(tableData),
        ['uid', 'create_time','update_time']
    )
    // 2、列名转换为小驼峰
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、form内容数据占位符 替换
    return convertToFormContentDataString(smallHumpColumns)
}

/**
 * @description searchParam内容数据占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionVueAdminVueFileSearchParamContentDataPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         有默认值，且默认值不为null，
     *         排除 uid、create_time、update_time
     *         例如：
     *                searchParam: {
     *                   sortName: null,
     *                 }
     */
    console.log('vueAdminVueFileSearchParamContentDataPlaceholder 替换')
    // 1、获取排除过 uid、create_time、update_time 字段的列名
    const excludedColumns = excludeSomeColumns(
        getNotNullColumns(tableData),
        ['uid', 'create_time','update_time']
    )
    // 2、列名转换为小驼峰
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、searchParam内容数据占位符 替换
    return convertToSearchParamContentDataString(smallHumpColumns)
}

/**
 * @description 添加事件form数据初始化占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionVueAdminVueFileAddEventFormDataInitPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         转换为小驼峰格式
     *         排除 uid、create_time、update_time
     *         例如：
     *                this.form = {
     *                   sortName: null,
     *                   intro: null,
     *                   order: null
     *                 }
     */
    console.log('vueAdminVueFileAddEventFormDataInitPlaceholder 替换')
    // 1、获取排除过 uid、create_time、update_time 字段的列名
    const excludedColumns = excludeSomeColumns(
        getAllColumnsName(tableData),
        ['uid', 'create_time','update_time']
    )
    // 2、列名转换为小驼峰
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)
    // 3、添加事件form数据初始化占位符 替换
    return convertToAddEventFormDataInitString(smallHumpColumns)
}

/**
 * @description 编辑方法form内容数据占位符 替换
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 处理过的，占位符替换内容
 */
const transitionVueAdminVueFileEditMethodFormContentDataPlaceholder = (tableData) => {
    /**
     * 替换方式：从tableData提取出所有列名，
     *         转换为小驼峰格式
     *         排除 create_time、update_time
     *         例如：
     *                this.form = {
     *                   sortName: row.sort_name,
     *                   intro: row.intro,
     *                   order: row.order_num,
     *                   uid: row.uid
     *                 }
     */
    console.log('vueAdminVueFileEditMethodFormContentDataPlaceholder 替换')
    // 1、获取排除过 create_time、update_time 字段的列名
    const excludedColumns = excludeSomeColumns(
        getAllColumnsName(tableData),
        ['create_time','update_time']
    )
    // 2、对应的小驼峰格式列名
    const smallHumpColumns = hyphenToSmallHump(excludedColumns)

    // 3、编辑方法form内容数据占位符 替换
    return convertToEditMethodFormContentDataString(smallHumpColumns,excludedColumns)
}


module.exports = {
    transitionClassNamePlaceholder,

    transitionVueAdminVueFileFilterInputBoxPlaceholder,
    transitionVueAdminVueFileTableContentsPlaceholder,
    transitionVueAdminVueFileAddOrModifyDialogContentPlaceholder,
    transitionVueAdminVueFileFormContentDataPlaceholder,
    transitionVueAdminVueFileSearchParamContentDataPlaceholder,
    transitionVueAdminVueFileAddEventFormDataInitPlaceholder,
    transitionVueAdminVueFileEditMethodFormContentDataPlaceholder,
}
