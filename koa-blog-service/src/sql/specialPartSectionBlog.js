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
const querySpecialPartSectionBlogByPartSectionIdSql = `
    select * from mt_special_part_section_blogs where part_section_id = ? and blog_id = ?
`

const querySpecialPartSectionBlogByUidSql = `
    select * from mt_special_part_section_blogs where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveSpecialPartSectionBlogSql = `
    insert into mt_special_part_section_blogs 
    (
        uid, part_section_id, blog_id, order_num,
        create_time, update_time
    )
    values (?,?,?,?,?,?)
`

const deleteSpecialPartSectionBlogByUidSql = `
    delete from mt_special_part_section_blogs
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateSpecialPartSectionBlogByUidSql = `
    update mt_special_part_section_blogs 
    set
        part_section_id = ?, blog_id = ?, order_num = ?, create_time = ?,
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
const querySpecialPartSectionBlogPageSql = `
    select
        a.*,
        b.section_title,
        b.part_name,
        b.special_name
    from
        (
            select
                a.*,
                b.blog_title
            from
                mt_special_part_section_blogs as a
            left join
                t_blog as b
            on a.blog_id = b.uid
            where
                a.part_section_id like ?
                and a.blog_id like ?
                and a.order_num like ?
            order by 
                a.order_num,a.create_time desc
            limit ?,?
        ) as a
    left join
        (
            select
                a.*,
                b.part_name,
                c.special_name
            from
                t_special_part_section as a
            left join
                t_special_part as b
            on a.special_part_id = b.uid
            left join
                t_special as c
            on b.special_id = c.uid
        ) as b
    on a.part_section_id = b.uid
`

/**
 * 模式 $查询总条数接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryAllCountSpecialPartSectionBlogSql = `
    select 
        count(uid) as total 
    from 
        mt_special_part_section_blogs
    where 
        part_section_id like ?
        and blog_id like ?
        and order_num like ?
`

const querySpecialPartSectionBlogAllSql = `
    select 
        a.*,
        b.section_title,
        b.part_name,
        b.special_name
    from
        (
            select 
                a.*,
                b.blog_title
            from
                mt_special_part_section_blogs as a
            left join
                t_blog as b
            on a.blog_id = b.uid

        ) as a
    left join
        (
            select
                a.*,
                b.part_name,
                c.special_name
            from
                t_special_part_section as a
            left join
                t_special_part as b
            on a.special_part_id = b.uid
            left join
                t_special as c
            on b.special_id = c.uid
        ) as b
    on a.part_section_id = b.uid
    order by 
        a.order_num,a.create_time desc
`
const querySpecialPartSectionBlogAllSql2 = `
    select 
        a.*,
        b.section_title,
        b.part_name,
        b.special_name
    from
        (
            select 
                a.*,
                b.blog_title
            from
                mt_special_part_section_blogs as a
            join
                t_blog as b
            on a.blog_id = b.uid
            where b.is_private <> 1
        ) as a
    left join
        (
            select
                a.*,
                b.part_name,
                c.special_name
            from
                t_special_part_section as a
            left join
                t_special_part as b
            on a.special_part_id = b.uid
            left join
                t_special as c
            on b.special_id = c.uid
        ) as b
    on a.part_section_id = b.uid
    order by 
        a.order_num,a.create_time desc
`


module.exports = {
    saveSpecialPartSectionBlogSql,
    deleteSpecialPartSectionBlogByUidSql,
    updateSpecialPartSectionBlogByUidSql,
    querySpecialPartSectionBlogPageSql,
    queryAllCountSpecialPartSectionBlogSql,
    querySpecialPartSectionBlogByPartSectionIdSql,
    querySpecialPartSectionBlogByUidSql,
    querySpecialPartSectionBlogAllSql,
    querySpecialPartSectionBlogAllSql2,
}
