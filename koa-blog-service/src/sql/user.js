const queryUserByUidSql = `
    select * from t_user
    where uid = ?
`
const queryUserByUsernameSql = `
    select * from t_user
    where user_name = ?
`
const saveUserSql = `
    insert into t_user (uid,user_name,password)
    values (?,?,?)
`
const updateUserByUsernameSql = `
    update t_user set password = ?
    where user_name = ?
`

module.exports = {
    queryUserByUidSql,
    queryUserByUsernameSql,
    saveUserSql,
    updateUserByUsernameSql,
}
