const express = require('express')
const router = express.Router()
const User = require('../models/User')
const SessionToken = require('../utils/Tokens');

// Get User
router.get('/', async(req, res) => {
    const {user_id} = req.query
    const user = await User.findOne({_id: user_id})
    if (user) {
        return res.status(200).json(user)
    } else {
        return res.status(400).json({msg: "User not found"})
    }
})

// Login
router.post('/login', async(req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username: username})
    if (user) {
        if (user.validPassword(password)) {
            SessionToken.add(user._id.toString());
            return res.status(200).json({_id: user._id, username: user.username, msg: "Login successful"})
        } else {
            return res.status(400).json({msg: "Wrong password"})
        }
    } else {
        return res.status(400).json({msg: "User not found"})
    }
})

router.post('/prev-login', async(req, res) => {
    const {user_id} = req.body;
    const userToken = SessionToken.find(user_id);
    if (userToken) {
        return res.status(200).json({_id: userToken})
    } else {
        return res.send(undefined)
    }
})

router.post('/register', async(req, res) => {
    const {display_name, username, password} = req.body
    const user = await User.findOne({username: username})
    if (user) {
        return res.status(400).json({msg: "This user already exists"})
    } else {
        const newUser = new User({
            display_name: display_name,
            username: username
        })
        newUser.password = newUser.generateHash(password);
        await newUser.save()
        return res.status(200).json({_id: newUser._id, msg: "User added successfully"})
    }
})

module.exports = router;