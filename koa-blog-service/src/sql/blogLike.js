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
const queryBlogLikeByBlogIdSql = `
    select * from t_blog_like where blog_id = ?
`

const queryBlogLikeByUidSql = `
    select * from t_blog_like where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveBlogLikeSql = `
    insert into t_blog_like 
    (
        uid, blog_id, like_person_id, order_num,
        create_time, update_time
    )
    values (?,?,?,?,?,?)
`

const deleteBlogLikeByUidSql = `
    delete from t_blog_like
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateBlogLikeByUidSql = `
    update t_blog_like 
    set
        blog_id = ?, like_person_id = ?, order_num = ?, create_time = ?,
        update_time = ?
    where uid = ?
`

/**
 * 模式 $分页查询接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryBlogLikePageSql = `
    select 
        * 
    from 
        t_blog_like
    where 
        blog_id like ?
        and like_person_id like ?
        and order_num like ?
    order by 
        order_num,create_time desc
    limit ?,?
`
const queryBlogLikeAll2Sql = `
    select 
        * 
    from 
        t_blog_like
    where 
        blog_id like ?
        and like_person_id like ?
        and order_num like ?
    order by 
        order_num,create_time desc
`


/**
 * 模式 $查询总条数接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryAllCountBlogLikeSql = `
    select 
        count(uid) as total 
    from 
        t_blog_like
    where 
        blog_id like ?
        and like_person_id like ?
        and order_num like ?
`

const queryBlogLikeAllSql = `
    select * from t_blog_like
    order by order_num,create_time desc
`

module.exports = {
    saveBlogLikeSql,
    deleteBlogLikeByUidSql,
    updateBlogLikeByUidSql,
    queryBlogLikePageSql,
    queryAllCountBlogLikeSql,
    queryBlogLikeByBlogIdSql,
    queryBlogLikeByUidSql,
    queryBlogLikeAllSql,
    queryBlogLikeAll2Sql,
}
