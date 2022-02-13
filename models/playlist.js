// require that mongoose package! 
const mongoose = require('../db/connection')

const PlaylistSchema = new mongoose.Schema({
    available_markets: Array,
    copyrights: Array,
    description: String,
    explicit: Boolean,
    external_url: {
        spotify: String
    },
    href: String,
    html_description: String,
    id: String,
    images: [{
        height: Number,
        url: String,
        width: Number
    }],
    is_externally_hosted: Boolean,
    languages: Array,
    media_type: String,
    name: String,
    publisher: String,
    total_episodes: Number,
    type: String,
    uri: String
})

const Playlist = mongoose.model('Playlist', PlaylistSchema)
module.exports = Playlist