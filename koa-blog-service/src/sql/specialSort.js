/**
 * 模式 $查询接口语句 第二个参数大驼峰格式占位符$
 *  替换方式：从tableData提取出所有列名，
 *          取第二个参数
 *          将连字符变量，替换为为大驼峰格式字符串，
 *
 * 模式 $查询接口语句 第二个参数占位符$
 *  替换方式：从tableData提取出所有列名，
 *          取第二个参数
 *          将连字符变量，替换为为小驼峰格式字符串，
 */
const querySpecialSortBySpecialSortNameSql = `
    select * from t_special_sort where special_sort_name = ?
`

const querySpecialSortByUidSql = `
    select * from t_special_sort where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveSpecialSortSql = `
    insert into t_special_sort 
    (
        uid, special_sort_name, order_num, create_time,
        update_time
    )
    values (?,?,?,?,?)
`

const deleteSpecialSortByUidSql = `
    delete from t_special_sort
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateSpecialSortByUidSql = `
    update t_special_sort 
    set
        special_sort_name = ?, order_num = ?, create_time = ?, update_time = ?
    where uid = ?
`

/**
 * 模式 $分页查询接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const querySpecialSortPageSql = `
    select 
        * 
    from 
        t_special_sort
    where 
        special_sort_name like ?
        and order_num like ?
    order by 
        order_num,create_time desc
    limit ?,?
`

/**
 * 模式 $查询总条数接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryAllCountSpecialSortSql = `
    select 
        count(uid) as total 
    from 
        t_special_sort
    where 
        special_sort_name like ?
        and order_num like ?
`

const querySpecialSortAllSql = `
    select * from t_special_sort
    order by order_num,create_time desc
`

module.exports = {
    saveSpecialSortSql,
    deleteSpecialSortByUidSql,
    updateSpecialSortByUidSql,
    querySpecialSortPageSql,
    queryAllCountSpecialSortSql,
    querySpecialSortBySpecialSortNameSql,
    querySpecialSortByUidSql,
    querySpecialSortAllSql,
}
