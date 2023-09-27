const users = require('../../db/models/users')

exports.repeatData = async (username, email) => {
    const find = await users.find({  "$or" : [ {username: username}, {email: email} ]}).exec()
    
    if (find.length) {
        return false
    } else {
        return true
    }
}