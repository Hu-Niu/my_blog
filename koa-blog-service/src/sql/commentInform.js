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
const queryCommentInformByInformTypeSql = `
    select * from t_comments_inform where inform_type = ?
`

const queryCommentInformByUidSql = `
    select * from t_comments_inform where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveCommentInformSql = `
    insert into t_comments_inform 
    (
        uid, inform_type, inform_reason, inform_person_id,
        inform_comment_id, comment_source, source_id, order_num,
        create_time, update_time
    )
    values (?,?,?,?,?,?,?,?,?,?)
`

const deleteCommentInformByUidSql = `
    delete from t_comments_inform
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateCommentInformByUidSql = `
    update t_comments_inform 
    set
        inform_type = ?, inform_reason = ?, inform_person_id = ?, inform_comment_id = ?,
        comment_source = ?, source_id = ?, order_num = ?, create_time = ?,
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
const queryCommentInformPageSql = `
    select 
        * 
    from 
        t_comments_inform
    where 
        inform_type like ?
        and inform_reason like ?
        and inform_person_id like ?
        and inform_comment_id like ?
        and comment_source like ?
        and source_id like ?
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
const queryAllCountCommentInformSql = `
    select 
        count(uid) as total 
    from 
        t_comments_inform
    where 
        inform_type like ?
        and inform_reason like ?
        and inform_person_id like ?
        and inform_comment_id like ?
        and comment_source like ?
        and source_id like ?
        and order_num like ?
`

const queryCommentInformAllSql = `
    select * from t_comments_inform
    order by order_num,create_time desc
`

module.exports = {
    saveCommentInformSql,
    deleteCommentInformByUidSql,
    updateCommentInformByUidSql,
    queryCommentInformPageSql,
    queryAllCountCommentInformSql,
    queryCommentInformByInformTypeSql,
    queryCommentInformByUidSql,
    queryCommentInformAllSql,
}
