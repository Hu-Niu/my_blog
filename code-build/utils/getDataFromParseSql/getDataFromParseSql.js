/**
 * @description 根据控制台传过来的 tableName 拿到该表相关的json数据 tableData
 * @param {Array} sqlJson 所有数据表的内容
 * @param {String} tableName 当前数据表的名字
 * @return {Array} tableData 当前数据表的内容
 */
const getDataFromParseSql = (sqlJson, tableName) => {
    console.log('获取模块关联数据表数据')
    let tableData = sqlJson.filter(item => item.name === tableName)
    return tableData
}

module.exports = {
    getDataFromParseSql
}
