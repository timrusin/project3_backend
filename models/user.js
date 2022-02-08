// require that mongoose package! 
const mongoose = require('../db/connection')

// we want a schema with a title and a url 
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    // podcast: [{PodcastSchema}] //NOT 100% SURE THIS IS CORRECT
    //PLEASE REFER TO API-LABS FOR CLARITY
})

const Users = mongoose.model('Users', UserSchema)

// export it so other files can access it! 

module.exports = Users