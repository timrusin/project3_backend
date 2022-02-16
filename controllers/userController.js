const express = require('express')
const Users = require('../models/user')
const bcrypt = require('bcrypt')
const { createUserToken } = require('../middleware/auth')
const router = express.Router()
const User = require('../models/user')  


router.get('/', async (req, res, next) => {
    try {
        const users = await Users.find({})
        res.json(users)
    } catch (err) {
        next(err)
    }
})

router.get('/:id/favorites', async (req, res, next)=>{
    const userId = req.params.id
    try {
        const favorites = await Users.findById(userId).populate('favorites')
        
        if (favorites) {
            res.json(favorites)
        } else {
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})

// POST /reviews/
router.post('/', (req, res, next) => {
	// get the review data from the body of the request
	const podcastData = req.body;
	// get the restaurant id from the body
	const userId = podcastData.userId;
	// find the restaurant by its id
	User.findById(userId)
		.then((user) => {
			// add review to restaurant
			user.podcasts.push(podcastData);
			// save restaurant
			return user.save();
		})
		// send responsne back to client
		.then((user) => res.status(201).json({ user: user }))
		.catch(next);
});


// Using async/await
// Add the async keyword
router.post('/signup', async (req, res, next) => {
    // wrap it in a try/catch to handle errors
    try {
      const { email } = req.body
      // store the results of any asynchronous calls in variables
      // and use the await keyword before them
      const password = await bcrypt.hash(req.body.password, 10)
      const user = await Users.create({ email, password })
      res.status(201).json(user)
    } catch (error) {
      // return the next callback and pass it the error from catch
      return next(error)
    }
  });

// SIGN IN
// POST /api/signin
router.post('/signin', (req, res, next) => {
    Users.findOne({ email: req.body.email })
      // Pass the user and the request to createUserToken
      .then((user) => createUserToken(req, user))
      // createUserToken will either throw an error that
      // will be caught by our error handler or send back
      // a token that we'll in turn send to the client.
      .then((token) => res.json({ token }))
      .catch(next);
  });
 
  router.post('/signin', async (req, res, next) => {
    try {
        const foundUser = await Users.findOne({ email: req.body.email })
        const token = await createUserToken(req, foundUser)
        // Check work
        console.log(foundUser)
        console.log(token)
        res.json({
            user: foundUser,
            generatedToken: token
        })
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next)=>{
    try{
        const userToUpdate = await Users.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        if (userToUpdate) {
            res.json(userToUpdate)
        } else{
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next)=>{
    try{
        const userToDelete = await Users.findByIdAndDelete(
            req.params.id)
            if (userToDelete){
                res.sendStatus(204)
            }else{
                res.sendStatus(404)
            }
    }catch(err){
        next(err)
    }
})


module.exports = router