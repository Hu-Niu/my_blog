// 给密码进行加密 封装的公用方法，返回加密后的密码
const bcrypt = require('bcryptjs');

// 对密码进行加密，返回加密后的hash值，存入数据库
const encryption = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(hash)
                }
            });
        })
    })
}

// 传过来的密码和数据库中存的hash值进行匹配，返回true或false
const compare = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash).then((res) => {
            resolve(res)
        });
    })
}

module.exports = {
    encryption,
    compare
}
