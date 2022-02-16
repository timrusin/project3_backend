// require that mongoose package! 
const mongoose = require('../db/connection')

// we want a schema with a title and a url 
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
    external_urls: Object,

})

const Podcasts = mongoose.model('Podcasts', PodcastSchema)

// export it so other files can access it! 

module.exports = { PodcastSchema, Podcasts }
