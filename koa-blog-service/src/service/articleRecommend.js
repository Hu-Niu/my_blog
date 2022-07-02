const articleRecommendDao = require('../dao/articleRecommend')

const updateArticleRecommendByUid = async (articleList) => {
    let promiseArr = []

    for (const article of articleList) {
        const {uid, recommendLevel, order, updateTime} = article
        const params = {uid, recommendLevel, order, updateTime}
        promiseArr.push(articleRecommendDao.updateArticleRecommendByUid(params))
    }

    return await Promise.all(promiseArr)

}


module.exports = {
    updateArticleRecommendByUid,
}
