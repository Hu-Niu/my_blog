const saveWebUserValidator = require('./saveWebUser')
const deleteWebUserByUidValidator = require('./deleteWebUserByUid')
const updateWebUserByUidValidator = require('./updateWebUserByUid')
const queryWebUserPageValidator = require('./queryWebUserPage')

module.exports = {
    saveWebUserValidator,
    deleteWebUserByUidValidator,
    updateWebUserByUidValidator,
    queryWebUserPageValidator,
}
