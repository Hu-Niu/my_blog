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
const querySpecialPartSectionBySectionTitleSql = `
    select * from t_special_part_section where section_title = ? and special_part_id = ?
`

const querySpecialPartSectionByUidSql = `
    select * from t_special_part_section where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveSpecialPartSectionSql = `
    insert into t_special_part_section 
    (
        uid, section_title, special_part_id, order_num,
        create_time, update_time
    )
    values (?,?,?,?,?,?)
`

const deleteSpecialPartSectionByUidSql = `
    delete from t_special_part_section
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateSpecialPartSectionByUidSql = `
    update t_special_part_section 
    set
        section_title = ?, special_part_id = ?, order_num = ?, create_time = ?,
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
const querySpecialPartSectionPageSql = `
    select 
        a.*,
        b.part_name,
        b.special_id,
        b.special_name
    from
    (
        select 
            * 
        from 
            t_special_part_section
        where 
            section_title like ?
            and special_part_id like ?
            and order_num like ?
        order by 
            order_num,create_time desc
        limit ?,?
    ) as a
    left join
        (
            select 
                c.uid,
                c.part_name,
                c.special_id,
                d.special_name
            from 
                t_special_part as c
            left join
                t_special as d
            on c.special_id = d.uid
        ) as b
    on a.special_part_id = b.uid    
`

/**
 * 模式 $查询总条数接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryAllCountSpecialPartSectionSql = `
    select 
        count(uid) as total 
    from 
        t_special_part_section
    where 
        section_title like ?
        and special_part_id like ?
        and order_num like ?
`

const querySpecialPartSectionAllSql = `
    select 
        a.*,
        b.part_name,
        b.special_id,
        b.special_name
    from
    (
        select 
            * 
        from 
            t_special_part_section
        
    ) as a
    left join
        (
            select 
                c.uid,
                c.part_name,
                c.special_id,
                d.special_name
            from 
                t_special_part as c
            left join
                t_special as d
            on c.special_id = d.uid
        ) as b
    on a.special_part_id = b.uid
    order by 
            order_num,create_time desc
`

module.exports = {
    saveSpecialPartSectionSql,
    deleteSpecialPartSectionByUidSql,
    updateSpecialPartSectionByUidSql,
    querySpecialPartSectionPageSql,
    queryAllCountSpecialPartSectionSql,
    querySpecialPartSectionBySectionTitleSql,
    querySpecialPartSectionByUidSql,
    querySpecialPartSectionAllSql,
}
