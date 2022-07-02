const saveArticleValidator = require('./saveArticle')
const deleteArticleByUidValidator = require('./deleteArticleByUid')
const updateArticleByUidValidator = require('./updateArticleByUid')
const queryArticlePageValidator = require('./queryArticlePage')
const exportArticleValidator = require('./exportArticle')
const queryArticleByRecommendLevelValidator = require('./queryArticleByRecommendLevel')

module.exports = {
    saveArticleValidator,
    deleteArticleByUidValidator,
    updateArticleByUidValidator,
    queryArticlePageValidator,
    exportArticleValidator,
    queryArticleByRecommendLevelValidator,
}
