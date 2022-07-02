const queryArticleByBlogTitleSql = `
    select * from t_blog
    where blog_title = ?
`

const queryArticleByUidSql = `
    select * from t_blog
    where uid = ?
`
const queryArticleByUidSql2 = `
    select
        a.*,
        b.blog_tag_id,
        b.tag_name
    from
    (
        select 
            a.blog_author_id,
            a.blog_sort_id,
            a.blog_status,
            a.blog_summary,
            a.origin_address,
            a.blog_title,
            a.clicks,
            a.cover_url,
            a.create_time,
            a.is_open_comment,
            a.is_private,
            a.is_original,
            a.order_num,
            a.recommend_level,
            a.uid,
            a.blog_content,
            a.update_time,
            b.sort_name,
            c.nick_name
        from t_blog as a
        left join t_blog_sort as b
        on a.blog_sort_id = b.uid
        left join t_admin_user as c
        on a.blog_author_id = c.uid
        where a.uid = ?
    ) as a
    left join
        (
            select a.blog_id,a.blog_tag_id,b.tag_name from mt_blog_blog_tag a
            join t_blog_tag b
            on a.blog_tag_id = b.uid
        ) as b
    on a.uid = b.blog_id
    order by a.order_num,a.create_time desc
`

const queryArticleTagIdsByArticleUidSql = `
    select * from mt_blog_blog_tag
    where blog_id = ?
`

const saveArticleSql = `
    insert into t_blog (uid,blog_title, blog_summary,origin_address, blog_author_id, is_original, blog_sort_id,
            recommend_level, order_num,is_open_comment, is_private, blog_status,
            cover_url, blog_content,create_time,update_time)
    values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`

const saveArticleTagSql = `
    insert into mt_blog_blog_tag (blog_id, blog_tag_id,create_time,update_time)
    values (?,?,?,?)
`

const deleteArticleByUidSql = `
    delete from t_blog
    where uid = ?
`

const deleteArticleTagByArticleUidSql = `
    delete from mt_blog_blog_tag
    where blog_id = ?
`
const queryArticleByRecommendLevelSql = `
    select * from t_blog
    where recommend_level = ?
    order by order_num,create_time desc
`

const updateArticleByUidSql = `
    update t_blog set 
    blog_title = ?, blog_summary = ?,origin_address = ?, blog_author_id = ?, 
    is_original = ?, blog_sort_id = ?, recommend_level = ?, 
    order_num = ?,is_open_comment = ?, is_private = ?, blog_status = ?,
    cover_url = ?, blog_content = ?,create_time = ?, update_time = ?
    where uid = ?
`
const updateArticleClicksByUidSql = `
    update t_blog set 
    clicks = clicks + 1
    where uid = ?
`
const queryAllCountArticleSql = `
    select
        a.*,
        b.blog_tag_id,
        b.tag_name
    from
    (
        select 
            a.blog_author_id,
            a.blog_sort_id,
            a.blog_status,
            a.blog_summary,
            a.origin_address,
            a.blog_title,
            a.clicks,
            a.cover_url,
            a.create_time,
            a.is_open_comment,
            a.is_private,
            a.is_original,
            a.order_num,
            a.recommend_level,
            a.uid,
            a.update_time,
            
            b.sort_name,
            c.nick_name
        from t_blog as a
        left join t_blog_sort as b
        on a.blog_sort_id = b.uid
        left join t_admin_user as c
        on a.blog_author_id = c.uid
        where a.blog_title like ?
        and a.blog_author_id like ?
        and a.is_original like ?
        and a.blog_sort_id like ?
        and a.recommend_level like ?
        and a.is_open_comment like ?
        and a.is_private like ?
        and a.blog_status like ?
        and a.create_time like ?
        order by a.order_num,a.create_time desc
    ) as a
    left join
        (
            select a.blog_id,a.blog_tag_id,b.tag_name from mt_blog_blog_tag a
            join t_blog_tag b
            on a.blog_tag_id = b.uid
        ) as b
    on a.uid = b.blog_id  
`

// 带blogTag时使用这个sql，因为是一对多关系，并且得分页，所以主表应该是 mt_blog_blog_tag 表
const queryArticlePageSql2 = `
    select
        a.*,
        b.blog_tag_id,
        b.tag_name,
        c.like_count
    from
    (
        select 
            a.blog_author_id,
            a.blog_sort_id,
            a.blog_status,
            a.blog_summary,
            a.origin_address,
            a.blog_title,
            a.clicks,
            a.cover_url,
            a.create_time,
            a.is_open_comment,
            a.is_private,
            a.is_original,
            a.order_num,
            a.recommend_level,
            a.uid,
            a.update_time,
            a.blog_content,
            
            b.sort_name,
            c.nick_name
        from t_blog as a
        left join t_blog_sort as b
        on a.blog_sort_id = b.uid
        left join t_admin_user as c
        on a.blog_author_id = c.uid
        where a.blog_title like ?
        and a.blog_author_id like ?
        and a.is_original like ?
        and a.blog_sort_id like ?
        and a.recommend_level like ?
        and a.is_open_comment like ?
        and a.is_private like ?
        and a.blog_status like ?
        and a.create_time like ?
    ) as a
    left join
        (
            select a.blog_id,a.blog_tag_id,b.tag_name from mt_blog_blog_tag a
            join t_blog_tag b
            on a.blog_tag_id = b.uid
        ) as b
    on a.uid = b.blog_id
    left join
        (
            select 
                a.blog_id,
                count(a.blog_id) as like_count
            from 
                t_blog_like as a
            group by a.blog_id
        ) as c
    on a.uid = c.blog_id
        where a.uid in (
            select a.* from (
                    select 
                        a.blog_id
                    from 
                        mt_blog_blog_tag as a
                    where blog_tag_id = ?
                    limit ?,?
            ) as a
        )
        order by a.create_time desc
`
const queryArticlePageSql = `
    select
        a.*,
        b.blog_tag_id,
        b.tag_name,
        c.like_count
    from
    (
        select 
            a.blog_author_id,
            a.blog_sort_id,
            a.blog_status,
            a.blog_summary,
            a.origin_address,
            a.blog_title,
            a.clicks,
            a.cover_url,
            a.create_time,
            a.is_open_comment,
            a.is_private,
            a.is_original,
            a.order_num,
            a.recommend_level,
            a.uid,
            a.update_time,
            a.blog_content,
            
            b.sort_name,
            c.nick_name
        from t_blog as a
        left join t_blog_sort as b
        on a.blog_sort_id = b.uid
        left join t_admin_user as c
        on a.blog_author_id = c.uid
        where a.blog_title like ?
        and a.blog_author_id like ?
        and a.is_original like ?
        and a.blog_sort_id like ?
        and a.recommend_level like ?
        and a.is_open_comment like ?
        and a.is_private like ?
        and a.blog_status like ?
        and a.create_time like ?
    ) as a
    left join
        (
            select a.blog_id,a.blog_tag_id,b.tag_name from mt_blog_blog_tag a
            join t_blog_tag b
            on a.blog_tag_id = b.uid
        ) as b
    on a.uid = b.blog_id
    left join
        (
            select 
                a.blog_id,
                count(a.blog_id) as like_count
            from 
                t_blog_like as a
            group by a.blog_id
        ) as c
    on a.uid = c.blog_id  
    order by a.create_time desc
    limit ?,?


`
const queryArticleAll2Sql = `
    select
        a.*,
        b.blog_tag_id,
        b.tag_name
    from
    (
        select 
            a.blog_author_id,
            a.blog_sort_id,
            a.blog_status,
            a.blog_summary,
            a.origin_address,
            a.blog_title,
            a.clicks,
            a.cover_url,
            a.create_time,
            a.is_open_comment,
            a.is_private,
            a.is_original,
            a.order_num,
            a.recommend_level,
            a.uid,
            a.update_time,
            b.sort_name,
            c.nick_name
        from t_blog as a
        left join t_blog_sort as b
        on a.blog_sort_id = b.uid
        left join t_admin_user as c
        on a.blog_author_id = c.uid
        where a.blog_title like ?
        and a.blog_author_id like ?
        and a.is_original like ?
        and a.blog_sort_id like ?
        and a.recommend_level like ?
        and a.is_open_comment like ?
        and a.is_private like ?
        and a.blog_status like ?
    ) as a
    left join
        (
            select a.blog_id,a.blog_tag_id,b.tag_name from mt_blog_blog_tag a
            join t_blog_tag b
            on a.blog_tag_id = b.uid
        ) as b
    on a.uid = b.blog_id
    order by a.order_num,a.create_time desc
`

const queryHotArticlePageSql = `
    select
        a.*
    from 
        t_blog as a
    where 
        a.blog_title like ?
        and a.blog_author_id like ?
        and a.is_original like ?
        and a.blog_sort_id like ?
        and a.recommend_level like ?
        and a.is_open_comment like ?
        and a.is_private like ?
        and a.blog_status like ?
    order by 
        a.clicks desc
    limit ?,?
`

const queryArticleAllSql = `
    select 
        a.uid,
        a.blog_title,
        a.blog_sort_id,
        b.sort_name
    from 
        t_blog as a
    left join
        t_blog_sort as b
    on a.blog_sort_id = b.uid
`
const queryRecommendArticleByRecommendLevelSql = `
    select 
        a.*
    from 
        t_blog as a
    where
        a.recommend_level = ?
    order by 
        a.order_num,a.create_time desc
`
const queryAllArticleCreateTimeListSql = `
    select 
        a.create_time,
        count(a.create_time) as total_num
    from
    (
        select 
        SUBSTRING(create_time,1,10) as create_time
        from 
        t_blog
        where blog_status = 1
    ) as a
    group by 
        a.create_time
    ORDER BY 
        a.create_time desc
`
const queryAllArticleCreateTimeListSql2 = `
    select 
        a.create_time,
        count(a.create_time) as total_num
    from
    (
        select 
        SUBSTRING(create_time,1,10) as create_time
        from 
        t_blog
        where blog_status = 1 and is_private <> 1
    ) as a
    group by 
        a.create_time
    ORDER BY 
        a.create_time desc
`




module.exports = {
    saveArticleSql,
    deleteArticleByUidSql,
    updateArticleByUidSql,
    queryArticlePageSql,
    queryArticlePageSql2,
    queryAllCountArticleSql,
    saveArticleTagSql,
    queryArticleByBlogTitleSql,
    queryArticleByUidSql,
    queryArticleTagIdsByArticleUidSql,
    deleteArticleTagByArticleUidSql,
    queryArticleByRecommendLevelSql,
    queryArticleAllSql,
    queryRecommendArticleByRecommendLevelSql,
    queryHotArticlePageSql,
    queryArticleAll2Sql,
    queryAllArticleCreateTimeListSql,
    queryAllArticleCreateTimeListSql2,
    queryArticleByUidSql2,
    updateArticleClicksByUidSql,
}
