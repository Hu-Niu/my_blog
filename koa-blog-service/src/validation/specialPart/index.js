const saveSpecialPartValidator = require('./saveSpecialPart')
const deleteSpecialPartByUidValidator = require('./deleteSpecialPartByUid')
const updateSpecialPartByUidValidator = require('./updateSpecialPartByUid')
const querySpecialPartPageValidator = require('./querySpecialPartPage')

module.exports = {
    saveSpecialPartValidator,
    deleteSpecialPartByUidValidator,
    updateSpecialPartByUidValidator,
    querySpecialPartPageValidator,
}
