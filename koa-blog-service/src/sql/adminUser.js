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
const queryAdminUserByUserNameSql = `
    select * from t_admin_user where user_name = ?
`

const queryAdminUserByUidSql = `
    select 
        a.*,
        b.role_name
    from
    (
        select 
            aa.uid,
            aa.user_profile,
            aa.nick_name,
            aa.user_intro,
            aa.user_profession,
            aa.user_email,
            aa.role_id,
            aa.gender,
            aa.create_time,
            bb.intro_detail
        from 
            t_admin_user as aa
        left join
            t_system_about_me as bb
        on aa.uid = bb.admin_user_id
        where 
            aa.uid = ?
    ) as a
    left join
        (
            select 
                uid,
                role_name 
            from 
                t_admin_role
        ) as b
    on a.role_id = b.uid
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveAdminUserSql = `
    insert into t_admin_user 
    (
        uid, user_name, user_password, user_profile,
        nick_name, user_intro,user_profession,user_email,role_id, gender, login_ip_address,
        last_login_time, order_num, create_time, update_time
    )
    values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`

const deleteAdminUserByUidSql = `
    delete from t_admin_user
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateAdminUserByUidSql = `
    update t_admin_user 
    set
        user_name = ?, user_profile = ?, nick_name = ?,user_intro = ?,user_profession = ?, user_email = ?,
        role_id = ?, gender = ?, login_ip_address = ?, last_login_time = ?,
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
const queryAdminUserPageSql = `
    select 
        a.*,
        b.role_name
    from
    (
        select 
            create_time,
            gender,
            last_login_time,
            login_ip_address,
            nick_name,
            user_email,
            order_num,
            role_id,
            uid,
            update_time,
            user_name,
            user_intro,
            user_profession,
            user_profile
        from 
            t_admin_user
        where 
            user_name like ?
            and user_password like ?
            and nick_name like ?
            and user_email like ?
            and role_id like ?
            and gender like ?
            and login_ip_address like ?
            and last_login_time like ?
            and order_num like ?
        limit ?,?
    ) as a
    left join
        (
            select 
                uid,
                role_name 
            from 
                t_admin_role
        ) as b
    on a.role_id = b.uid
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
const queryAllCountAdminUserSql = `
    select 
        count(uid) as total 
    from 
        t_admin_user
    where 
        user_name like ?
        and user_password like ?
        and nick_name like ?
        and user_email like ?
        and role_id like ?
        and gender like ?
        and login_ip_address like ?
        and last_login_time like ?
        and order_num like ?
`

const queryAdminUserAllSql = `
    select * from t_admin_user
    order by order_num,create_time desc
`

const queryUserByUsernameSql = `
    select * from t_admin_user
    where user_name = ?
`

const adminResetPasswordByUidSql = `
    update t_admin_user set user_password = ?
    where uid = ?
`

module.exports = {
    saveAdminUserSql,
    deleteAdminUserByUidSql,
    updateAdminUserByUidSql,
    queryAdminUserPageSql,
    queryAllCountAdminUserSql,
    queryAdminUserByUserNameSql,
    queryAdminUserByUidSql,
    queryAdminUserAllSql,
    queryUserByUsernameSql,
    adminResetPasswordByUidSql,
}
