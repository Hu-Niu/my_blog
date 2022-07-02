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
const query$VAR_BIG_HUMP$By$VAR_SQL_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP$Sql = `
    select * from $MY_SQL_TABLE_NAME$ where $VAR_SQL_QUERY_INTERFACE_SECOND_PARAM$ = ?
`

const query$VAR_BIG_HUMP$ByUidSql = `
    select * from $MY_SQL_TABLE_NAME$ where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const save$VAR_BIG_HUMP$Sql = `
    insert into $MY_SQL_TABLE_NAME$ 
    (
        $VAR_SQL_SAVE_INTERFACE_RECEIVE_PARAMS$
    )
    values ($VAR_SQL_SAVE_INTERFACE_RECEIVE_PARAMS_QUESTION_MARK$)
`

const delete$VAR_BIG_HUMP$ByUidSql = `
    delete from $MY_SQL_TABLE_NAME$
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const update$VAR_BIG_HUMP$ByUidSql = `
    update $MY_SQL_TABLE_NAME$ 
    set
        $VAR_SQL_UPDATE_INTERFACE_RECEIVE_PARAMS_QUESTION_MARK$
    where uid = ?
`

/**
 * 模式 $分页查询接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const query$VAR_BIG_HUMP$PageSql = `
    select 
        * 
    from 
        $MY_SQL_TABLE_NAME$
    where 
        $VAR_SQL_QUERY_PAGE_INTERFACE_RECEIVE_PARAMS_QUESTION_MARK$
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
const queryAllCount$VAR_BIG_HUMP$Sql = `
    select 
        count(uid) as total 
    from 
        $MY_SQL_TABLE_NAME$
    where 
        $VAR_SQL_QUERY_COUNT_INTERFACE_RECEIVE_PARAMS_QUESTION_MARK$
`

const query$VAR_BIG_HUMP$AllSql = `
    select * from $MY_SQL_TABLE_NAME$
    order by order_num,create_time desc
`

module.exports = {
    save$VAR_BIG_HUMP$Sql,
    delete$VAR_BIG_HUMP$ByUidSql,
    update$VAR_BIG_HUMP$ByUidSql,
    query$VAR_BIG_HUMP$PageSql,
    queryAllCount$VAR_BIG_HUMP$Sql,
    query$VAR_BIG_HUMP$By$VAR_SQL_QUERY_INTERFACE_SECOND_PARAM_BIG_HUMP$Sql,
    query$VAR_BIG_HUMP$ByUidSql,
    query$VAR_BIG_HUMP$AllSql,
}
