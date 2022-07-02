const saveFriendLinkValidator = require('./saveFriendLink')
const deleteFriendLinkByUidValidator = require('./deleteFriendLinkByUid')
const updateFriendLinkByUidValidator = require('./updateFriendLinkByUid')
const queryFriendLinkPageValidator = require('./queryFriendLinkPage')

module.exports = {
    saveFriendLinkValidator,
    deleteFriendLinkByUidValidator,
    updateFriendLinkByUidValidator,
    queryFriendLinkPageValidator,
}
