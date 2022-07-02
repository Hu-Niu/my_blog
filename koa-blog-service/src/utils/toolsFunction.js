/**
 * @desc 判断是否为空
 * @param value
 * @return {boolean} 空对象、空字符串、undefined、null、'   '、均返回true，否则返回false
 */
const isEmpty = (value) => {
    return (
        value === undefined
        || value === null
        || (typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0)
    )
}

/**
 * @description 数据库多表关联查出来的数据，处理成符合逻辑的数据格式
 * @param {Array} exclude 需要挑出来的字段
 * @param {Array} data 待处理的原数据
 * @param {String} name 新增的列名
 * @return {Array} 处理后的数据，把多表关联出来的数据，将重复的部分变为数组
 * 比如：[
 *          {
 *              a: 1,
 *              b: 2,
 *              c1: c,
 *              c2: c
 *          },
 *          {
 *              a: 1,
 *              b: 2,
 *              c1: cc,
 *              c2: dd
 *          },
 *      ]
 * 转换为
 *      [
 *          {
 *              a: 1,
 *              b: 2,
 *              name: [
 *                  {
 *                      c1: c,
 *                      c2: d
 *                  },
 *                  {
 *                      c1: cc,
 *                      c2: dd
 *                  }
 *              ]
 *          },
 *      ]
 *
 */
const dealTableData = (exclude, data, name) => {
    let result = data.reduce((prev, current) => {
        /**
         * 1、每次往数组塞一个对象
         * 2、exclude排除的字段就是多条的记录
         * 3、把不同的记录变为一个数组，塞到之前的记录里
         */
        let tempObj = {
            [name]: []
        }

        let excludeObj = {}

        for (const key of exclude) {
            if(current[key]){
                excludeObj[key] = current[key]
            }
        }

        if (!prev.uids.includes(current.uid)) { // 如果是新记录，塞一条新的
            for (const key in current) {
                if (!exclude.includes(key)) {
                    tempObj[key] = current[key]
                }
            }
            prev.result.push(tempObj)
        }

        if(Object.keys(excludeObj).length > 0){
            prev.result[prev.result.length - 1][name].push(excludeObj)
        }

        prev.uids.push(current.uid)

        return prev

    }, {uids: [], result: []})

    return result.result
}

module.exports = {
    isEmpty,
    dealTableData,
}
