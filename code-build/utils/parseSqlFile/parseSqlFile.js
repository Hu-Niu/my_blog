const fs = require('fs')
const readline = require('readline')
const {
    pathDevelop,
} = require('../../config')
const filePath = pathDevelop.databaseSqlFilePath

const {
    tableNameVerify,
    tableColumnsVerify,
    columnTypeVerify,
    isRequire,
    defaultValVerify,
    columnCommentVerify,
    tableCommentVerify,
} = require('./regular')

const {typeMapper} = require('./typeMapper')

/**
 * @description 一行一行解析数据库文件
 * @param {String} filePath pupublog.sql的数据库文件路径
 * @return {Promise<[]>} result 解析后的json对象
 */
async function processLineByLine(filePath) {
    /**
     * 1、获取到sql文件的位置
     * 2、一行一行读取sql文件
     */
    const fileStream = fs.createReadStream(filePath);
    console.log(filePath, 'filePath')

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // 注意：我们使用 crlfDelay 选项将 filePath 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。

    let result = [] // 用来存储解析的字段，sql文件解析的最终结果
    let newTable = {} // 新表开始
    let column = {} // 新表的列开始


    for await (const line of rl) {
        // filePath 中的每一行在这里将会被连续地用作 `line`。
        /**
         * 开始校验
         * 1、当校验出本行为 CREATE TABLE 行，表明新表开始，先拿到表名
         * 2、当校验出 `blog_title` 行，表明开始校验列了，往对应的表里开始塞值
         *      列名
         *      列类型
         *      列默认值
         *  3、当校验出 COMMENT = 'xxxx' ROW_FORMAT = Dynamic; 行，表明开始校验表说明了，
         *      也标识着当前表校验完毕，所有信息以保存，把当前表说明保存下来后，继续从第1步开始执行
         *
         *  说明：每次匹配到新表时，就声明一个新的 {} ，然后一次往里塞值，每次匹配到表comment时
         *       结束，重新声明新 {}
         *
         *  期望的结果：
         *   [
         *      {
         *          name: 't_blog',
         *          comment: 'string',
         *          columns: [
         *              {
         *                  label: 'string',
         *                  comment: 'string',
         *                  type: 'string',
         *                  isRequire: true|false,
         *                  defaultValue: '',
         *              },
         *          ],
         *      },
         *   ]
         */
        let exec1 = tableNameVerify(line)
        let exec2 = tableColumnsVerify(line)
        let exec3 = columnTypeVerify(line)
        let exec4 = isRequire(line)
        let exec5 = defaultValVerify(line)
        let exec6 = columnCommentVerify(line)
        let exec7 = tableCommentVerify(line)


        // 表开始-表名校验
        if (exec1) {
            // console.log(exec1[0],'exec1[0]')
            newTable = {
                name: exec1[0],
                comment: '',
                columns: [],
            }
        }

        // 行开始-列名校验
        if (exec2) {
            // console.log(exec2[0],'exec2[0]')
            column = {
                label: exec2[0],
                comment: '',
                type: '',
                isRequire: false, // 默认false
                defaultValue: null, // 默认null
            }
        }

        // 行开始-列类型校验
        if (exec3) {
            // console.log(exec3[0],'exec3[0]')
            column.type = typeMapper.get(exec3[0])
        }

        // 行开始-列是否必须校验
        if (exec4) {
            // console.log(exec4[0],'exec4[0]')
            column.isRequire = true
        }

        // 行开始-列默认值校验
        if (exec5) {
            // console.log(exec5[0],'exec5[0]')
            if (exec5[0] === 'NULL') {
                column.defaultValue = null
            } else if (exec5[0] === "''") {
                column.defaultValue = ''
            } else {
                column.defaultValue = exec5[0]
            }
        }

        // 行开始-列说明校验-当前表的该列校验完毕
        if (exec6) {
            // console.log(exec6[0],'exec6[0]')
            column.comment = exec6[0]

            let obj = JSON.parse(JSON.stringify(column))
            newTable.columns.push(obj)

            column = {}

        }

        // 行开始-表说明校验-当前表校验结束
        if (exec7) {
            // console.log(exec7[0],'exec7[0]')
            newTable.comment = exec7[0]

            // 当前表校验结束，将解析的值保存下来，然后开始下一张表校验
            let obj = JSON.parse(JSON.stringify(newTable))
            result.push(obj)

            newTable = {}
        }


    }

    return result
}

/**
 * @description 3、解析数据库sql文件，转为json对象格式
 * @return {Promise<[]>} 解析过的sql，json对象格式
 */
const parseSqlFile = async () => {
    console.log('开始解析数据库文件')
    return await processLineByLine(filePath)
}

module.exports = {
    parseSqlFile
}
