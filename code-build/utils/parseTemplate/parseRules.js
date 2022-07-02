const {
    // 通用的规则及方法
    smallHumpPlaceholder,
    bigHumpPlaceholder,
    sqlTableNamePlaceholder,
    classNamePlaceholder,
    transitionSmallHump,
    transitionBigHump,
    transitionSqlTableNamePlaceholder,


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

    validationSaveInterfaceReceiveParamsCommentPlaceholder,
    validationSaveInterfaceReceiveParamsPlaceholder,
    validationSaveInterfaceTemporaryParamsPlaceholder,
    validationSaveInterfaceParamsVerifyPlaceholder,

    validationUpdateInterfaceReceiveParamsCommentPlaceholder,
    validationUpdateInterfaceReceiveParamsPlaceholder,
    validationUpdateInterfaceTemporaryParamsPlaceholder,
    validationUpdateInterfaceParamsVerifyPlaceholder,

    serviceQueryInterfaceSecondParamBigHumpPlaceholder,
    serviceQueryInterfaceSecondParamSmallHumpPlaceholder,

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


} = require('./regular')


// /controller/$VAR_SMALL_HUMP$.js
const {
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
} = require('./templateRules/controllerRule/transitions')

// /validation/$VAR_SMALL_HUMP$/
const {
    transitionValidationSaveInterfaceReceiveParamsCommentPlaceholder,
    transitionValidationSaveInterfaceReceiveParamsPlaceholder,
    transitionValidationSaveInterfaceTemporaryParamsPlaceholder,
    transitionValidationSaveInterfaceParamsVerifyPlaceholder,

    transitionValidationUpdateInterfaceReceiveParamsCommentPlaceholder,
    transitionValidationUpdateInterfaceReceiveParamsPlaceholder,
    transitionValidationUpdateInterfaceTemporaryParamsPlaceholder,
    transitionValidationUpdateInterfaceParamsVerifyPlaceholder,
} = require('./templateRules/validationRule/transitions')

// /service/$VAR_SMALL_HUMP$/
const {
    transitionServiceQueryInterfaceSecondParamBigHumpPlaceholder,
    transitionServiceQueryInterfaceSecondParamSmallHumpPlaceholder,
} = require('./templateRules/serviceRule/transitions')

// /dao/$VAR_SMALL_HUMP$/
const {
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
} = require('./templateRules/daoRule/transitions')

// /sql/$VAR_SMALL_HUMP$/
const {
    transitionSqlQueryInterfaceSecondParamBigHumpPlaceholder,
    transitionSqlQueryInterfaceSecondParamPlaceholder,
    transitionSqlSaveInterfaceReceiveParamsPlaceholder,
    transitionSqlSaveInterfaceReceiveParamsQuestionMarkPlaceholder,
    transitionSqlUpdateInterfaceReceiveParamsQuestionMarkPlaceholder,
    transitionSqlQueryPageInterfaceReceiveParamsQuestionMarkPlaceholder,
    transitionSqlQueryCountInterfaceReceiveParamsQuestionMarkPlaceholder,
} = require('./templateRules/sqlRule/transitions')

// /vueAdmin/$VAR_SMALL_HUMP$/
const {
    transitionClassNamePlaceholder,
    transitionVueAdminVueFileFilterInputBoxPlaceholder,
    transitionVueAdminVueFileTableContentsPlaceholder,
    transitionVueAdminVueFileAddOrModifyDialogContentPlaceholder,
    transitionVueAdminVueFileFormContentDataPlaceholder,
    transitionVueAdminVueFileSearchParamContentDataPlaceholder,
    transitionVueAdminVueFileAddEventFormDataInitPlaceholder,
    transitionVueAdminVueFileEditMethodFormContentDataPlaceholder,
} = require('./templateRules/vueAdminRule/transitions')


const {
    replaceAllRules,
}  = require('./parseUtils')


/**
 * @description 解析 /router/index.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @return {String} 解析后的文件内容
 */
const parseRouterIndex = (fileContent, moduleName) => {
    /**
     * /router/index.js,需要插入 新模块的声明句子
     * 所以按照格式，先找到文件末尾的 module.exports = router 替换成 declarationStatement
     * 这样就相当于，在保证原文件不变的前提前，把新模块的声明句子插入到了原文件对应的位置处
     *
     * 1、声明语句替换：根据自定义规则 找到文件末尾的module.exports = router的位置，替换
     */
    console.log('开始解析 /router/index.js')

    const rulesArr = [
        {
            reg: declarationPlaceReg,
            content: declarationStatement,
        },
        {
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}

/**
 * @description 解析 /router/$VAR_SMALL_HUMP$.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @return {String} parsedFileContent 解析后的文件内容
 */
const parseRouter$VAR_SMALL_HUMP$ = (fileContent, moduleName) => {
    /**
     * /router/$VAR_SMALL_HUMP$.js,
     * 1、将文件中的大驼峰和小驼峰的占位符替换成对应格式的模块名
     */
    console.log('开始解析 /router/$VAR_SMALL_HUMP$.js')

    // 1、将文件中的大驼峰和小驼峰的占位符替换成对应格式的模块名
    const rulesArr = [
        {
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}

/**
 * @description 解析 /controller/$VAR_SMALL_HUMP$.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @param {String} errCodeModule 错误码模块名
 * @param {Array} tableData `需要操作的数据表数据`
 * @return {String} parsedFileContent 解析后的文件内容
 */
const parseController$VAR_SMALL_HUMP$ = (fileContent, moduleName,errCodeModule,tableData) => {
    /**
     * /controller/$VAR_SMALL_HUMP$.js,
     * 需要解析六个部分内容，头部声明、保存接口、删除接口、更新接口、分页查询接口、整体大小驼峰格式占位符替换
     * 1、头部声明
     *      1.1、错误码模块声明占位符 declarationErrorCodeModulePlaceholder 替换
     *          替换方式：判断 errCodeModule === 'APP'
     *                  如果等于，declarationErrorCodeModulePlaceholder = APP
     *                  如果不等于，declarationErrorCodeModulePlaceholder = errCodeModule, APP
     * 2、保存接口
     *      2.1 参数接收占位符 controllerSaveInterfaceReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 uid,create_time,update_time
     *      2.2 校验参数接收占位符 controllerSaveInterfaceReceiveVerifyParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  属性为必填，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 uid,create_time,update_time
     *      2.3 默认值设置占位符 controllerSaveInterfaceSetDefaultValuePlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  有默认值，且默认值不为null，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 uid,create_time,update_time
     *                  需根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *                  例如：blogSummary = blogSummary ? blogSummary : ''\nrecommendLevel = recommendLevel ? recommendLevel : '-1'\n
     *      2.4 参数封装占位符 controllerSaveInterfaceParamsPackagePlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *      2.5 第二个参数大驼峰格式占位符 controllerSaveInterfaceSecondParamBigHumpPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  取第二个参数
     *                  将连字符变量，替换为为大驼峰格式字符串，
     *      2.6 第二个参数小驼峰格式占位符 controllerSaveInterfaceSecondParamSmallHumpPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  取第二个参数
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *      2.7 错误码模块使用占位符 useErrorCodeModulePlaceholder 替换
     *          替换方式：替换为 errCodeModule
     *      2.8 第二个参数常量格式占位符 controllerSaveInterfaceSecondParamConstantPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  取第二个参数
     *                  将连字符变量，替换为为常量格式字符串，
     *
     * 3、分页查询接口
     *      3.1 参数接收占位符 controllerQueryPageInterfaceReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  有默认值，且默认值不为null
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *      3.2 默认值设置为空字符串占位符 controllerQueryPageInterfaceSetDefaultValueAsEmptyStringPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  有默认值，且默认值不为null，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  需根据数据循环拼接字符串，关键值使用列名的小驼峰格式，默认值设为空字符串
     *                  例如：blogSummary = blogSummary ? blogSummary : ''\nrecommendLevel = recommendLevel ? recommendLevel : ''\n
     *      3.3 参数封装占位符 controllerQueryPageInterfaceParamsPackagePlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  有默认值，且默认值不为null，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     * 4、更新接口
     *      4.1 参数接收占位符 controllerUpdateInterfaceReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 create_time,update_time
     *      4.2 校验参数接收占位符 controllerUpdateInterfaceReceiveVerifyParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  属性为必填，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 create_time,update_time
     *      4.3 默认值设置占位符 controllerUpdateInterfaceSetDefaultValuePlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  有默认值，且默认值不为null，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 uid,create_time,update_time
     *                  需根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *                  例如：blogSummary = blogSummary ? blogSummary : ''\nrecommendLevel = recommendLevel ? recommendLevel : '-1'\n
     *      4.4 参数封装占位符 controllerUpdateInterfaceParamsPackagePlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 create_time
     *
     * 5、小驼峰格式 替换
     * 6、大驼峰格式 替换
     *
     *
     */
    console.log('开始解析 /controller/$VAR_SMALL_HUMP$.js')

    const rulesArr = [
        {//1.1
            reg: declarationErrorCodeModulePlaceholder,
            content: transitionDeclarationErrorCodeModulePlaceholder(errCodeModule),
        },
        {//2.1
            reg: controllerSaveInterfaceReceiveParamsPlaceholder,
            content: transitionControllerSaveInterfaceReceiveParamsPlaceholder(tableData),
        },
        {//2.2
            reg: controllerSaveInterfaceReceiveVerifyParamsPlaceholder,
            content: transitionControllerSaveInterfaceReceiveVerifyParamsPlaceholder(tableData),
        },
        {//2.3
            reg: controllerSaveInterfaceSetDefaultValuePlaceholder,
            content: transitionControllerSaveInterfaceSetDefaultValuePlaceholder(tableData),
        },
        {//2.4
            reg: controllerSaveInterfaceParamsPackagePlaceholder,
            content: transitionControllerSaveInterfaceParamsPackagePlaceholder(tableData),
        },
        {//2.5
            reg: controllerSaveInterfaceSecondParamBigHumpPlaceholder,
            content: transitionControllerSaveInterfaceSecondParamBigHumpPlaceholder(tableData),
        },
        {//2.6
            reg: controllerSaveInterfaceSecondParamSmallHumpPlaceholder,
            content: transitionControllerSaveInterfaceSecondParamSmallHumpPlaceholder(tableData),
        },
        {//2.7
            reg: useErrorCodeModulePlaceholder,
            content: transitionUseErrorCodeModulePlaceholder(errCodeModule),
        },
        {//2.8
            reg: controllerSaveInterfaceSecondParamConstantPlaceholder,
            content: transitionControllerSaveInterfaceSecondParamConstantPlaceholder(tableData),
        },

        {//3.1
            reg: controllerQueryPageInterfaceReceiveParamsPlaceholder,
            content: transitionControllerQueryPageInterfaceReceiveParamsPlaceholder(tableData),
        },
        {//3.2
            reg: controllerQueryPageInterfaceSetDefaultValueAsEmptyStringPlaceholder,
            content: transitionControllerQueryPageInterfaceSetDefaultValueAsEmptyStringPlaceholder(tableData),
        },
        {//3.3
            reg: controllerQueryPageInterfaceParamsPackagePlaceholder,
            content: transitionControllerQueryPageInterfaceParamsPackagePlaceholder(tableData),
        },

        {//4.1
            reg: controllerUpdateInterfaceReceiveParamsPlaceholder,
            content: transitionControllerUpdateInterfaceReceiveParamsPlaceholder(tableData),
        },
        {//4.2
            reg: controllerUpdateInterfaceReceiveVerifyParamsPlaceholder,
            content: transitionControllerUpdateInterfaceReceiveVerifyParamsPlaceholder(tableData),
        },
        {//4.3
            reg: controllerUpdateInterfaceSetDefaultValuePlaceholder,
            content: transitionControllerUpdateInterfaceSetDefaultValuePlaceholder(tableData),
        },
        {//4.4
            reg: controllerUpdateInterfaceParamsPackagePlaceholder,
            content: transitionControllerUpdateInterfaceParamsPackagePlaceholder(tableData),
        },


        {//5
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {//6
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}

/**
 * @description 解析 /validation/$VAR_SMALL_HUMP$/index.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @return {String} 解析后的文件内容
 */
const parseValidation$VAR_SMALL_HUMP$Index = (fileContent, moduleName) => {
    /**
     * /validation/$VAR_SMALL_HUMP$/index.js
     * 1、小驼峰格式 替换
     * 2、大驼峰格式 替换
     */
    console.log('开始解析 /validation/$VAR_SMALL_HUMP$/index.js')

    const rulesArr = [
        {//1
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {//2
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}

/**
 * @description 解析 /validation/$VAR_SMALL_HUMP$/save$VAR_BIG_HUMP$.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 解析后的文件内容
 */
const parseValidation$VAR_SMALL_HUMP$save$VAR_BIG_HUMP$ = (fileContent, moduleName,tableData) => {
    /**
     * /validation/$VAR_SMALL_HUMP$/save$VAR_BIG_HUMP$.js
     * 1、小驼峰格式 替换
     * 2、大驼峰格式 替换
     * 3、接收参数注释占位符 validationSaveInterfaceReceiveParamsCommentPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            属性为必填，
     *            将连字符变量，替换为为小驼峰格式字符串，
     *            排除 uid,create_time,update_time
     *            根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *            例如： * @param blogTitle 不能为空\n * @param isOriginal 不能为空\n
     * 4、参数接收占位符 validationSaveInterfaceReceiveParamsPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            属性为必填，
     *            将连字符变量，替换为为小驼峰格式字符串，
     *            排除 uid,create_time,update_time
     * 5、临时参数占位符 validationSaveInterfaceTemporaryParamsPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            属性为必填，
     *            将连字符变量，替换为为小驼峰格式字符串，
     *            排除 uid,create_time,update_time
     *            根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *            例如：    let _blogTitle = isEmpty(blogTitle) ? '' : blogTitle\n    let _isOriginal = isEmpty(isOriginal) ? '' : isOriginal\n
     * 6、参数校验占位符 validationSaveInterfaceParamsVerifyPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            属性为必填，
     *            将连字符变量，替换为为小驼峰格式字符串，
     *            排除 uid,create_time,update_time
     *            根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *            例如：    if (!_blogTitle) {\n        return {\n            errorMsg: 'blogTitle不能为空',\n            isValid,\n        }\n    }\n
     */
    console.log('开始解析 /validation/$VAR_SMALL_HUMP$/save$VAR_BIG_HUMP$.js')

    const rulesArr = [
        {//1
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {//2
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
        {//3
            reg: validationSaveInterfaceReceiveParamsCommentPlaceholder,
            content: transitionValidationSaveInterfaceReceiveParamsCommentPlaceholder(tableData),
        },
        {//4
            reg: validationSaveInterfaceReceiveParamsPlaceholder,
            content: transitionValidationSaveInterfaceReceiveParamsPlaceholder(tableData),
        },
        {//5
            reg: validationSaveInterfaceTemporaryParamsPlaceholder,
            content: transitionValidationSaveInterfaceTemporaryParamsPlaceholder(tableData),
        },
        {//6
            reg: validationSaveInterfaceParamsVerifyPlaceholder,
            content: transitionValidationSaveInterfaceParamsVerifyPlaceholder(tableData),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}

/**
 * @description 解析 /validation/$VAR_SMALL_HUMP$/delete$VAR_BIG_HUMP$ByUid.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 解析后的文件内容
 */
const parseValidation$VAR_SMALL_HUMP$delete$VAR_BIG_HUMP$ByUid = (fileContent, moduleName,tableData) => {
    /**
     * /validation/$VAR_SMALL_HUMP$/delete$VAR_BIG_HUMP$ByUid.js
     * 1、小驼峰格式 替换
     * 2、大驼峰格式 替换
     */
    console.log('开始解析 /validation/$VAR_SMALL_HUMP$/delete$VAR_BIG_HUMP$ByUid.js')

    const rulesArr = [
        {//1
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {//2
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}

/**
 * @description 解析 /validation/$VAR_SMALL_HUMP$/query$VAR_BIG_HUMP$Page.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 解析后的文件内容
 */
const parseValidation$VAR_SMALL_HUMP$query$VAR_BIG_HUMP$Page = (fileContent, moduleName,tableData) => {
    /**
     * /validation/$VAR_SMALL_HUMP$/query$VAR_BIG_HUMP$Page.js
     * 1、小驼峰格式 替换
     * 2、大驼峰格式 替换
     */
    console.log('开始解析 /validation/$VAR_SMALL_HUMP$/query$VAR_BIG_HUMP$Page.js')

    const rulesArr = [
        {//1
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {//2
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}

/**
 * @description 解析 /validation/$VAR_SMALL_HUMP$/update$VAR_BIG_HUMP$ByUid.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @param {Array} tableData 需要操作的数据表数据
 * @return {String} 解析后的文件内容
 */
const parseValidation$VAR_SMALL_HUMP$update$VAR_BIG_HUMP$ByUid = (fileContent, moduleName,tableData) => {
    /**
     * /validation/$VAR_SMALL_HUMP$/update$VAR_BIG_HUMP$ByUid.js
     * 1、小驼峰格式 替换
     * 2、大驼峰格式 替换
     * 3、接收参数注释占位符 validationUpdateInterfaceReceiveParamsCommentPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            属性为必填，
     *            将连字符变量，替换为为小驼峰格式字符串，
     *            排除 create_time,update_time
     *            根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *            例如： * @param blogTitle 不能为空\n * @param isOriginal 不能为空\n
     * 4、参数接收占位符 validationUpdateInterfaceReceiveParamsPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            属性为必填，
     *            将连字符变量，替换为为小驼峰格式字符串，
     *            排除 create_time,update_time
     * 5、临时参数占位符 validationUpdateInterfaceTemporaryParamsPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            属性为必填，
     *            将连字符变量，替换为为小驼峰格式字符串，
     *            排除 create_time,update_time
     *            根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *            例如：    let _blogTitle = isEmpty(blogTitle) ? '' : blogTitle\n    let _isOriginal = isEmpty(isOriginal) ? '' : isOriginal\n
     * 6、参数校验占位符 validationUpdateInterfaceParamsVerifyPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            属性为必填，
     *            将连字符变量，替换为为小驼峰格式字符串，
     *            排除 create_time,update_time
     *            根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *            例如：    if (!_blogTitle) {\n        return {\n            errorMsg: 'blogTitle不能为空',\n            isValid,\n        }\n    }\n
     */
    console.log('开始解析 /validation/$VAR_SMALL_HUMP$/update$VAR_BIG_HUMP$ByUid.js')

    const rulesArr = [
        {//1
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {//2
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
        {//3
            reg: validationUpdateInterfaceReceiveParamsCommentPlaceholder,
            content: transitionValidationUpdateInterfaceReceiveParamsCommentPlaceholder(tableData),
        },
        {//4
            reg: validationUpdateInterfaceReceiveParamsPlaceholder,
            content: transitionValidationUpdateInterfaceReceiveParamsPlaceholder(tableData),
        },
        {//5
            reg: validationUpdateInterfaceTemporaryParamsPlaceholder,
            content: transitionValidationUpdateInterfaceTemporaryParamsPlaceholder(tableData),
        },
        {//6
            reg: validationUpdateInterfaceParamsVerifyPlaceholder,
            content: transitionValidationUpdateInterfaceParamsVerifyPlaceholder(tableData),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}

/**
 * @description 解析 /service/$VAR_SMALL_HUMP$.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @param {Array} tableData `需要操作的数据表数据`
 * @return {String} parsedFileContent 解析后的文件内容
 */
const parseService$VAR_SMALL_HUMP$ = (fileContent, moduleName,tableData) => {
    /**
     * /service/$VAR_SMALL_HUMP$.js
     * 1、小驼峰格式 替换
     * 2、大驼峰格式 替换
     * 3、第二个参数大驼峰格式占位符 serviceQueryInterfaceSecondParamBigHumpPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            取第二个参数
     *            将连字符变量，替换为为大驼峰格式字符串，
     * 4、第二个参数小驼峰格式占位符 serviceQueryInterfaceSecondParamSmallHumpPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            取第二个参数
     *            将连字符变量，替换为为小驼峰格式字符串，
     */
    console.log('开始解析 /service/$VAR_SMALL_HUMP$.js')

    const rulesArr = [
        {//1
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {//2
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
        {//3
            reg: serviceQueryInterfaceSecondParamBigHumpPlaceholder,
            content: transitionServiceQueryInterfaceSecondParamBigHumpPlaceholder(tableData),
        },
        {//4
            reg: serviceQueryInterfaceSecondParamSmallHumpPlaceholder,
            content: transitionServiceQueryInterfaceSecondParamSmallHumpPlaceholder(tableData),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}

/**
 * @description 解析 /dao/$VAR_SMALL_HUMP$.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @param {Array} tableData `需要操作的数据表数据`
 * @return {String} parsedFileContent 解析后的文件内容
 */
const parseDao$VAR_SMALL_HUMP$ = (fileContent, moduleName,tableData) => {
    /**
     * /dao/$VAR_SMALL_HUMP$.js
     * 需要解析六个部分内容，保存接口、分页查询接口、查询总条数接接口、更新接口、第二个参数大小驼峰格式、整体大小驼峰占位符替换
     * 1、保存接口
     *      1.1 参数接收占位符 daoSaveInterfaceReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *      1.2 sql参数接收占位符 daoSaveInterfaceSqlReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     * 2、分页查询接口
     *      2.1 参数接收占位符 daoQueryPageInterfaceReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  有默认值，且默认值不为null，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 uid
     *      2.2 sql参数接收占位符 daoQueryPageInterfaceSqlReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  有默认值，且默认值不为null，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 uid
     *                  需根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *                  例如：            `%${blogTitle}%`,\n            `%${blogAuthorId}%`,\n
     * 3、查询总条数接口
     *      3.1 参数接收占位符 daoQueryCountInterfaceReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  有默认值，且默认值不为null，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 uid
     *      3.2 sql参数接收占位符 daoQueryCountInterfaceSqlReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  有默认值，且默认值不为null，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 uid
     *                  需根据数据循环拼接字符串，关键值使用列名的小驼峰格式
     *                  例如：            `%${blogTitle}%`,\n            `%${blogAuthorId}%`,\n
     * 4、更新接口
     *      4.1 参数接收占位符 daoUpdateInterfaceReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *      4.2 sql参数接收占位符 daoUpdateInterfaceSqlReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  将连字符变量，替换为为小驼峰格式字符串，
     *                  排除 uid,create_time,update_time
     * 5、小驼峰格式 替换
     * 6、大驼峰格式 替换
     * 7、第二个参数大驼峰格式占位符 daoQueryInterfaceSecondParamBigHumpPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            取第二个参数
     *            将连字符变量，替换为为大驼峰格式字符串，
     * 8、第二个参数小驼峰格式占位符 daoQueryInterfaceSecondParamSmallHumpPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            取第二个参数
     *            将连字符变量，替换为为小驼峰格式字符串，
     */
    console.log('开始解析 /dao/$VAR_SMALL_HUMP$.js')

    const rulesArr = [
        {//1.1
            reg: daoSaveInterfaceReceiveParamsPlaceholder,
            content: transitionDaoSaveInterfaceReceiveParamsPlaceholder(tableData),
        },
        {//1.2
            reg: daoSaveInterfaceSqlReceiveParamsPlaceholder,
            content: transitionDaoSaveInterfaceSqlReceiveParamsPlaceholder(tableData),
        },
        {//2.1
            reg: daoQueryPageInterfaceReceiveParamsPlaceholder,
            content: transitionDaoQueryPageInterfaceReceiveParamsPlaceholder(tableData),
        },
        {//2.2
            reg: daoQueryPageInterfaceSqlReceiveParamsPlaceholder,
            content: transitionDaoQueryPageInterfaceSqlReceiveParamsPlaceholder(tableData),
        },
        {//3.1
            reg: daoQueryCountInterfaceReceiveParamsPlaceholder,
            content: transitionDaoQueryCountInterfaceReceiveParamsPlaceholder(tableData),
        },
        {//3.2
            reg: daoQueryCountInterfaceSqlReceiveParamsPlaceholder,
            content: transitionDaoQueryCountInterfaceSqlReceiveParamsPlaceholder(tableData),
        },
        {//4.1
            reg: daoUpdateInterfaceReceiveParamsPlaceholder,
            content: transitionDaoUpdateInterfaceReceiveParamsPlaceholder(tableData),
        },
        {//4.2
            reg: daoUpdateInterfaceSqlReceiveParamsPlaceholder,
            content: transitionDaoUpdateInterfaceSqlReceiveParamsPlaceholder(tableData),
        },

        {//5
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {//6
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
        {//7
            reg: daoQueryInterfaceSecondParamBigHumpPlaceholder,
            content: transitionDaoQueryInterfaceSecondParamBigHumpPlaceholder(tableData),
        },
        {//8
            reg: daoQueryInterfaceSecondParamSmallHumpPlaceholder,
            content: transitionDaoQueryInterfaceSecondParamSmallHumpPlaceholder(tableData),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}

/**
 * @description 解析 /sql/$VAR_SMALL_HUMP$.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @param {Array} tableData `需要操作的数据表数据`
 * @return {String} parsedFileContent 解析后的文件内容
 */
const parseSql$VAR_SMALL_HUMP$ = (fileContent, moduleName,tableData) => {
    /**
     * /sql/$VAR_SMALL_HUMP$.js
     * 需要解析七个部分内容，保存接口语句、更新接口语句、分页查询接口语句、查询总条数接口语句、第二个参数大小驼峰格式、整体大小驼峰占位符、表名占位符替换
     * 1、保存接口语句
     *      1.1 参数接收占位符 sqlSaveInterfaceReceiveParamsPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *      1.2 参数接收问号占位符 sqlSaveInterfaceReceiveParamsQuestionMarkPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  需根据数据循环拼接 ? 占位符 字符串
     *                  例如：?,?,?,?,?,?,?,?,?,?,?,?,?,?
     * 2、更新接口语句
     *      2.1 参数接收问号占位符 sqlUpdateInterfaceReceiveParamsQuestionMarkPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  排除 uid
     *                  需根据数据循环拼接字符串，关键值使用原列名
     *                  例如：blog_title = ?, blog_summary = ?, blog_author_id = ?,
     * 3、分页查询接口
     *      3.1 参数接收问号占位符 sqlQueryPageInterfaceReceiveParamsQuestionMarkPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  有默认值，且默认值不为null，
     *                  排除 uid
     *                  例如：blog_title like ?\n        and blog_author_id like ?
     * 4、查询总条数接口
     *      4.1 参数接收问号占位符 sqlQueryCountInterfaceReceiveParamsQuestionMarkPlaceholder 替换
     *          替换方式：从tableData提取出所有列名，
     *                  有默认值，且默认值不为null，
     *                  排除 uid
     *                  例如：blog_title like ?\n        and blog_author_id like ?
     * 5、小驼峰格式 替换
     * 6、大驼峰格式 替换
     * 7、第二个参数大驼峰格式占位符 sqlQueryInterfaceSecondParamBigHumpPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            取第二个参数
     *            将连字符变量，替换为为大驼峰格式字符串，
     * 8、第二个参数小驼峰格式占位符 sqlQueryInterfaceSecondParamPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            取第二个参数
     *            将连字符变量，替换为为小驼峰格式字符串，
     * 9、表名格式 替换
     */
    console.log('开始解析 /sql/$VAR_SMALL_HUMP$.js')

    const rulesArr = [
        {//1.1
            reg: sqlSaveInterfaceReceiveParamsPlaceholder,
            content: transitionSqlSaveInterfaceReceiveParamsPlaceholder(tableData),
        },
        {//1.2
            reg: sqlSaveInterfaceReceiveParamsQuestionMarkPlaceholder,
            content: transitionSqlSaveInterfaceReceiveParamsQuestionMarkPlaceholder(tableData),
        },
        {//2.1
            reg: sqlUpdateInterfaceReceiveParamsQuestionMarkPlaceholder,
            content: transitionSqlUpdateInterfaceReceiveParamsQuestionMarkPlaceholder(tableData),
        },
        {//3.1
            reg: sqlQueryPageInterfaceReceiveParamsQuestionMarkPlaceholder,
            content: transitionSqlQueryPageInterfaceReceiveParamsQuestionMarkPlaceholder(tableData),
        },
        {//4.1
            reg: sqlQueryCountInterfaceReceiveParamsQuestionMarkPlaceholder,
            content: transitionSqlQueryCountInterfaceReceiveParamsQuestionMarkPlaceholder(tableData),
        },

        {//5
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {//6
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
        {//7
            reg: sqlQueryInterfaceSecondParamBigHumpPlaceholder,
            content: transitionSqlQueryInterfaceSecondParamBigHumpPlaceholder(tableData),
        },
        {//8
            reg: sqlQueryInterfaceSecondParamPlaceholder,
            content: transitionSqlQueryInterfaceSecondParamPlaceholder(tableData),
        },
        {//9
            reg: sqlTableNamePlaceholder,
            content: transitionSqlTableNamePlaceholder(tableData),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}


/**
 * @description 解析 /vueAdmin/api/$VAR_SMALL_HUMP$.js
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @return {String} parsedFileContent 解析后的文件内容
 */
const parseVueAdminApi$VAR_SMALL_HUMP$ = (fileContent, moduleName) => {
    /**
     * /vueAdmin/api/$VAR_SMALL_HUMP$.js
     * 需要解析两个个部分内容，整体大小驼峰占位符
     * 1、小驼峰格式 替换
     * 2、大驼峰格式 替换
     */
    console.log('开始解析 /vueAdmin/api/$VAR_SMALL_HUMP$.js')

    const rulesArr = [
        {//1
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {//2
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}
/**
 * @description 解析 /vueAdmin/$VAR_SMALL_HUMP$/$VAR_BIG_HUMP$.scss
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @return {String} parsedFileContent 解析后的文件内容
 */
const parseVueAdminApi$VAR_SMALL_HUMP$$VAR_BIG_HUMP$Scss = (fileContent, moduleName) => {
    /**
     * /vueAdmin/$VAR_SMALL_HUMP$/$VAR_BIG_HUMP$.scss
     * 需要解析一个部分内容，小驼峰替换为类名格式字符串
     * 1、小驼峰替换为类名格式字符串 替换
     */
    console.log('开始解析 /vueAdmin/$VAR_SMALL_HUMP$/$VAR_BIG_HUMP$.scss')

    const rulesArr = [
        {//1
            reg: classNamePlaceholder,
            content: transitionClassNamePlaceholder(moduleName),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}
/**
 * @description 解析 /vueAdmin/$VAR_SMALL_HUMP$/$VAR_BIG_HUMP$.vue
 * @param {String} fileContent 解析前的文件内容
 * @param {String} moduleName 新增的模块名
 * @param {Array} tableData `需要操作的数据表数据`
 * @return {String} parsedFileContent 解析后的文件内容
 */
const parseVueAdminApi$VAR_SMALL_HUMP$$VAR_BIG_HUMP$Vue = (fileContent, moduleName, tableData) => {
    /**
     * /vueAdmin/$VAR_SMALL_HUMP$/$VAR_BIG_HUMP$.vue
     * 需要解析9个部分内容， 小驼峰替换为类名格式字符串、大小驼峰格式占位符替换、
     *                    Vue文件 筛选条件输入框占位符替换、
     *                    Vue文件 数据表内容占位符替换、
     *                    Vue文件 添加或修改对话框内容占位符替换、
     *                    Vue文件 form内容数据占位符替换、
     *                    Vue文件 searchParam内容数据占位符替换、
     *                    Vue文件 添加事件form数据初始化占位符替换、
     *                    Vue文件 编辑方法form内容数据占位符替换、
     *
     * 1、Vue文件 筛选条件输入框占位符替换 vueAdminVueFileFilterInputBoxPlaceholder 替换
     *     替换方式：从tableData提取出所有列名，
     *             有默认值，且默认值不为null，
     *             转换为小驼峰格式
     *             排除 uid、create_time、update_time
     *             例如：<el-input clearable style="width: 150px;" v-model="searchParam.sortName" placeholder="请输入分类名" @keyup.enter.native="handleFind"/>
     *             注意：请输入分类名，汉字提示用注释里的中文冒号提取出来，注释都按照 ${分类名：存储分类的名字} 格式命名的
     * 2、Vue文件 数据表内容占位符替换 vueAdminVueFileTableContentsPlaceholder 替换
     *     替换方式：从tableData提取出所有列名，
     *             排除 uid、update_time
     *             例如：
     *                   <el-table-column label="分类名" min-width="100" align="center">
     *                       <template slot-scope="scope">
     *                          <span>{{ scope.row.sort_name }}</span>
     *                       </template>
     *                   </el-table-column>
     *
     * 3、Vue文件 添加或修改对话框内容占位符替换 vueAdminVueFileAddOrModifyDialogContentPlaceholder 替换
     *     替换方式：从tableData提取出所有列名，
     *             排除 uid、create_time、update_time
     *             例如：
     *                   <el-row>
     *                       <el-col :span="12">
     *                           <el-form-item label="分类名" label-width="120px" prop="sortName">
     *                              <el-input v-model="form.sortName" auto-complete="off"></el-input>
     *                           </el-form-item>
     *                       </el-col>
     *                   </el-row>
     *
     * 4、Vue文件 form内容数据占位符替换 vueAdminVueFileFormContentDataPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            转换为小驼峰格式
     *            排除 uid、create_time、update_time
     *            例如：
     *                  form: {
     *                      sortName: null,
     *                      intro: null,
     *                      order: null
     *                  }
     *
     * 5、Vue文件 searchParam内容数据占位符替换 vueAdminVueFileSearchParamContentDataPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            有默认值，且默认值不为null，
     *            排除 uid、create_time、update_time
     *            例如：
     *                   searchParam: {
     *                      sortName: null,
     *                    }
     *
     * 6、Vue文件 添加事件form数据初始化占位符替换 vueAdminVueFileAddEventFormDataInitPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            转换为小驼峰格式
     *            排除 uid、create_time、update_time
     *            例如：
     *                   this.form = {
     *                      sortName: null,
     *                      intro: null,
     *                      order: null
     *                    }
     *
     * 7、Vue文件 编辑方法form内容数据占位符替换 vueAdminVueFileEditMethodFormContentDataPlaceholder 替换
     *    替换方式：从tableData提取出所有列名，
     *            转换为小驼峰格式
     *            排除 uid、create_time、update_time
     *            例如：
     *                   this.form = {
     *                      sortName: row.sort_name,
     *                      intro: row.intro,
     *                      order: row.order_num,
     *                      uid: row.uid
     *                    }
     *
     * 8、 小驼峰格式 替换
     * 9、大驼峰格式 替换
     * 10、小驼峰转为类名格式 替换
     *
     *
     */
    console.log('开始解析 /vueAdmin/$VAR_SMALL_HUMP$/$VAR_BIG_HUMP$.vue')

    const rulesArr = [
        {//1
            reg: vueAdminVueFileFilterInputBoxPlaceholder,
            content: transitionVueAdminVueFileFilterInputBoxPlaceholder(tableData),
        },
        {//2
            reg: vueAdminVueFileTableContentsPlaceholder,
            content: transitionVueAdminVueFileTableContentsPlaceholder(tableData),
        },
        {//3
            reg: vueAdminVueFileAddOrModifyDialogContentPlaceholder,
            content: transitionVueAdminVueFileAddOrModifyDialogContentPlaceholder(tableData),
        },
        {//4
            reg: vueAdminVueFileFormContentDataPlaceholder,
            content: transitionVueAdminVueFileFormContentDataPlaceholder(tableData),
        },
        {//5
            reg: vueAdminVueFileSearchParamContentDataPlaceholder,
            content: transitionVueAdminVueFileSearchParamContentDataPlaceholder(tableData),
        },
        {//6
            reg: vueAdminVueFileAddEventFormDataInitPlaceholder,
            content: transitionVueAdminVueFileAddEventFormDataInitPlaceholder(tableData),
        },
        {//7
            reg: vueAdminVueFileEditMethodFormContentDataPlaceholder,
            content: transitionVueAdminVueFileEditMethodFormContentDataPlaceholder(tableData),
        },
        {//8
            reg: smallHumpPlaceholder,
            content: transitionSmallHump(moduleName),
        },
        {//9
            reg: bigHumpPlaceholder,
            content: transitionBigHump(moduleName),
        },
        {//10
            reg: classNamePlaceholder,
            content: transitionClassNamePlaceholder(moduleName),
        },
    ]
    return replaceAllRules(rulesArr,fileContent)
}

module.exports = {
    parseRouterIndex,
    parseRouter$VAR_SMALL_HUMP$,
    parseController$VAR_SMALL_HUMP$,

    parseValidation$VAR_SMALL_HUMP$Index,
    parseValidation$VAR_SMALL_HUMP$save$VAR_BIG_HUMP$,
    parseValidation$VAR_SMALL_HUMP$delete$VAR_BIG_HUMP$ByUid,
    parseValidation$VAR_SMALL_HUMP$query$VAR_BIG_HUMP$Page,
    parseValidation$VAR_SMALL_HUMP$update$VAR_BIG_HUMP$ByUid,

    parseService$VAR_SMALL_HUMP$,
    parseDao$VAR_SMALL_HUMP$,
    parseSql$VAR_SMALL_HUMP$,

    parseVueAdminApi$VAR_SMALL_HUMP$,
    parseVueAdminApi$VAR_SMALL_HUMP$$VAR_BIG_HUMP$Scss,
    parseVueAdminApi$VAR_SMALL_HUMP$$VAR_BIG_HUMP$Vue,
}
