const mongoose = require('../db/connection')
const { PodcastSchema } = require('./podcast')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    favorites: [PodcastSchema]
    
    //NOT 100% SURE THIS IS CORRECT
    //PLEASE REFER TO API-LABS FOR CLARITY
})

const Users = mongoose.model('Users', UserSchema)

module.exports = Users