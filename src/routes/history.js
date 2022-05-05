const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/:id', async(req, res) => {
    const {id} = req.params
    const user = await User.findOne({_id: id})
    if (!user) return res.status(404).json({msg: 'User not found'})
    res.status(200).json(user.history)
})

module.exports = router;