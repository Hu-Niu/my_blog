// &nbsp& 代表注释里的空格
/**
 * tableName 表名：以 CREATE &nbsp& TABLE ` 开始，匹配到第一个 ` 结束，中间夹着的字符串
 * tableColumns 表字段名：以 &nbsp& &nbsp&（两位空格） ` 开始，匹配到第一个 ` 结束，中间夹着的字符串
 * columnType 枚举出来
 * isRequire 字段是否必填：NOT NULL
 * defaultVal 字段的默认值：以 DEFAULT &nbsp& 开始，匹配到第一个 &nbsp& 结束，中间夹着的字符串，补充：前面还得是 `.....DEFAULT &nbsp& 这样才能说明是字段的默认值，sqlYog和navicat导出来的sql文件不一样
 * columnComment 字段注释：以 COMMENT &nbsp& = &nbsp&' 开始，匹配到 ',末尾结束符 结束，中间夹着的字符串，补充：&nbsp&是可有可无的，sqlYog和navicat导出来的sql文件不一样
 */
const tableName = /(?<=CREATE TABLE `).*?(?=`)/
const tableColumns = /(?<=  `).*?(?=`)/
const columnType = /(\bvarchar\b|\blongtext\b|\bint\b|\btimestamp\b|\bdatetime\b|\btinyint\b)/
const isRequire = /NOT NULL/
const defaultVal = /(?<=` .* DEFAULT ).*?(?= )/
const columnComment = /(?<=COMMENT ').*?(?=',$)/
const tableComment = /(?<=COMMENT ?= ?').*?(?=')/

module.exports = {
    tableNameVerify: (line) => {
        return tableName.exec(line)
    },
    tableColumnsVerify: (line) => {
        return tableColumns.exec(line)
    },
    columnTypeVerify: (line) => {
        return columnType.exec(line)
    },
    isRequire: (line) => {
        return isRequire.exec(line)
    },
    defaultValVerify: (line) => {
        return defaultVal.exec(line)
    },
    columnCommentVerify: (line) => {
        return columnComment.exec(line)
    },
    tableCommentVerify: (line) => {
        return tableComment.exec(line)
    },
}


