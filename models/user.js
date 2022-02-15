const mongoose = require('../db/connection')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

const Users = mongoose.model('Users', UserSchema)

module.exports = Users