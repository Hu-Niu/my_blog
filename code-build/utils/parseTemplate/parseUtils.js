const {transitionBigHump} = require('./regular')

/**
 * @description 替换本文中所有占位符
 * @param {Array} rulesArr 存放所有替换规则的正则表达式、及需要替换的内容
 * @param {String} fileContent 等待替换的文本字符串
 * @return {String} result 替换好的文本字符串
 */
const replaceAllRules = (rulesArr, fileContent) => {
    /**
     * 遍历所有的规则，每次将替换好的内容返回，让下一个替换规则使用
     * 最终所有的规则依次都替换一遍，返回替换后的内容
     *
     * 参数示例：
     *      let fileContent = `1111 $aa$ 2222 $bb$ 333 $aa$ `
     *      let rulesArr = [
     *          {
     *              reg: /\$aa\$/g,
     *              content: 'chenyAA'
     *          },
     *          {
     *              reg: /\$bb\$/g,
     *              content: 'chenyBB'
     *          },
     *       ]
     * 输出最终结果：
     *      1111 chenyAA 2222 chenyBB 333 chenyAA
     */
    return rulesArr.reduce((prev, current) => {
        return prev.replace(current.reg, () => {
            return current.content
        })
    }, fileContent)
}

/**
 * @description 从数据表数据中，获取所有必填的列名
 * @param {Array} tableData 需要操作的数据表数据
 * @return {Array} result 提取出的所有必填列名
 */
const getRequiredColumns = (tableData) => {
    let resultArr = []
    tableData[0].columns.filter(item => {
        if (item.isRequire) {
            resultArr.push(item.label)
        }
    })
    return resultArr
}
/**
 * @description 从数据表数据中，获取所有设有默认值的列名
 * @param {Array} tableData 需要操作的数据表数据
 * @return {Array} result 提取出的所有设有默认值的列名
 */
const getNotNullColumns = (tableData) => {
    let resultArr = []
    tableData[0].columns.filter(item => {
        if (item.defaultValue !== null) {
            resultArr.push(item.label)
        }
    })
    return resultArr
}
/**
 * @description 从数据表数据中，获取列名的中文注释
 * @param {Array} tableData 需要操作的数据表数据
 * @param {Array} columns 需要筛选的列名数组
 * @return {Array} result 提取出的列名的中文注释
 */
const getChineseColumnsAnnotation = (tableData, columns) => {
    let result = []
    tableData[0].columns.map(item => {
        if (columns.includes(item.label)) {
            result.push({
                label: item.label,
                annotation: item.comment.split('：')[0]
            })
        }
    })
    return result
}
/**
 * @description 从数据表数据中，获取所有设有默认值的列名的类型
 * @param {Array} tableData 需要操作的数据表数据
 * @return {Array} result 提取出的所有设有默认值的列名的类型
 */
const getNotNullColumnsType = (tableData) => {
    let resultArr = []
    tableData[0].columns.filter(item => {
        if (item.defaultValue !== null) {
            resultArr.push(item.type)
        }
    })
    return resultArr
}

/**
 * @description 根据列名获取默认值
 * @param {Array} excludedColumns 列名
 * @param {Array} tableData 需要操作的数据表数据
 * @return {Array} 列名的默认值
 */
const getColumnsDefaultValues = (tableData, excludedColumns) => {
    let resultArr = []
    tableData[0].columns.filter(item => {
        if (excludedColumns.includes(item.label)) {
            resultArr.push(item.defaultValue)
        }
    })
    return resultArr
}

/**
 * @description 拼接参数默认值字符串
 * @param {Array} smallHumpColumns 列名
 * @param {Array} defaultValues 默认值
 * @return {String} str 拼接后的字符串
 * 例如：blogSummary = blogSummary ? blogSummary : ''\nrecommendLevel = recommendLevel ? recommendLevel : '-1'\n
 */
const setDefaultValuePlaceholder = (smallHumpColumns, defaultValues) => {
    let str = ''
    smallHumpColumns.forEach((item, index) => {
        let val;
        switch (defaultValues[index]) {
            case '':
                val = `\'\'`
                break
            default:
                val = defaultValues[index]
        }
        let tempStr = `    ${item} = ${item} ? ${item} : ${val}\n`
        str += tempStr
    })
    return str
}

/**
 * @description 拼接参数默认值 为空字符串
 * @param {Array} smallHumpColumns 列名
 * @param {Array} notNullColumnsType 列名对应的类型
 * @return {String} str 拼接后的字符串
 *  有默认值，且默认值不为null，
 *  将连字符变量，替换为为小驼峰格式字符串，
 *  需根据数据循环拼接字符串，关键值使用列名的小驼峰格式，默认值设为空字符串
 *  例如：blogSummary = blogSummary ? blogSummary : ''\nrecommendLevel = recommendLevel ? recommendLevel : ''\n
 *  注意：区分int类型和varchar类型的模糊查询，int类型有值就是值，无值就是% varchar类型有值就是值，无值就是''
 */
const setDefaultValueAsEmptyStringPlaceholder = (smallHumpColumns, notNullColumnsType) => {
    let str = ''
    smallHumpColumns.forEach((item, index) => {

        switch (notNullColumnsType[index]) {
            case 'Number':
                str += `    ${item} = ${item} ? ${item} : '%'\n`
                break;
            case 'String':
                str += `    ${item} = ${item} ? ${item} : ''\n`
                break;
            default:
                str += `    ${item} = ${item} ? ${item} : ''\n`
        }
    })
    return str
}

/**
 * @description 拼接校验参数的注释
 * @param {Array} smallHumpColumns 列名
 * @return {String} str 拼接后的字符串
 * 例如： * @param blogTitle 不能为空\n * @param isOriginal 不能为空\n
 */
const setVerityParamsCommentPlaceholder = (smallHumpColumns) => {
    let str = ''
    smallHumpColumns.forEach((item, index) => {
        if (index === smallHumpColumns.length - 1) { // 最后一个不换行
            str += ` * @param ${item} 不能为空`
        } else {
            str += ` * @param ${item} 不能为空\n`
        }
    })
    return str
}


/**
 * @description 从数据表数据中，获取所有列名
 * @param {Array} tableData 需要操作的数据表数据
 * @return {Array} resultArr 提取出的所有列明
 */
const getAllColumnsName = (tableData) => {
    const resultArr = []
    for (const column of tableData[0].columns) {
        resultArr.push(column.label)
    }

    return resultArr
}

/**
 * @description 根据列表名，转换为字符串
 * @param {Array} columns 数据表的列名
 * @param {Number} lineNum 几个参数换一行
 * @param {Number} blankCount 回车换行后空格的个数
 *
 */
const convertToString = (columns, lineNum, blankCount) => {
    let str = ''
    let blankString = ''
    for (let i = 0; i < blankCount; i++) {
        blankString += `\u0020`
    }

    columns.forEach((item, index) => {
        // 不是最后一个，(索引+1)正好是lineNum的倍数
        if ((index + 1) % lineNum === 0 && index !== columns.length - 1) { // 几个参数换一行
            str += `${item},\n${blankString}`
        } else if (index === columns.length - 1) { // 最后一个字符不要,
            str += `${item}`
        } else {
            str += `${item}, `
        }
    })
    return str
}

/**
 * @description 根据列表名和中文注释，转换为对应的筛选条件输入框字符串
 * @param {Array} chineseColumnsAnnotation 数据表的列名
 * @param {Array} smallHumpColumns 列名对应的小驼峰格式，与chineseColumnsAnnotation里的列名一一对应
 * @return {String} str 替换后的文本
 * 例如：<el-input clearable style="width: 150px;" v-model="searchParam.sortName" placeholder="请输入分类名" @keyup.enter.native="handleFind"/>
 * 注意：请输入分类名，汉字提示用注释里的中文冒号提取出来，注释都按照 ${分类名：存储分类的名字} 格式命名的
 *                 <el-input
 *                   clearable
 *                   style="width: 150px;"
 *                   v-model="searchParam.sortName"
 *                   placeholder="请输入分类名"
 *                   @keyup.enter.native="handleFind"
 *                  />
 *
 */
const convertToFilterInputBoxString = (chineseColumnsAnnotation, smallHumpColumns) => {
    let str = ''
    chineseColumnsAnnotation.map((item, index) => {
        str += `        <el-input
            clearable
            style="width: 150px;"
            v-model="searchParam.${smallHumpColumns[index]}"
            placeholder="请输入${item.annotation}"
            @keyup.enter.native="handleFind"
        />\n
`
    })
    return str
}
/**
 * @description 根据列表名和中文注释，转换为对应的添加或修改对话框内容字符串
 * @param {Array} chineseColumnsAnnotation 数据表的列名
 * @param {Array} smallHumpColumns 列名对应的小驼峰格式，与chineseColumnsAnnotation里的列名一一对应
 * @return {String} str 替换后的文本
 *  例如：
 *      <el-row>
 *          <el-col :span="12">
 *              <el-form-item label="分类名" label-width="120px" prop="sortName">
 *                 <el-input v-model="form.sortName" auto-complete="off"></el-input>
 *              </el-form-item>
 *          </el-col>
 *      </el-row>
 *
 */
const convertToAddOrModifyDialogContentString = (chineseColumnsAnnotation, smallHumpColumns) => {
    let str = ''
    chineseColumnsAnnotation.map((item, index) => {
        str += `        <el-row>
          <el-col :span="12">
            <el-form-item label="${item.annotation}" label-width="120px" prop="${smallHumpColumns[index]}">
              <el-input v-model="form.${smallHumpColumns[index]}" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>\n
`
    })
    return str
}
/**
 * @description 根据列表名，转换为form内容数据字符串
 * @param {Array} smallHumpColumns 小驼峰格式列名
 * @return {String} str 替换后的文本
 *  例如：
 *      form: {
 *          sortName: null,
 *          intro: null,
 *          order: null
 *      }
 *
 */
const convertToFormContentDataString = (smallHumpColumns) => {
    let str = ''
    smallHumpColumns.map((item, index) => {
        if (index === smallHumpColumns.length - 1) { // 最后一个不带逗号
            str += `        ${item}: null`
        }else {
            str += `        ${item}: null,\n`
        }
    })
    return str
}
/**
 * @description 根据列表名，转换为添加事件form数据初始字符串
 * @param {Array} smallHumpColumns 小驼峰格式列名
 * @return {String} str 替换后的文本
 *  例如：
 *      this.form = {
 *         sortName: null,
 *         intro: null,
 *         order: null
 *       }
 *
 */
const convertToAddEventFormDataInitString = (smallHumpColumns) => {
    let str = ''
    smallHumpColumns.map((item, index) => {
        if (index === smallHumpColumns.length - 1) { // 最后一个不带逗号
            str += `        ${item}: null`
        }else {
            str += `        ${item}: null,\n`
        }
    })
    return str
}

/**
 * @description 根据列表名，转换为编辑方法form内容数据
 * @param {Array} smallHumpColumns 小驼峰格式列名
 * @param {Array} excludedColumns 未经过处理的原列名
 * @return {String} str 替换后的文本
 *  例如：
 *      this.form = {
 *         sortName: row.sort_name,
 *         intro: row.intro,
 *         order: row.order_num,
 *         uid: row.uid
 *       }
 *
 */
const convertToEditMethodFormContentDataString = (smallHumpColumns,excludedColumns) => {
    let str = ''
    smallHumpColumns.map((item, index) => {
        if (index === smallHumpColumns.length - 1) { // 最后一个不带逗号
            str += `        ${item}: row.${excludedColumns[index]}`
        }else {
            str += `        ${item}: row.${excludedColumns[index]},\n`
        }
    })
    return str
}

/**
 * @description 根据列表名，转换为searchParam内容数据字符串
 * @param {Array} smallHumpColumns 小驼峰格式列名
 * @return {String} str 替换后的文本
 *  例如：
 *      searchParam: {
 *         sortName: null,
 *       }
 *
 */
const convertToSearchParamContentDataString = (smallHumpColumns) => {
    let str = ''
    smallHumpColumns.map((item, index) => {
        if (index === smallHumpColumns.length - 1) { // 最后一个不带逗号
            str += `        ${item}: null`
        }else {
            str += `        ${item}: null,\n`
        }
    })
    return str
}


/**
 * @description 根据列表名和中文注释，转换为table表格内容字符串
 * @param {Array} chineseColumnsAnnotation 数据表的列名
 * @return {String} str 替换后的文本
 *         例如：
 *               <el-table-column label="分类名" min-width="100" align="center">
 *                   <template slot-scope="scope">
 *                      <span>{{ scope.row.sort_name }}</span>
 *                   </template>
 *               </el-table-column>
 *
 */
const convertToTableContentString = (chineseColumnsAnnotation) => {
    let str = ''
    chineseColumnsAnnotation.map(item => {
        str += `        <el-table-column label="${item.annotation}" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.${item.label} }}</span>
          </template>
        </el-table-column>\n
`
    })
    return str
}

/**
 * @description 连字符格式变量转为小驼峰格式
 * @param {Array} columns 数据表的列名
 * @return {Array} 转换为小驼峰的列名
 */
const hyphenToSmallHump = (columns) => {
    const reg = /_(\w)/g
    return columns.map(item => {
        return item.replace(reg, (_, c) => {
            return c ? c.toUpperCase() : ''
        })
    })
}

/**
 * @description 小驼峰变量转为小驼峰连字符格式
 * @param {Array} columns 数据表的列名
 * @return {Array} 转换为小驼峰的列名
 */
const smallHumpToSmallHumpHyphen = (columns) => {
    const reg = /[A-Z]/g
    return columns.map(item => {
        return item.replace(reg, (_) => {
            return _ ? `-${_.toLowerCase()}` : ''
        })
    })
}


/**
 * @description 连字符格式变量转为大驼峰格式
 * @param {Array} columns 数据表的列名
 * @return {Array} 转换为大驼峰的列名
 */
const hyphenToBigHump = (columns) => {
    /**
     * 1、先全部转换为小驼峰
     * 2、再将第一个字母变为大写
     */
    let smallHumpArr = hyphenToSmallHump(columns)

    return smallHumpArr.map(item => {
        return transitionBigHump(item)
    })
}

/**
 * @description 连字符格式变量转为常量格式
 * @param {Array} columns 数据表的列名
 * @return {Array} 转换为常量格式的列名
 */
const hyphenToConstant = (columns) => {
    /**
     * 1、先全部转换常量
     */
    return columns.map(item => {
        return item.toUpperCase()
    })
}


/**
 * @description 排除一些字段
 * @param {Array} columns 数据表的所有列名
 * @param {Array} excludeArr 需要排除的列名
 * @return {Array} 排除一些字段后的列名
 */
const excludeSomeColumns = (columns, excludeArr) => {
    return columns.filter(item => {
        if (!excludeArr.includes(item)) {
            return item
        }
    })
}
/**
 * @description 排出后字段的列名的类型
 * @param {Array} tableData 需要操作的数据表数据
 * @param {Array} excludeArr 排出后的列名
 * @return {Array} 排出后字段的列名的类型
 */
const excludeSomeColumnsType = (tableData, excludeArr) => {
    let tempArr = []
    tableData[0].columns.map(item => {
        if (excludeArr.includes(item.label)) {
            tempArr.push(item.type)
        }
    })
    return tempArr
}

/**
 * @description 拼接临时参数占位符
 * @param {Array} smallHumpColumns 列名
 * @return {String} str 拼接后的字符串
 * 例如：    let _blogTitle = isEmpty(blogTitle) ? '' : blogTitle\n    let _isOriginal = isEmpty(isOriginal) ? '' : isOriginal\n
 */
const setVerityTemporaryParamsPlaceholder = (smallHumpColumns) => {
    let str = ''
    smallHumpColumns.forEach((item) => {
        str += `    let _${item} = isEmpty(${item}) ? '' : ${item}\n`
    })
    return str
}

/**
 * @description 拼接临时参数占位符
 * @param {Array} smallHumpColumns 列名
 * @return {String} str 拼接后的字符串
 * 例如：    if (!_blogTitle) {\n        return {\n            errorMsg: 'blogTitle不能为空',\n            isValid,\n        }\n    }\n
 */
const setVerityParamsJudgePlaceholder = (smallHumpColumns) => {
    let str = ''
    smallHumpColumns.forEach((item) => {
        str += `    if (!_${item}) {\n        return {\n            errorMsg: '${item}不能为空',\n            isValid,\n        }\n    }\n`
    })
    return str
}

/**
 * @description 拼接模糊查询字符串
 * @param {Array} smallHumpColumns 列名
 * @param {Array} excludedColumnsType 列名对应的类型
 * @return {String} str 拼接后的字符串
 * 例如：            `%${blogTitle}%`,\n            `%${blogAuthorId}%`,\n
 * 注意：区分int类型和varchar类型的模糊查询，int类型不带%，varchar类型带%
 */
const setFuzzyQueryString = (smallHumpColumns, excludedColumnsType) => {
    let str = ''
    smallHumpColumns.forEach((item, index) => {

        switch (excludedColumnsType[index]) {
            case 'Number':
                if (index === smallHumpColumns.length - 1) { // 最后一行不回车，不带逗号
                    str += `            \`\$\{${item}\}\``
                } else {
                    str += `            \`\$\{${item}\}\`,\n`
                }
                break;
            case 'String':
                if (index === smallHumpColumns.length - 1) { // 最后一行不回车，不带逗号
                    str += `            \`\%\$\{${item}\}\%\``
                } else {
                    str += `            \`\%\$\{${item}\}\%\`,\n`
                }
                break;
            default:
                if (index === smallHumpColumns.length - 1) { // 最后一行不回车，不带逗号
                    str += `            \`\%\$\{${item}\}\%\``
                } else {
                    str += `            \`\%\$\{${item}\}\%\`,\n`
                }

        }
    })
    return str
}

/**
 * @description 根据列名拼接 ? 占位符字符串
 * @param {Array} columns 列名
 * @return {String} str 拼接后的字符串
 * 例如：?,?,?,?,?,?,?,?,?,?,?,?,?,?
 */
const setQuestionMarkPlaceholderString = (columns) => {
    let str = ''
    for (let i = 0; i < columns.length; i++) {
        if (i === columns.length - 1) { // 最后一位不加逗号
            str += `?`
        } else {
            str += `?,`
        }
    }
    return str
}

/**
 * @description 根据列表名，拼接接收问号占位符字符串
 * @param {Array} columns 数据表的列名
 * @param {Number} lineNum 几个参数换一行
 * @param {Number} blankCount 回车换行后空格的个数
 * @return {String} str 拼接后的字符串
 *        例如：blog_title = ?, blog_summary = ?, blog_author_id = ?,
 *
 */
const convertToQuestionMarkString1 = (columns, lineNum, blankCount) => {
    let str = ''
    let blankString = ''
    for (let i = 0; i < blankCount; i++) {
        blankString += `\u0020`
    }

    columns.forEach((item, index) => {
        // 不是最后一个，(索引+1)正好是lineNum的倍数
        if ((index + 1) % lineNum === 0 && index !== columns.length - 1) { // 几个参数换一行
            str += `${item} = ?,\n${blankString}`
        } else if (index === columns.length - 1) { // 最后一个字符不要,
            str += `${item} = ?`
        } else {
            str += `${item} = ?, `
        }
    })
    return str
}

/**
 * @description 根据列表名，拼接接收问号占位符字符串
 * @param {Array} columns 数据表的列名
 * @return {String} str
 *        例如：blog_title like ?\n        and blog_author_id like ?
 *
 */
const convertToQuestionMarkString2 = (columns) => {
    let str = ''
    columns.forEach((item, index) => {
        // 不是最后一个，(索引+1)正好是lineNum的倍数
        if (index === columns.length - 1) { // 最后一个字符不要 \n        and
            str += `${item} like ?`
        } else {
            str += `${item} like ?\n        and `
        }
    })
    return str
}


module.exports = {
    replaceAllRules,
    getRequiredColumns,
    getNotNullColumns,
    getNotNullColumnsType,
    getColumnsDefaultValues,
    getChineseColumnsAnnotation,
    getAllColumnsName,
    convertToString,
    convertToTableContentString,
    hyphenToSmallHump,
    smallHumpToSmallHumpHyphen,
    hyphenToBigHump,
    hyphenToConstant,
    excludeSomeColumns,
    excludeSomeColumnsType,
    setDefaultValuePlaceholder,
    setDefaultValueAsEmptyStringPlaceholder,
    setVerityParamsCommentPlaceholder,
    setVerityTemporaryParamsPlaceholder,
    setVerityParamsJudgePlaceholder,
    setFuzzyQueryString,
    setQuestionMarkPlaceholderString,
    convertToQuestionMarkString1,
    convertToQuestionMarkString2,
    convertToFilterInputBoxString,
    convertToAddOrModifyDialogContentString,
    convertToFormContentDataString,
    convertToSearchParamContentDataString,
    convertToAddEventFormDataInitString,
    convertToEditMethodFormContentDataString,
}
