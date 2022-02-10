// require that mongoose package! 
const mongoose = require('../db/connection')

// we want a schema with a title and a url 
const PlaylistSchema = new mongoose.Schema({
    title: String, // give it a name and a data type!
    url: String,
    category: [String],
    image_url: String,
    creators: [String],
    description: String

})

const Playlist = mongoose.model('Playlist', PlaylistSchema)

// export it so other files can access it! 

module.exports = Playlist