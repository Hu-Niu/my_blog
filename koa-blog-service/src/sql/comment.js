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
const queryCommentByCommentContentSql = `
    select * from t_comments where comment_content = ?
`

const queryCommentByUidSql = `
    select * from t_comments where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveCommentSql = `
    insert into t_comments 
    (
        uid, comment_content, comment_source, source_id,
        comment_status, comment_person_id, commented_person_id, to_comment_id,
        root_comment_id, comment_layer,order_num, create_time, update_time
    )
    values (?,?,?,?,?,?,?,?,?,?,?,?,?)
`

const deleteCommentByUidSql = `
    delete from t_comments
    where uid = ?
`
const passOrRejectCommentByUidSql = `
    update t_comments 
    set comment_status = ?
    where uid = ?
`


/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateCommentByUidSql = `
    update t_comments 
    set
        comment_content = ?, comment_source = ?, source_id = ?, comment_status = ?,
        comment_person_id = ?, commented_person_id = ?, to_comment_id = ?, root_comment_id = ?,comment_layer = ?,
        order_num = ?, create_time = ?, update_time = ?
    where uid = ?
`

/**
 * 模式 $分页查询接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryCommentPageSql = `
    select 
        * 
    from 
        t_comments
    where 
        comment_content like ?
        and comment_source like ?
        and source_id like ?
        and comment_status like ?
        and comment_person_id like ?
        and commented_person_id like ?
        and to_comment_id like ?
        and root_comment_id like ?
        and comment_layer like ?
        and order_num like ?
    order by 
        order_num,create_time desc
    limit ?,?
`
const queryCommentSql = `
    select 
        a.*,
        b.user_profile as comment_person_profile,
        b.nick_name as comment_person_name,
        b.user_identity as comment_person_identity,
        c.user_profile as commented_person_profile
            from 
                t_comments as a
        left join
            t_web_user as b
        on a.comment_person_id = b.uid
        left join
            t_web_user as c
        on a.commented_person_id = c.uid
    where 
        a.comment_content like ?
        and a.comment_source like ?
        and a.source_id like ?
        and a.comment_status like ?
        and a.comment_person_id like ?
        and a.commented_person_id like ?
        and a.to_comment_id like ?
        and a.root_comment_id like ?
        and a.comment_layer like ?
        and a.order_num like ?
    order by 
        a.order_num,a.create_time desc
`


/**
 * 模式 $查询总条数接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryAllCountCommentSql = `
    select 
        count(uid) as total 
    from 
        t_comments
    where 
        comment_content like ?
        and comment_source like ?
        and source_id like ?
        and comment_status like ?
        and comment_person_id like ?
        and commented_person_id like ?
        and to_comment_id like ?
        and root_comment_id like ?
        and comment_layer like ?
        and order_num like ?
`


const queryCommentAllSql = `
    select * from t_comments
    order by order_num,create_time desc
`

module.exports = {
    saveCommentSql,
    deleteCommentByUidSql,
    updateCommentByUidSql,
    queryCommentPageSql,
    queryCommentSql,
    queryAllCountCommentSql,
    queryCommentByCommentContentSql,
    queryCommentByUidSql,
    queryCommentAllSql,
    passOrRejectCommentByUidSql,
}
