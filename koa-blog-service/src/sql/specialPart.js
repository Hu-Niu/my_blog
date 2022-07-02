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
const querySpecialPartByPartNameSql = `
    select * from t_special_part where part_name = ? and special_id = ?
`

const querySpecialPartByUidSql = `
    select * from t_special_part where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveSpecialPartSql = `
    insert into t_special_part 
    (
        uid, part_name, part_title, part_summary,
        special_id, order_num, create_time, update_time
    )
    values (?,?,?,?,?,?,?,?)
`

const deleteSpecialPartByUidSql = `
    delete from t_special_part
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateSpecialPartByUidSql = `
    update t_special_part 
    set
        part_name = ?, part_title = ?, part_summary = ?, special_id = ?,
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
const querySpecialPartPageSql = `
    select 
        a.*,
        b.special_name
    from
    (
        select 
            * 
        from 
            t_special_part
        where 
            part_name like ?
            and part_title like ?
            and part_summary like ?
            and special_id like ?
            and order_num like ?
        order by 
            order_num,create_time desc
        limit ?,?
    ) as a
    left join
        (
            select 
                uid,
                special_name 
            from 
                t_special
        ) as b
    on a.special_id = b.uid
`

/**
 * 模式 $查询总条数接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryAllCountSpecialPartSql = `
    select 
        count(uid) as total 
    from 
        t_special_part
    where 
        part_name like ?
        and part_title like ?
        and part_summary like ?
        and special_id like ?
        and order_num like ?
`

const querySpecialPartAllSql = `
    select 
        a.*,
        b.special_name
    from
    (
        select 
            * 
        from 
            t_special_part
    ) as a
    left join
        (
            select 
                uid,
                special_name 
            from 
                t_special
        ) as b
    on a.special_id = b.uid
    order by 
        order_num,create_time desc
`

module.exports = {
    saveSpecialPartSql,
    deleteSpecialPartByUidSql,
    updateSpecialPartByUidSql,
    querySpecialPartPageSql,
    queryAllCountSpecialPartSql,
    querySpecialPartByPartNameSql,
    querySpecialPartByUidSql,
    querySpecialPartAllSql,
}
