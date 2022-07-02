const {
    queryUserByUidSql,
    queryUserByUsernameSql,
    saveUserSql,
    updateUserByUsernameSql,
} = require('../sql/user')
const query = require('../utils/db')

const queryUserByUid = async (uid) => {
    let resultArr = await query(queryUserByUidSql, [uid])
    return resultArr[0]
}

const queryUserByUsername = async (username) => {
    let resultArr = await query(queryUserByUsernameSql, [username])
    return resultArr[0]
}


const saveUser = async (uuid, username, password) => {
    await query(saveUserSql, [uuid, username, password])
}

const updateUserByUsername = async (password, username) => {
    await query(updateUserByUsernameSql, [password, username])
}

module.exports = {
    queryUserByUid,
    queryUserByUsername,
    saveUser,
    updateUserByUsername,
}
