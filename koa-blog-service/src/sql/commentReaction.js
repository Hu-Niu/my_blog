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
const queryCommentReactionByCommentIdSql = `
    select * from t_comments_reaction where comment_id = ?
`

const queryCommentReactionByUidSql = `
    select * from t_comments_reaction where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveCommentReactionSql = `
    insert into t_comments_reaction 
    (
        uid, comment_id, reaction_person_id, reaction_content,comment_source, source_id,
        order_num, create_time, update_time
    )
    values (?,?,?,?,?,?,?,?,?)
`

const deleteCommentReactionByUidSql = `
    delete from t_comments_reaction
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateCommentReactionByUidSql = `
    update t_comments_reaction 
    set
        comment_id = ?, reaction_person_id = ?, reaction_content = ?, comment_source = ?, source_id = ?,order_num = ?,
        create_time = ?, update_time = ?
    where uid = ?
`

/**
 * 模式 $分页查询接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryCommentReactionPageSql = `
    select 
        * 
    from 
        t_comments_reaction
    where 
        comment_id like ?
        and reaction_person_id like ?
        and reaction_content like ?
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
const queryAllCountCommentReactionSql = `
    select 
        count(uid) as total 
    from 
        t_comments_reaction
    where 
        comment_id like ?
        and reaction_person_id like ?
        and reaction_content like ?
        and comment_source like ?
        and source_id like ?
        and order_num like ?
`

const queryCommentReactionAllSql = `
    select * from t_comments_reaction
    order by order_num,create_time desc
`

const queryReactionEveryContentCountSql = `
    select 
        a.comment_id,
        a.reaction_content,
        count(a.uid) as total
    from 
        t_comments_reaction as a
    where 
        a.comment_source like ?
        and a.source_id like ?
    group by 
        a.comment_id,a.reaction_content
    order by a.reaction_content
`

const queryReactionEveryContentPersonSql = `
    select 
        a.uid,
        a.comment_id,
        a.reaction_content,
        a.reaction_person_id
    from 
        t_comments_reaction as a
    where 
        a.comment_source like ?
        and a.source_id like ?
    order by a.reaction_content
`




module.exports = {
    saveCommentReactionSql,
    deleteCommentReactionByUidSql,
    updateCommentReactionByUidSql,
    queryCommentReactionPageSql,
    queryAllCountCommentReactionSql,
    queryCommentReactionByCommentIdSql,
    queryCommentReactionByUidSql,
    queryCommentReactionAllSql,
    queryReactionEveryContentCountSql,
    queryReactionEveryContentPersonSql,
}
