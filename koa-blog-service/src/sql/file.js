const saveFileSql = `
    insert into t_file (uid,file_original_name,file_current_name,file_suffix,file_sort_id,file_sort_name,create_time,update_time)
    values (?,?,?,?,?,?,?,?)
`

const queryAllFileSortSql = `
    select * from t_file_sort
    order by order_num,create_time desc
`

const queryAllFilePageSql = `
    select * from t_file
    where file_sort_id = ? and create_time like ?
    order by create_time desc
    limit ?,?
`
const queryAllFileSql = `
    select * from t_file
    where file_sort_id like ? and create_time like ?
    order by create_time desc
`

const queryAllFileCountSql = `
    select count(uid) as total from t_file
    where file_sort_id = ? and create_time like ?
`

const deleteFileByUidSql = `
    delete from t_file
    where uid = ?
`

const updateFileSortByUidSql = `
    update t_file set 
    file_sort_id = ?, file_sort_name = ?, update_time = ?
    where uid = ?
`


module.exports = {
    saveFileSql,
    queryAllFileSortSql,
    queryAllFilePageSql,
    queryAllFileCountSql,
    deleteFileByUidSql,
    updateFileSortByUidSql,
    queryAllFileSql,
}
