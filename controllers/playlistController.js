const express = require('express')

const router = express.Router()

const Playlist = require('../models/playlist')  

router.get('/', async (req, res, next) => {
    try {
        const playlists = await Playlist.find({})
        res.json(playlists)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next)=>{
    try{
        const playlist = await Playlist.findById(req.params.id)
        if(playlist){
            res.json(playlist)
        }else {
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next)=>{
    try{
        const newPlaylist = await Playlist.create(req.body)
        res.status(201).json(newPlaylist)
    } catch(err){
        next(err)
    }
 
})

router.put('/:id', async (req, res, next)=>{
    try{
        const playlistToUpdate = await Playlist.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        if (playlistToUpdate) {
            res.json(playlistToUpdate)
        } else{
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next)=>{
    try{
        const playlistToDelete = await Playlist.findByIdAndDelete(
            req.params.id)
            if (playlistToDelete){
                res.sendStatus(204)
            }else{
                res.sendStatus(404)
            }
    }catch(err){
        next(err)
    }
})


module.exports = router