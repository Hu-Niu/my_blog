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
const querySpecialBySpecialNameSql = `
    select * from t_special where special_name = ?
`

const querySpecialByUidSql = `
    select * from t_special where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveSpecialSql = `
    insert into t_special 
    (
        uid, special_name, special_summary, cover_url,
        special_sort_id, clicks, is_private, order_num, create_time,
        update_time
    )
    values (?,?,?,?,?,?,?,?,?,?)
`

const deleteSpecialByUidSql = `
    delete from t_special
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateSpecialByUidSql = `
    update t_special 
    set
        special_name = ?, special_summary = ?, cover_url = ?, special_sort_id = ?,
        clicks = ?, is_private = ?, order_num = ?, create_time = ?, update_time = ?
    where uid = ?
`

/**
 * 模式 $分页查询接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const querySpecialPageSql = `
    select 
        a.*,
        b.special_sort_name
    from
    (
        select
            * 
        from 
            t_special
        where 
            special_name like ?
            and special_summary like ?
            and special_sort_id like ?
            and clicks like ?
            and is_private like ?
            and order_num like ?
        order by 
            order_num,create_time desc
        limit ?,?
    ) as a
    left join
        (
            select 
                uid,
                special_sort_name 
            from 
                t_special_sort
        ) as b
    on a.special_sort_id = b.uid
    

`

/**
 * 模式 $查询总条数接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryAllCountSpecialSql = `
    select 
        count(uid) as total 
    from 
        t_special
    where 
        special_name like ?
        and special_summary like ?
        and special_sort_id like ?
        and clicks like ?
        and is_private like ?
        and order_num like ?
`

const querySpecialAllSql = `
    select * from t_special
    order by order_num,create_time desc
`
const querySpecialAllSql2 = `
    select * from t_special
    where is_private <> 1
    order by order_num,create_time desc
`


module.exports = {
    saveSpecialSql,
    deleteSpecialByUidSql,
    updateSpecialByUidSql,
    querySpecialPageSql,
    queryAllCountSpecialSql,
    querySpecialBySpecialNameSql,
    querySpecialByUidSql,
    querySpecialAllSql,
    querySpecialAllSql2,
}
