const specialPartSectionDao = require('../dao/specialPartSection')
const specialSortDao = require('../dao/specialSort')
const specialDao = require('../dao/special')
const specialPartDao = require('../dao/specialPart')
const specialPartSectionBlogDao = require('../dao/specialPartSectionBlog')

/**
 * 根据第一个参数查询
 *
 * 模式：$查询接口 根据第二个参数查询$
 * 替换方式：获取第二个参数，转换为大驼峰的格式
 */
const querySpecialPartSectionBySectionTitle = async (sectionTitle, specialPartId) => {
    return await specialPartSectionDao.querySpecialPartSectionBySectionTitle(sectionTitle, specialPartId)
}

const querySpecialPartSectionByUid = async (uid) => {
    return await specialPartSectionDao.querySpecialPartSectionByUid(uid)
}

const saveSpecialPartSection = async (params) => {
    return await specialPartSectionDao.saveSpecialPartSection(params)
}

const querySpecialPartSectionPage = async (params) => {
    return await specialPartSectionDao.querySpecialPartSectionPage(params)
}

const updateSpecialPartSectionByUid = async (params) => {
    return await specialPartSectionDao.updateSpecialPartSectionByUid(params)
}

const deleteSpecialPartSectionByUid = async (uids) => {
    let promiseArr = []
    for (const uid of uids) {
        promiseArr.push(specialPartSectionDao.deleteSpecialPartSectionByUid(uid))
    }
    return await Promise.all(promiseArr)
}

const queryAllCountSpecialPartSection = async (params) => {
    return await specialPartSectionDao.queryAllCountSpecialPartSection(params)
}

const querySpecialPartSectionAll = async () => {
    return await specialPartSectionDao.querySpecialPartSectionAll()
}
const querySpecialPartSectionTree = async (isXzzOrCheny) => {
    /**
     * 1、获取所有的专题分类
     * 2、获取所有的专题
     * 3、获取所有的专题->部分
     * 4、获取所有的专题->部分->章节
     */
        // 1、
    const specialSortList = await specialSortDao.querySpecialSortAll()
    // 2、
    const specialList = await specialDao.querySpecialAll(isXzzOrCheny)
    // 3、
    const specialPartList = await specialPartDao.querySpecialPartAll()
    // 4、
    const specialPartSectionList = await specialPartSectionDao.querySpecialPartSectionAll()

    return convertToTreeData({
        specialSortList,
        specialList,
        specialPartList,
        specialPartSectionList,
        root: 'specialSort'
    })

}
const querySpecialPartSectionBlogTreeBySpecialUid = async (uid, isXzzOrCheny) => {
    /**
     * 1、获取所有的专题
     * 2、获取所有的专题->部分
     * 3、获取所有的专题->部分->章节
     * 4、获取所有的专题->部分->章节->文章
     */

        // 1、
    const specialList = await specialDao.querySpecialByUid(uid)
    console.log(specialList, 'specialList')
    if (!specialList) { // 若果没有查到，直接啥都不用干了，前台输的是错误的uid
        return []
    } else {
        // 2、
        const specialPartList = await specialPartDao.querySpecialPartAll()
        // 3、
        const specialPartSectionList = await specialPartSectionDao.querySpecialPartSectionAll()
        // 4、
        const specialPartSectionBlogList = await specialPartSectionBlogDao.querySpecialPartSectionBlogAll(isXzzOrCheny)
        console.log(specialPartSectionBlogList[0], 'specialPartSectionBlogList[0]')

        return convertToTreeData({
            specialList: [specialList],
            specialPartList,
            specialPartSectionList,
            specialPartSectionBlogList,
            root: 'special'
        })
    }


}

const querySpecialPartSectionTree2 = async (isXzzOrCheny) => {
    /**
     * 1、获取所有的专题分类
     * 2、获取所有的专题
     * 3、获取所有的专题->部分
     * 4、获取所有的专题->部分->章节
     * 5、获取所有的专题->部分->章节->文章
     */
        // 1、
    const specialSortList = await specialSortDao.querySpecialSortAll()
    // 2、
    const specialList = await specialDao.querySpecialAll(isXzzOrCheny)
    // 3、
    const specialPartList = await specialPartDao.querySpecialPartAll()
    // 4、
    const specialPartSectionList = await specialPartSectionDao.querySpecialPartSectionAll()
    // 5、
    const specialPartSectionBlogList = await specialPartSectionBlogDao.querySpecialPartSectionBlogAll()

    return convertToTreeData({
        specialSortList,
        specialList,
        specialPartList,
        specialPartSectionList,
        specialPartSectionBlogList,
        root: 'specialSort'
    })

}


/**
 * @description 数组转换为map，根据 keyword 分组
 * @param {Array} arr 待转换的数组
 * @param {String} flag 是哪一层级的数据，做个区分
 * @return {Map<any, any>} tempMap 返回的map
 */
function convertToMap(arr, flag) {

    let tempMap = new Map()

    arr.map((item) => {
        // 转换为对应的格式
        let obj, key
        switch (flag) {
            // 二级
            case 'isSpecial':
                key = item.special_sort_id
                obj = {
                    id: item.uid,
                    label: item.special_name,
                    special_summary: item.special_summary,
                    cover_url: item.cover_url,
                    order: item.order_num,
                    [flag]: true,
                    children: []
                }
                break;
            // 三级
            case 'isSpecialPart':
                key = item.special_id
                obj = {
                    id: item.uid,
                    label: item.part_name,
                    part_title: item.part_title,
                    part_summary: item.part_summary,
                    order: item.order_num,
                    [flag]: true,
                    children: []
                }
                break;
            //  四级
            case 'isSpecialPartSection':
                key = item.special_part_id
                obj = {
                    id: item.uid,
                    label: item.section_title,
                    order: item.order_num,
                    [flag]: true,
                    children: []
                }
                break;
            //  五级
            case 'isSpecialPartSectionBlog':
                key = item.part_section_id
                obj = {
                    id: item.uid,
                    blog_id: item.blog_id,
                    label: item.blog_title,
                    order: item.order_num,
                    [flag]: true,
                    children: []
                }
                break;

        }

        if (tempMap.has(key)) {
            tempMap.get(key).push(obj)
        } else {
            tempMap.set(key, [obj])
        }
    })

    return tempMap
}

/**
 * @description 将有关联关系的数组列表，转换为树形结构
 * @param {Array} specialSortList 非必填，
 * @param {Array} specialList 非必填，
 * @param {Array} specialPartList 非必填，
 * @param {Array} specialPartSectionList 非必填，
 * @param {Array} specialPartSectionBlogList 非必填，
 * @param {String} root 必填，树形结构的第一层数据。 specialSort或special
 * @return {Array} resultArr 处理过的树形结构
 */
function convertToTreeData({
                               specialSortList = [],
                               specialList = [],
                               specialPartList = [],
                               specialPartSectionList = [],
                               specialPartSectionBlogList = [],
                               root = '',
                           }) {
    console.log(specialSortList.length, 'specialSortList.length')
    console.log(specialList.length, 'specialList.length')
    console.log(specialPartList.length, 'specialPartList.length')
    console.log(specialPartSectionList.length, 'specialPartSectionList.length')
    console.log(specialPartSectionBlogList.length, 'specialPartSectionBlogList.length')


    let resultArr = [] // 存放最终的结果

    if (root === 'specialSort') {
        console.log('root === \'specialSort\'')
        let specialMap = specialList.length > 0 ? convertToMap(specialList, 'isSpecial') : null
        let specialPartMap = specialPartList.length > 0 ? convertToMap(specialPartList, 'isSpecialPart') : null
        let specialPartSectionMap = specialPartSectionList.length > 0 ? convertToMap(specialPartSectionList, 'isSpecialPartSection') : null
        let specialPartSectionBlogMap = specialPartSectionBlogList.length > 0 ? convertToMap(specialPartSectionBlogList, 'isSpecialPartSectionBlog') : null
        // 1
        specialSortList.map(sort => {
            let sortObj = {
                id: sort.uid,
                label: sort.special_sort_name,
                order: sort.order_num,
                isSpecialSort: true,
                children: []
            }
            if (specialMap && specialMap.has(sortObj.id)) {
                // 2
                sortObj.children = specialMap.get(sortObj.id)

                sortObj.children.map(special => {
                    if (specialPartMap && specialPartMap.has(special.id)) {
                        // 3
                        special.children = specialPartMap.get(special.id)

                        special.children.map(specialPart => {
                            if (specialPartSectionMap && specialPartSectionMap.has(specialPart.id)) {
                                // 4
                                specialPart.children = specialPartSectionMap.get(specialPart.id)

                                specialPart.children.map(specialPartSectionBlog => {
                                    if (specialPartSectionBlogMap && specialPartSectionBlogMap.has(specialPartSectionBlog.id)) {
                                        // 5
                                        specialPartSectionBlog.children = specialPartSectionBlogMap.get(specialPartSectionBlog.id)
                                    }
                                })

                            }
                        })
                    }
                })

            }

            resultArr.push(sortObj)
        })
    } else if (root === 'special') {
        console.log('root === \'special\'')
        let specialPartMap = specialPartList.length > 0 ? convertToMap(specialPartList, 'isSpecialPart') : null
        let specialPartSectionMap = specialPartSectionList.length > 0 ? convertToMap(specialPartSectionList, 'isSpecialPartSection') : null
        let specialPartSectionBlogMap = specialPartSectionBlogList.length > 0 ? convertToMap(specialPartSectionBlogList, 'isSpecialPartSectionBlog') : null
        // 1
        console.log(specialList, 'specialList')
        specialList.map(special => {
            let specialObj = {
                id: special.uid,
                label: special.special_name,
                special_summary: special.special_summary,
                cover_url: special.cover_url,
                order: special.order_num,
                isSpecial: true,
                children: []
            }
            if (specialPartMap && specialPartMap.has(specialObj.id)) {
                // 2
                specialObj.children = specialPartMap.get(specialObj.id)

                specialObj.children.map(specialPart => {
                    if (specialPartSectionMap && specialPartSectionMap.has(specialPart.id)) {
                        // 3
                        specialPart.children = specialPartSectionMap.get(specialPart.id)

                        specialPart.children.map(specialPartSectionBlog => {
                            if (specialPartSectionBlogMap && specialPartSectionBlogMap.has(specialPartSectionBlog.id)) {
                                // 4
                                specialPartSectionBlog.children = specialPartSectionBlogMap.get(specialPartSectionBlog.id)
                            }
                        })

                    }
                })
            }


            resultArr.push(specialObj)
        })

    }


    return resultArr
}

module.exports = {
    saveSpecialPartSection,
    deleteSpecialPartSectionByUid,
    updateSpecialPartSectionByUid,
    querySpecialPartSectionPage,
    querySpecialPartSectionAll,
    queryAllCountSpecialPartSection,
    querySpecialPartSectionBySectionTitle,
    querySpecialPartSectionByUid,
    querySpecialPartSectionTree,
    querySpecialPartSectionTree2,
    querySpecialPartSectionBlogTreeBySpecialUid,
}
