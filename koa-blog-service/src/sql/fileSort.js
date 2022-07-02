const queryFileSortBySortNameSql = `
    select * from t_file_sort
    where sort_name = ?
`
const queryFileSortBySortIdSql = `
    select * from t_file_sort
    where uid = ?
`

const saveFileSortSql = `
    insert into t_file_sort (uid, cover_img, sort_name, order_num, create_time, update_time)
    values (?,?,?,?,?,?)
`

const deleteFileSortByUidSql = `
    delete from t_file_sort
    where uid = ?
`

const updateFileSortByUidSql = `
    update t_file_sort set 
    cover_img = ?, sort_name = ?, order_num = ?,update_time = ?
    where uid = ?
`

const queryFileSortPageSql = `
    select * from t_file_sort
    where sort_name like ?
    order by order_num,create_time desc
    limit ?,?
`

const queryAllCountFileSortSql = `
    select count(uid) as total from t_file_sort
`



module.exports = {
    saveFileSortSql,
    deleteFileSortByUidSql,
    updateFileSortByUidSql,
    queryFileSortPageSql,
    queryFileSortBySortNameSql,
    queryAllCountFileSortSql,
    queryFileSortBySortIdSql,
}
