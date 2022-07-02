const {blogs} = require('./1')

/*const arr = [{
    label: '热门城市',
    options: [{
        value: 'Shanghai',
        label: '上海'
    }, {
        value: 'Beijing',
        label: '北京'
    }]
}, {
    label: '城市名',
    options: [{
        value: 'Chengdu',
        label: '成都'
    }, {
        value: 'Shenzhen',
        label: '深圳'
    }, {
        value: 'Guangzhou',
        label: '广州'
    }, {
        value: 'Dalian',
        label: '大连'
    }]
}]*/

let resultArr = []
let tempMap = new Map()

blogs.map(item => {
    let mapKey = item.sort_name ? item.sort_name : 'default'
    let tempObj = {
        value: item.uid,
        label: item.blog_title
    }
    if (tempMap.has(mapKey)) {
        tempMap.get(mapKey).push(tempObj)
    } else {
        tempMap.set(mapKey, [tempObj])
    }
})

for (const key of tempMap.keys()) {
    resultArr.push({
        label: key,
        options: tempMap.get(key)
    })
}
console.log(JSON.stringify(resultArr, null, 4))
