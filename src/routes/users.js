const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/register', async(req, res) => {
    const {display_name, username, password} = req.body;
    const user = await User.findOne({username: username})
    if (user) {
        return res.status(400).json({msg: "This user already exists"})
    } else {
        const newUser = new User({
            name: display_name,
            username: username
        })
        newUser.password = newUser.generateHash(password);
        await newUser.save()
        return res.status(200).json({msg: "User added successfully"})
    }
})

router.post('/login')

module.exports = router;