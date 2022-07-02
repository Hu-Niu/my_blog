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
const queryContactWayByContactWaySql = `
    select * from t_system_contact_way where contact_way = ?
`

const queryContactWayByUidSql = `
    select * from t_system_contact_way where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveContactWaySql = `
    insert into t_system_contact_way 
    (
        uid, contact_way, way_num, way_icon_name,icon_color,link_address,
        is_show, order_num, create_time, update_time
    )
    values (?,?,?,?,?,?,?,?,?,?)
`

const deleteContactWayByUidSql = `
    delete from t_system_contact_way
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateContactWayByUidSql = `
    update t_system_contact_way 
    set
        contact_way = ?, way_num = ?, way_icon_name = ?, icon_color = ?,link_address = ?, is_show = ?,
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
const queryContactWayPageSql = `
    select 
        * 
    from 
        t_system_contact_way
    where 
        contact_way like ?
        and way_num like ?
        and way_icon_name like ?
        and icon_color like ?
        and link_address like ?
        and is_show like ?
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
const queryAllCountContactWaySql = `
    select 
        count(uid) as total 
    from 
        t_system_contact_way
    where 
        contact_way like ?
        and way_num like ?
        and way_icon_name like ?
        and icon_color like ?
        and link_address like ?
        and is_show like ?
        and order_num like ?
`

const queryContactWayAllSql = `
    select 
        * 
    from 
        t_system_contact_way
    where 
        contact_way like ?
        and way_num like ?
        and way_icon_name like ?
        and icon_color like ?
        and link_address like ?
        and is_show like ?
        and order_num like ?
    order by 
        order_num,create_time desc
`

module.exports = {
    saveContactWaySql,
    deleteContactWayByUidSql,
    updateContactWayByUidSql,
    queryContactWayPageSql,
    queryAllCountContactWaySql,
    queryContactWayByContactWaySql,
    queryContactWayByUidSql,
    queryContactWayAllSql,
}
