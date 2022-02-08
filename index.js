//=============================================================================
// Basic Config
//=============================================================================
const express = require('express')
// instantiate express
const app = express()
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
app.use('/users/', userController)

/* END CONTROLLERS HERE */
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500
  const message = err.message || 'internal server error'
  res.status(statusCode).send(message)
})
//=============================================================================
// START SERVER
//=============================================================================

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
