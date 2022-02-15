const mongoose = require('../db/connection')

const PlaylistSchema = new mongoose.Schema({
    name: String,
    description: String,
    explicit: Boolean,
    images: [{
        height: Number,
        url: String,
        width: Number
    }],
    total_episodes: Number,
    publisher: String,
    external_urls: Object
})

const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = Playlist