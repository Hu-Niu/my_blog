const mysql = require('mysql')
const {database} = require('../constant/config')

// 连接池
let pool = mysql.createPool({
    host: database.host, // 连接的服务器（代码托管到线上后，需改为内网IP，而非外网）
    port: database.port, // mysql服务运行的端口
    database: database.database, // 连接的数据库
    user: database.user, // 用户名
    password: database.password //用户密码
})

// 对数据库进行增删改查操作的基础
const query = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) reject(err)
                    else resolve(rows)
                    connection.release()
                })
            }
        })
    })
}

module.exports = query
