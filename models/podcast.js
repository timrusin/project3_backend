const mongoose = require('../db/connection')

const PodcastSchema = new mongoose.Schema({
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

const Podcasts = mongoose.model('Podcasts', PodcastSchema)

module.exports = Podcasts