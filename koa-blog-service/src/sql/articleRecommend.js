const updateArticleRecommendByUidSql = `
    update t_blog 
    set
        recommend_level = ?, order_num = ?,update_time = ?
    where uid = ?
`

module.exports = {
    updateArticleRecommendByUidSql,
}
