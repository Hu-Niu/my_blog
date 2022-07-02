const saveArticleTagSql = `
    insert into t_blog_tag (uid,tag_name,order_num,create_time,update_time)
    values (?,?,?,?,?)
`

const deleteArticleTagByUidSql = `
    delete from t_blog_tag
    where uid = ?
`

const updateArticleTagByUidSql = `
    update t_blog_tag set 
    tag_name = ?, order_num = ?, update_time = ?
    where uid = ?
`

const queryArticleTagPageSql = `
    select * from t_blog_tag
    where tag_name like ?
    order by order_num,create_time desc
    limit ?,?
`

const queryHotArticleTagPageSql = `
    select 
        * 
    from 
        t_blog_tag
    where 
        tag_name like ?
        and clicks like ?
        and order_num like ?
    order by 
        clicks desc
    limit ?,?
`


const queryArticleTagByTagNameSql = `
    select * from t_blog_tag
    where tag_name = ?
`
const queryAllCountArticleTagSql = `
    select count(uid) as total from t_blog_tag
`
const queryArticleTagAllSql2 = `
    select
        c.*,
        count(uid) as total_blog_num
    from
    (
        select 
            a.uid,
            a.tag_name,
            a.clicks,
            a.order_num,
            a.create_time,
            a.update_time
        from 
            t_blog_tag as a
        join 
            mt_blog_blog_tag as b
        on 
            a.uid = b.blog_tag_id
    ) as c
    GROUP BY 
        c.uid, c.tag_name, c.clicks, c.order_num, c.create_time, c.update_time
    order by 
        c.order_num,c.create_time desc
`
const queryArticleTagAllSql3 = `
    select
        c.*,
        count(uid) as total_blog_num
    from
    (
        select 
            a.uid,
            a.tag_name,
            a.clicks,
            a.order_num,
            a.create_time,
            a.update_time
        from 
            t_blog_tag as a
        join 
            mt_blog_blog_tag as b
        on 
            a.uid = b.blog_tag_id
        where b.blog_is_private <> 1
    ) as c
    GROUP BY 
        c.uid, c.tag_name, c.clicks, c.order_num, c.create_time, c.update_time
    order by 
        c.order_num,c.create_time desc
`


const queryArticleTagAllSql = `
    select * from t_blog_tag order by order_num,create_time desc
`

module.exports = {
    saveArticleTagSql,
    deleteArticleTagByUidSql,
    updateArticleTagByUidSql,
    queryArticleTagPageSql,
    queryArticleTagByTagNameSql,
    queryAllCountArticleTagSql,
    queryArticleTagAllSql,
    queryArticleTagAllSql2,
    queryArticleTagAllSql3,
    queryHotArticleTagPageSql,
}
