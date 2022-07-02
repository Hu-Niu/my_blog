/**
 * 自定义转换规则，模板中替换时遵循的规则
 *  1、小驼峰：比如 blogTag
 *  2、大驼峰：比如 BlogTag
 *  3、连字符：比如 blog_tag
 *  4、常量：比如 BLOG_TAG
 *  5、表名：比如 t_blog
 *  6、类名：比如 blog-container
 */
//小驼峰格式占位符
const smallHumpPlaceholder = /\$VAR_SMALL_HUMP\$/g
//大驼峰格式占位符
const bigHumpPlaceholder = /\$VAR_BIG_HUMP\$/g
//连字符格式占位符
const hyphenPlaceholder = /\$VAR_HYPHEN\$/g
//常量格式占位符
const constantPlaceholder = /\$VAR_CONSTANT\$/g
//表名占位符
const sqlTableNamePlaceholder = /\$MY_SQL_TABLE_NAME\$/g
//类名占位符
const classNamePlaceholder = /\$VAR_CLASS_NAME\$/g

/**
 * /router/index.js
 * 需要添加声明语句 const $VAR_SMALL_HUMP$Router = require('./$VAR_SMALL_HUMP$')
 * 和使用语句  router.use('/$VAR_SMALL_HUMP$', $VAR_SMALL_HUMP$Router.routes(), $VAR_SMALL_HUMP$Router.allowedMethods())
 * 直接将两句话拼写成一句话 中间用\n空下行
 *
 * 1、写入语句：
 *      匹配源文件index.js最后一行的 module.exports = router
 *      找到它，然后替换成 const $VAR_SMALL_HUMP$Router = require('./$VAR_SMALL_HUMP$')\nrouter.use('/$VAR_SMALL_HUMP$', $VAR_SMALL_HUMP$Router.routes(), $VAR_SMALL_HUMP$Router.allowedMethods())\nmodule.exports = router
 *
 */
const declarationPlaceReg = /module.exports = router/
const declarationStatement = `const $VAR_SMALL_HUMP$Router = require('./$VAR_SMALL_HUMP$')\nrouter.use('/$VAR_SMALL_HUMP$', $VAR_SMALL_HUMP$Router.routes(), $VAR_SMALL_HUMP$Router.allowedMethods())\nmodule.exports = router`

/**
 * /controller/$VAR_SMALL_HUMP$.js
 * 1、错误码模块声明占位符
 * 2、错误码模块使用占位符
 * 3、保存接口 参数接收占位符
 * 4、保存接口 校验参数接收占位符
 * 5、保存接口 参数封装占位符
 * 6、保存接口 第二个参数大驼峰格式占位符
 * 7、保存接口 第二个参数小驼峰格式占位符
 * 8、保存接口 第二个参数常量格式占位符
 * 9、保存接口 默认值设置占位符
 *
 * 10、分页查询接口 参数接收占位符
 * 11、分页查询接口 默认值设置占位符
 * 12、分页查询接口 参数封装占位符
 *
 * 13、更新接口 参数接收占位符
 * 14、更新接口 校验参数接收占位符
 * 15、更新接口 默认值设置占位符
 * 16、更新接口 参数封装占位符
 */

// 13、
const controllerUpdateInterfaceReceiveParamsPlaceholder = /\$VAR_CONTROLLER_UPDATE_INTERFACE_RECEIVE_PARAMS\$/
// 14、
const controllerUpdateInterfaceReceiveVerifyParamsPlaceholder = /\$VAR_CONTROLLER_UPDATE_INTERFACE_RECEIVE_VERIFY_PARAMS\$/
// 15、
const controllerUpdateInterfaceSetDefaultValuePlaceholder = /\$VAR_CONTROLLER_UPDATE_INTERFACE_SET_DEFAULT_VALUE\$/
// 16、
const controllerUpdateInterfaceParamsPackagePlaceholder = /\$VAR_CONTROLLER_UPDATE_INTERFACE_PARAMS_PACKAGE\$/

// 1、
const declarationErrorCodeModulePlaceholder = /\$VAR_DECLARATION_ERROR_CODE_MODULE\$/
// 2、
const useErrorCodeModulePlaceholder = /\$VAR_USE_ERROR_CODE_MODULE\$/g
// 3、
const controllerSaveInterfaceReceiveParamsPlaceholder = /\$VAR_CONTROLLER_SAVE_INTERFACE_RECEIVE_PARAMS\$/
// 4、
const controllerSaveInterfaceReceiveVerifyParamsPlaceholder = /\$VAR_CONTROLLER_SAVE_INTERFACE_RECEIVE_VERIFY_PARAMS\$/
// 5、
const controllerSaveInterfaceParamsPackagePlaceholder = /\$VAR_CONTROLLER_SAVE_INTERFACE_PARAMS_PACKAGE\$/
// 6、
const controllerSaveInterfaceSecondParamBigHumpPlaceholder = /\$VAR_CONTROLLER_SAVE_INTERFACE_SECOND_PARAM_BIG_HUMP\$/
// 7、
const controllerSaveInterfaceSecondParamSmallHumpPlaceholder = /\$VAR_CONTROLLER_SAVE_INTERFACE_SECOND_PARAM_SMALL_HUMP\$/
// 8、
const controllerSaveInterfaceSecondParamConstantPlaceholder = /\$VAR_CONTROLLER_SAVE_INTERFACE_SECOND_PARAM_CONSTANT\$/
// 9、
const controllerSaveInterfaceSetDefaultValuePlaceholder = /\$VAR_CONTROLLER_SAVE_INTERFACE_SET_DEFAULT_VALUE\$/

// 10、
const controllerQueryPageInterfaceReceiveParamsPlaceholder = /\$VAR_CONTROLLER_QUERY_PAGE_INTERFACE_RECEIVE_PARAMS\$/
// 11、
const controllerQueryPageInterfaceSetDefaultValueAsEmptyStringPlaceholder = /\$VAR_CONTROLLER_QUERY_PAGE_INTERFACE_SET_DEFAULT_VALUE_AS_EMPTY_STRING\$/
// 12、
const controllerQueryPageInterfaceParamsPackagePlaceholder = /\$VAR_CONTROLLER_QUERY_PAGE_INTERFACE_PARAMS_PACKAGE\$/


/**
 * /validation/$VAR_SMALL_HUMP$/
 * 1、保存接口 接收参数注释占位符
 * 2、保存接口 参数接收占位符
 * 3、保存接口 临时参数占位符
 * 4、保存接口 参数校验占位符
 *
 * 5、更新接口 接收参数注释占位符
 * 6、更新接口 参数接收占位符
 * 7、更新接口 临时参数占位符
 * 8、更新接口 参数校验占位符
 *
 */
// 1、
const validationSaveInterfaceReceiveParamsCommentPlaceholder = /\$VAR_VALIDATION_SAVE_INTERFACE_RECEIVE_PARAMS_COMMENT\$/
// 2、
const validationSaveInterfaceReceiveParamsPlaceholder = /\$VAR_VALIDATION_SAVE_INTERFACE_RECEIVE_PARAMS\$/
// 3、
const validationSaveInterfaceTemporaryParamsPlaceholder = /\$VAR_VALIDATION_SAVE_INTERFACE_TEMPORARY_PARAMS\$/
// 4、
const validationSaveInterfaceParamsVerifyPlaceholder = /\$VAR_VALIDATION_SAVE_INTERFACE_PARAMS_VERIFY\$/
// 5、
const validationUpdateInterfaceReceiveParamsCommentPlaceholder = /\$VAR_VALIDATION_UPDATE_INTERFACE_RECEIVE_PARAMS_COMMENT\$/
// 6、
const validationUpdateInterfaceReceiveParamsPlaceholder = /\$VAR_VALIDATION_UPDATE_INTERFACE_RECEIVE_PARAMS\$/
// 7、
const validationUpdateInterfaceTemporaryParamsPlaceholder = /\$VAR_VALIDATION_UPDATE_INTERFACE_TEMPORARY_PARAMS\$/
// 8、
const validationUpdateInterfaceParamsVerifyPlaceholder = /\$VAR_VALIDATION_UPDATE_INTERFACE_PARAMS_VERIFY\$/

/**
 * /service/$VAR_SMALL_HUMP$.js
 * 1、查询接口 第二个参数大驼峰格式占位符
 * 2、查询接口 第二个参数小驼峰格式占位符
 */
// 1、
const serviceQueryInterfaceSecondParamBigHumpPlaceholder = /\$VAR_SERVICE_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP\$/g
// 2、
const serviceQueryInterfaceSecondParamSmallHumpPlaceholder = /\$VAR_SERVICE_QUERY_INTERFACE_SECOND_PARAM_SMALL_HUMP\$/g

/**
 * /dao/$VAR_SMALL_HUMP$.js
 * 1、查询接口 第二个参数大驼峰格式占位符
 * 2、查询接口 第二个参数小驼峰格式占位符
 *
 * 3、保存接口 参数接收占位符
 * 4、保存接口 Sql参数接收占位符
 *
 * 5、分页查询接口 参数接收占位符
 * 6、分页查询接口 Sql参数接收占位符
 *
 * 7、查询总条数接口 参数接收占位符
 * 8、查询总条数接口 Sql参数接收占位符
 *
 * 9、更新接口 参数接收占位符
 * 10、更新接口 Sql参数接收占位符
 *
 */
// 1、
const daoQueryInterfaceSecondParamBigHumpPlaceholder = /\$VAR_DAO_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP\$/g
// 2、
const daoQueryInterfaceSecondParamSmallHumpPlaceholder = /\$VAR_DAO_QUERY_INTERFACE_SECOND_PARAM_SMALL_HUMP\$/g
// 3、
const daoSaveInterfaceReceiveParamsPlaceholder = /\$VAR_DAO_SAVE_INTERFACE_RECEIVE_PARAMS\$/
// 4、
const daoSaveInterfaceSqlReceiveParamsPlaceholder = /\$VAR_DAO_SAVE_INTERFACE_SQL_RECEIVE_PARAMS\$/
// 5、
const daoQueryPageInterfaceReceiveParamsPlaceholder = /\$VAR_DAO_QUERY_PAGE_INTERFACE_RECEIVE_PARAMS\$/
// 6、
const daoQueryPageInterfaceSqlReceiveParamsPlaceholder = /\$VAR_DAO_QUERY_PAGE_INTERFACE_SQL_RECEIVE_PARAMS\$/
// 7、
const daoQueryCountInterfaceReceiveParamsPlaceholder = /\$VAR_DAO_QUERY_COUNT_INTERFACE_RECEIVE_PARAMS\$/
// 8、
const daoQueryCountInterfaceSqlReceiveParamsPlaceholder = /\$VAR_DAO_QUERY_COUNT_INTERFACE_SQL_RECEIVE_PARAMS\$/
// 9、
const daoUpdateInterfaceReceiveParamsPlaceholder = /\$VAR_DAO_UPDATE_INTERFACE_RECEIVE_PARAMS\$/
// 10、
const daoUpdateInterfaceSqlReceiveParamsPlaceholder = /\$VAR_DAO_UPDATE_INTERFACE_SQL_RECEIVE_PARAMS\$/

/**
 * /sql/$VAR_SMALL_HUMP$.js
 * 1、查询接口语句 第二个参数大驼峰格式占位符
 * 2、查询接口语句 第二个参数占位符
 *
 * 3、保存接口语句 参数接收占位符
 * 4、保存接口语句 参数接收问号占位符
 *
 * 5、更新接口语句 参数接收问号占位符
 *
 * 6、分页查询接口语句 参数接收问号占位符
 *
 * 7、查询总条数接口语句 参数接收问号占位符
 *
 */
// 1、
const sqlQueryInterfaceSecondParamBigHumpPlaceholder = /\$VAR_SQL_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP\$/g
// 2、
const sqlQueryInterfaceSecondParamPlaceholder = /\$VAR_SQL_QUERY_INTERFACE_SECOND_PARAM\$/g
// 3、
const sqlSaveInterfaceReceiveParamsPlaceholder = /\$VAR_SQL_SAVE_INTERFACE_RECEIVE_PARAMS\$/
// 4、
const sqlSaveInterfaceReceiveParamsQuestionMarkPlaceholder = /\$VAR_SQL_SAVE_INTERFACE_RECEIVE_PARAMS_QUESTION_MARK\$/
// 5、
const sqlUpdateInterfaceReceiveParamsQuestionMarkPlaceholder = /\$VAR_SQL_UPDATE_INTERFACE_RECEIVE_PARAMS_QUESTION_MARK\$/
// 6、
const sqlQueryPageInterfaceReceiveParamsQuestionMarkPlaceholder = /\$VAR_SQL_QUERY_PAGE_INTERFACE_RECEIVE_PARAMS_QUESTION_MARK\$/
// 7、
const sqlQueryCountInterfaceReceiveParamsQuestionMarkPlaceholder = /\$VAR_SQL_QUERY_COUNT_INTERFACE_RECEIVE_PARAMS_QUESTION_MARK\$/

/**
 * /vueAdmin/api/$VAR_SMALL_HUMP$.js
 * 1、Vue文件 筛选条件输入框占位符
 * 2、Vue文件 数据表内容占位符
 * 3、Vue文件 添加或修改对话框内容占位符
 * 4、Vue文件 form内容数据占位符
 * 5、Vue文件 searchParam内容数据占位符
 * 6、Vue文件 添加事件form数据初始化占位符
 * 7、Vue文件 编辑方法form内容数据占位符
 */
// 1、
const vueAdminVueFileFilterInputBoxPlaceholder = /\$VUE_ADMIN_VUE_FILE_FILTER_INPUT_BOX_PLACEHOLDER\$/g
// 2、
const vueAdminVueFileTableContentsPlaceholder = /\$VUE_ADMIN_VUE_FILE_TABLE_CONTENTS_PLACEHOLDER\$/g
// 3、
const vueAdminVueFileAddOrModifyDialogContentPlaceholder = /\$VUE_ADMIN_VUE_FILE_ADD_OR_MODIFY_DIALOG_CONTENT_PLACEHOLDER\$/
// 4、
const vueAdminVueFileFormContentDataPlaceholder = /\$VUE_ADMIN_VUE_FILE_FORM_CONTENT_DATA_PLACEHOLDER\$/
// 5、
const vueAdminVueFileSearchParamContentDataPlaceholder = /\$VUE_ADMIN_VUE_FILE_SEARCH_PARAM_CONTENT_DATA_PLACEHOLDER\$/
// 6、
const vueAdminVueFileAddEventFormDataInitPlaceholder = /\$VUE_ADMIN_VUE_FILE_EVENT_FORM_DATA_INIT_PLACEHOLDER\$/
// 7、
const vueAdminVueFileEditMethodFormContentDataPlaceholder = /\$VUE_ADMIN_VUE_FILE_EDIT_METHOD_FORM_CONTENT_DATA_PLACEHOLDER\$/

module.exports = {
    smallHumpPlaceholder,
    bigHumpPlaceholder,
    hyphenPlaceholder,
    constantPlaceholder,
    sqlTableNamePlaceholder,
    classNamePlaceholder,
    // 校验是否为小驼峰格式的占位符
    variableSmallHumpVerify: (name) => {
        return smallHumpPlaceholder.exec(name)
    },
    // 校验是否为大驼峰格式的占位符
    variableBigHumpVerify: (name) => {
        return bigHumpPlaceholder.exec(name)
    },
    // 校验是否为连字符格式的占位符
    variableHyphenVerify: (name) => {
        return hyphenPlaceholder.exec(name)
    },
    // 校验是否为表名格式的占位符
    mySqlTableNameVerify: (name) => {
        return sqlTableNamePlaceholder.exec(name)
    },
    // 将字符串转换为小驼峰格式（首字母转小写）
    transitionSmallHump: (name) => {
        return name.replace(name[0], name[0].toLowerCase())
    },
    // 将字符串转换为大驼峰格式（首字母转大写）
    transitionBigHump: (name) => {
        return name.replace(name[0], name[0].toUpperCase())
    },
    // 将表名占位符转换为表名
    /**
     * @description 将表名占位符转换为表名
     * @param {Array} tableData 需要操作的数据表数据
     * @return {String} 处理过的，占位符替换内容
     */
    transitionSqlTableNamePlaceholder: (tableData) => {
        return tableData[0].name
    },


    // /router/index.js
    declarationPlaceReg,
    declarationStatement,

    // /controller/$VAR_SMALL_HUMP$.js
    declarationErrorCodeModulePlaceholder,
    useErrorCodeModulePlaceholder,
    controllerSaveInterfaceReceiveParamsPlaceholder,
    controllerSaveInterfaceReceiveVerifyParamsPlaceholder,
    controllerSaveInterfaceParamsPackagePlaceholder,
    controllerSaveInterfaceSecondParamConstantPlaceholder,
    controllerSaveInterfaceSecondParamBigHumpPlaceholder,
    controllerSaveInterfaceSecondParamSmallHumpPlaceholder,
    controllerSaveInterfaceSetDefaultValuePlaceholder,

    controllerQueryPageInterfaceReceiveParamsPlaceholder,
    controllerQueryPageInterfaceSetDefaultValueAsEmptyStringPlaceholder,
    controllerQueryPageInterfaceParamsPackagePlaceholder,

    controllerUpdateInterfaceReceiveParamsPlaceholder,
    controllerUpdateInterfaceReceiveVerifyParamsPlaceholder,
    controllerUpdateInterfaceSetDefaultValuePlaceholder,
    controllerUpdateInterfaceParamsPackagePlaceholder,

    // /validation/$VAR_SMALL_HUMP$/
    validationSaveInterfaceReceiveParamsCommentPlaceholder,
    validationSaveInterfaceReceiveParamsPlaceholder,
    validationSaveInterfaceTemporaryParamsPlaceholder,
    validationSaveInterfaceParamsVerifyPlaceholder,

    validationUpdateInterfaceReceiveParamsCommentPlaceholder,
    validationUpdateInterfaceReceiveParamsPlaceholder,
    validationUpdateInterfaceTemporaryParamsPlaceholder,
    validationUpdateInterfaceParamsVerifyPlaceholder,

    // /service/$VAR_SMALL_HUMP$.js
    serviceQueryInterfaceSecondParamBigHumpPlaceholder,
    serviceQueryInterfaceSecondParamSmallHumpPlaceholder,

    // /dao/$VAR_SMALL_HUMP$.js
    daoQueryInterfaceSecondParamBigHumpPlaceholder,
    daoQueryInterfaceSecondParamSmallHumpPlaceholder,
    daoSaveInterfaceReceiveParamsPlaceholder,
    daoSaveInterfaceSqlReceiveParamsPlaceholder,
    daoQueryPageInterfaceReceiveParamsPlaceholder,
    daoQueryPageInterfaceSqlReceiveParamsPlaceholder,
    daoQueryCountInterfaceReceiveParamsPlaceholder,
    daoQueryCountInterfaceSqlReceiveParamsPlaceholder,
    daoUpdateInterfaceReceiveParamsPlaceholder,
    daoUpdateInterfaceSqlReceiveParamsPlaceholder,

    // /sql/$VAR_SMALL_HUMP$.js
    sqlQueryInterfaceSecondParamBigHumpPlaceholder,
    sqlQueryInterfaceSecondParamPlaceholder,
    sqlSaveInterfaceReceiveParamsPlaceholder,
    sqlSaveInterfaceReceiveParamsQuestionMarkPlaceholder,
    sqlUpdateInterfaceReceiveParamsQuestionMarkPlaceholder,
    sqlQueryPageInterfaceReceiveParamsQuestionMarkPlaceholder,
    sqlQueryCountInterfaceReceiveParamsQuestionMarkPlaceholder,

    // /vueAdmin/api/$VAR_SMALL_HUMP$.js
    vueAdminVueFileFilterInputBoxPlaceholder,
    vueAdminVueFileTableContentsPlaceholder,
    vueAdminVueFileAddOrModifyDialogContentPlaceholder,
    vueAdminVueFileFormContentDataPlaceholder,
    vueAdminVueFileSearchParamContentDataPlaceholder,
    vueAdminVueFileAddEventFormDataInitPlaceholder,
    vueAdminVueFileEditMethodFormContentDataPlaceholder,
}
