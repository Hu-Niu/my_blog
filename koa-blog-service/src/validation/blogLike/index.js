const saveBlogLikeValidator = require('./saveBlogLike')
const deleteBlogLikeByUidValidator = require('./deleteBlogLikeByUid')
const updateBlogLikeByUidValidator = require('./updateBlogLikeByUid')
const queryBlogLikePageValidator = require('./queryBlogLikePage')

module.exports = {
    saveBlogLikeValidator,
    deleteBlogLikeByUidValidator,
    updateBlogLikeByUidValidator,
    queryBlogLikePageValidator,
}
