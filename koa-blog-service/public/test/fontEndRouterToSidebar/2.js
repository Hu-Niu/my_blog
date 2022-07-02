const {routers} = require('./1')


/**
 * 1、找出 isSidebar: true, 为父级
 *   "name": meta.title,
 *   "icon": meta.icon,
 *   "url": path,
 *   "uid": name
 * 2、找出子集
 *   "name": meta.title,
 *   "icon": meta.icon,
 *   "parentUid": parent.uid,
 *   "url": path,
 *   "uid": name
 *
 */

let resultArr = []

routers.map(item => {

    if (item.isSidebar) { // 若果是侧边栏路由

        let tempObj = {
            parent: {
                name: item.meta.title,
                icon: item.meta.icon,
                url: item.path,
                uid: item.name,
            },
            sonItem: [],
        }

        item.children.map(child => {
            tempObj.sonItem.push({
                name: child.meta.title,
                icon: child.meta.icon,
                parentUid: item.name,
                url: child.path,
                uid: child.name,
            })
        })

        resultArr.push(tempObj)
    }

})

console.log(JSON.stringify(resultArr, null, 4))
