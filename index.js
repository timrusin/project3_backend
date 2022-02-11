//=============================================================================
// Basic Config
//=============================================================================
const express = require('express')
// instantiate express
const app = express()
require('dotenv').config()

app.set('port', process.env.PORT || 8000)
const cors = require('cors')
app.use(cors())

//=============================================================================
// Middleware
//=============================================================================

// `express.json` parses application/json request data and
//  adds it to the request object as request.body
app.use(express.json())

// `express.urlencoded` parses x-ww-form-urlencoded request data and
//  adds it to the request object as request.body
app.use(express.urlencoded({ extended: true }))
// in middleware

const requestLogger = require('./middleware/request_logger');
app.use(requestLogger);
//=============================================================================
// ROUTES
//=============================================================================
// Redirect

app.get('/', (req, res) => {
  res.redirect('/podcasts')
})


/* START CONTROLLERS HERE */

const podcastController = require('./controllers/podcastController')
app.use('/podcasts/', podcastController)

const userController = require('./controllers/userController')
app.use('/api/', userController)

const playlistController = require('./controllers/playlistController')
app.use('/playlists/', playlistController)

/* END CONTROLLERS HERE */
const { handleErrors } = require('./middleware/custom_errors');
app.use(handleErrors);
//=============================================================================
// START SERVER
//=============================================================================

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
