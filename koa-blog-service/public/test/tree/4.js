const {
    specialSortList,
    specialList,
    specialPartList,
    specialPartSectionList,
} = require('./1')


/*
* 1、把所有的数组都先根据id转换为map结构
* 2、map的key值使用关联的id值
*
* */

/**
 * @description 数组转换为map，根据 keyword 分组
 * @param {Array} arr 待转换的数组
 * @param {String} keyword map的key值
 * @param {String} label 字段label对应的字段名
 * @param {String} flag 是哪一层级的数据，做个区分
 * @return {Map<any, any>} tempMap 返回的map
 */
function convertToMap(arr, keyword, label, flag) {
    let tempMap = new Map()
    arr.map((item) => {
        // 转换为对应的格式
        let obj = {
            id: item.uid,
            label: item[label],
            order: item.order_num,
            [flag]: true,
            children: []
        }

        const key = item[keyword]
        if (tempMap.has(key)) {
            tempMap.get(key).push(obj)
        } else {
            tempMap.set(key, [obj])
        }
    })

    return tempMap
}

let specialMap = convertToMap(specialList, 'special_sort_id', 'special_name', 'isSpecial')
let specialPartMap = convertToMap(specialPartList, 'special_id', 'part_name', 'isSpecialPart')
let specialPartSectionMap = convertToMap(specialPartSectionList, 'special_part_id', 'section_title', 'isSpecialPartSection')

let resultArr = [] // 存放最终的结果

// 1
specialSortList.map(sort => {
    let sortObj = {
        id: sort.uid,
        label: sort.special_sort_name,
        order: sort.order_num,
        isSpecialSort: true,
        children: []
    }
    if (specialMap.has(sortObj.id)) {
        // 2
        sortObj.children = specialMap.get(sortObj.id)

        sortObj.children.map(special => {
            if (specialPartMap.has(special.id)) {
                // 3
                special.children = specialPartMap.get(special.id)

                special.children.map(specialPart => {
                    if(specialPartSectionMap.has(specialPart.id)){
                        // 4
                        specialPart.children = specialPartSectionMap.get(specialPart.id)

                    }
                })
            }
        })

    }


    resultArr.push(sortObj)
})

console.log(JSON.stringify(resultArr, null, 4))
