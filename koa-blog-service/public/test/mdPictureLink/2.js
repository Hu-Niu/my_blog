const {str} = require('./1')

let reg = /\!\[(.*)\]\((.*)\)/g

let newStr = str.replace(reg, (_,a1,a2) => {
    console.log(_,'_______') // 匹配到的字符串
    console.log(a1,'a1a1a1a1') // 匹配的第一个括号
    console.log(a2,'a2a2a2') // 匹配的第二个括号

    // return 'aaaa' // 匹配到的字符串最终替换的内容
    return `![${a1} cheny](${a2} xzz)`
})

console.log(newStr)
