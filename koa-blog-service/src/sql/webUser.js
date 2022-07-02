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
const queryWebUserByUserTelSql = `
    select * from t_web_user where user_tel = ?
`

const queryWebUserByUidSql = `
    select * from t_web_user where uid = ?
`
/**
 * 模式 $保存接口语句 参数接收占位符$
 *  替换方式：取出所有列名
 *
 * 模式 $保存接口语句 参数接收问号占位符$
 *  替换方式：根据列名的个数，拼接 ?,?,
 */
const saveWebUserSql = `
    insert into t_web_user 
    (
        uid, user_tel, user_profile,user_wechat, user_microblog,
        user_gitee, user_github, user_qq, user_email,
        user_password, nick_name, user_position, user_company,
        user_website, user_intro, gender, user_identity,login_ip_address,
        last_login_time, account_status, data_audit_status, account_source,
        order_num, create_time, update_time
    )
    values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`

const deleteWebUserByUidSql = `
    delete from t_web_user
    where uid = ?
`

/**
 * 模式 $更新接口语句 参数接收问号占位符$
 *  替换方式：根据列名 循环拼接字符串，排除uid，拼接格式为 blog_title = ?, blog_summary = ?, blog_author_id = ?,\n
 */
const updateWebUserByUidSql = `
    update t_web_user 
    set
        user_tel = ?, user_profile = ?, user_wechat = ?, user_microblog = ?, user_gitee = ?,
        user_github = ?, user_qq = ?, user_email = ?, user_password = ?,
        nick_name = ?, user_position = ?, user_company = ?, user_website = ?,
        user_intro = ?, gender = ?, user_identity = ?, login_ip_address = ?, last_login_time = ?,
        account_status = ?, data_audit_status = ?, account_source = ?, order_num = ?,
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
const queryWebUserPageSql = `
    select 
        * 
    from 
        t_web_user
    where 
        user_tel like ?
        and user_profile like ?
        and user_wechat like ?
        and user_microblog like ?
        and user_gitee like ?
        and user_github like ?
        and user_qq like ?
        and user_email like ?
        and user_password like ?
        and nick_name like ?
        and user_position like ?
        and user_company like ?
        and user_website like ?
        and user_intro like ?
        and gender like ?
        and user_identity like ?
        and login_ip_address like ?
        and last_login_time like ?
        and account_status like ?
        and data_audit_status like ?
        and account_source like ?
        and order_num like ?
    order by 
        order_num,create_time desc
    limit ?,?
`

/**
 * 模式 $分页查询接口语句 参数接收问号占位符$
 *  替换方式：从tableData提取出所有列名，
 *          有默认值，且默认值不为null，
 *          排除 uid
 *          例如：        blog_title like ?\n        and blog_author_id like ?
 */
const queryWebUserSql = `
    select 
        * 
    from 
        t_web_user
    where 
        user_tel like ?
        and user_profile like ?
        and user_wechat like ?
        and user_microblog like ?
        and user_gitee like ?
        and user_github like ?
        and user_qq like ?
        and user_email like ?
        and user_password like ?
        and nick_name like ?
        and user_position like ?
        and user_company like ?
        and user_website like ?
        and user_intro like ?
        and gender like ?
        and user_identity like ?
        and login_ip_address like ?
        and last_login_time like ?
        and account_status like ?
        and data_audit_status like ?
        and account_source like ?
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
const queryAllCountWebUserSql = `
    select 
        count(uid) as total 
    from 
        t_web_user
    where 
        user_tel like ?
        and user_wechat like ?
        and user_microblog like ?
        and user_gitee like ?
        and user_github like ?
        and user_qq like ?
        and user_email like ?
        and user_password like ?
        and nick_name like ?
        and user_position like ?
        and user_company like ?
        and user_website like ?
        and user_intro like ?
        and gender like ?
        and user_identity like ?
        and login_ip_address like ?
        and last_login_time like ?
        and account_status like ?
        and data_audit_status like ?
        and account_source like ?
        and order_num like ?
`

const queryWebUserAllSql = `
    select * from t_web_user
    order by order_num,create_time desc
`

module.exports = {
    saveWebUserSql,
    deleteWebUserByUidSql,
    updateWebUserByUidSql,
    queryWebUserPageSql,
    queryAllCountWebUserSql,
    queryWebUserByUserTelSql,
    queryWebUserByUidSql,
    queryWebUserAllSql,
    queryWebUserSql,
}
