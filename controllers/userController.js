const express = require('express')
const Users = require('../models/user')

const router = express.Router()


router.get('/', async (req, res, next) => {
    try {
        const users = await Users.find({})
        res.json(users)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next)=>{
    try{
        const user = await Users.findById(req.params.id)
        if(user){
            res.json(user)
        }else {
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next)=>{
    try{
        const newUser = await Users.create(req.body)
        res.status(201).json(newUser)
    } catch(err){
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