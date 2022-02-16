const express = require('express')
const router = express.Router()
const { requireToken } = require('../middleware/auth')
const { Podcasts } = require('../models/podcast')

router.get('/', requireToken, async (req, res, next) => {
    try {
        const podcasts = await Podcasts.find({})
        res.json(podcasts)
    } catch (err) {
        next(err)
    }
})


router.get('/:id', requireToken, async (req, res, next)=>{
    try{
        const podcast = await Podcasts.findById(req.params.id)
        if(podcast){
            res.json(podcast)
        }else {
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})

router.post('/', requireToken, async (req, res, next)=>{
    try{
        const newPodcast = await Podcasts.create(req.body)
        res.status(201).json(newPodcast)
    } catch(err){
        next(err)
    }
 
})

// // POST /reviews/
// router.post('/', (req, res, next) => {
// 	// get the review data from the body of the request
// 	const podcastData = req.body;
// 	// get the restaurant id from the body
// 	const userId = podcastData.userId;
// 	// find the restaurant by its id
// 	User.findById(userId)
// 		.then((user) => {
// 			// add review to restaurant
// 			user.podcasts.push(podcastData);
// 			// save restaurant
// 			return user.save();
// 		})
// 		// send responsne back to client
// 		.then((user) => res.status(201).json({ user: user }))
// 		.catch(next);
// });

router.put('/:id', requireToken, async (req, res, next)=>{
    try{
        const podcastToUpdate = await Podcasts.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        if (podcastToUpdate) {
            res.json(podcastToUpdate)
        } else{
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})

router.delete('/:id', requireToken, async (req, res, next)=>{
    try{
        const podcastToDelete = await Podcasts.findByIdAndDelete(
            req.params.id)
            if (podcastToDelete){
                res.sendStatus(204)
            }else{
                res.sendStatus(404)
            }
    }catch(err){
        next(err)
    }
})


module.exports = router