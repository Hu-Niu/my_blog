const queryArticleSortBySortNameSql = `
    select * from t_blog_sort
    where sort_name = ?
`
const saveArticleSortSql = `
    insert into t_blog_sort (uid,sort_name,intro,order_num,create_time,update_time)
    values (?,?,?,?,?,?)
`

const deleteArticleSortByUidSql = `
    delete from t_blog_sort
    where uid = ?
`

const updateArticleSortByUidSql = `
    update t_blog_sort set 
    sort_name = ?, intro = ?, order_num = ?,update_time = ?
    where uid = ?
`

const queryArticleSortPageSql = `
    select * from t_blog_sort
    where sort_name like ?
    order by order_num,create_time desc
    limit ?,?
`

const queryAllCountArticleSortSql = `
    select count(uid) as total from t_blog_sort
`
const queryArticleSortAllSql = `
    select * from t_blog_sort
    order by create_time desc
`
const queryArticleSortAllSql2 = `
    select 
        c.*,
        count(uid) as total_blog_num
    from 
    (
        select 
            a.*
        from 
            t_blog_sort as a
        join 
            t_blog as b
        on 
            a.uid = b.blog_sort_id
    ) as c
    GROUP BY 
        c.uid,c.sort_name,c.intro,c.clicks,c.order_num,c.create_time,c.update_time
    order by 
        c.order_num,c.create_time desc
`
const queryArticleSortAllSql3 = `
    select 
        c.*,
        count(uid) as total_blog_num
    from 
    (
        select 
            a.*
        from 
            t_blog_sort as a
        join 
            t_blog as b
        on 
            a.uid = b.blog_sort_id
        where b.is_private <> 1
    ) as c
    GROUP BY 
        c.uid,c.sort_name,c.intro,c.clicks,c.order_num,c.create_time,c.update_time
    order by 
        c.order_num,c.create_time desc
`




module.exports = {
    queryArticleSortBySortNameSql,
    saveArticleSortSql,
    deleteArticleSortByUidSql,
    updateArticleSortByUidSql,
    queryArticleSortPageSql,
    queryAllCountArticleSortSql,
    queryArticleSortAllSql,
    queryArticleSortAllSql2,
    queryArticleSortAllSql3,
}
