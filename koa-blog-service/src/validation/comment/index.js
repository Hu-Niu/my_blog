const saveCommentValidator = require('./saveComment')
const deleteCommentByUidValidator = require('./deleteCommentByUid')
const updateCommentByUidValidator = require('./updateCommentByUid')
const queryCommentPageValidator = require('./queryCommentPage')

module.exports = {
    saveCommentValidator,
    deleteCommentByUidValidator,
    updateCommentByUidValidator,
    queryCommentPageValidator,
}
