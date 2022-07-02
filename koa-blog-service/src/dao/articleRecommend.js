const {

    updateArticleRecommendByUidSql,
} = require('../sql/articleRecommend')
const query = require('../utils/db')


const updateArticleRecommendByUid = async (params) => {
    let {
        uid, recommendLevel, order, updateTime
    } = params

    return await query(
        updateArticleRecommendByUidSql,
        [
            recommendLevel, order, updateTime, uid
        ]
    )
}


module.exports = {
    updateArticleRecommendByUid,
}
