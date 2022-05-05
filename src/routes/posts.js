const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const User = require('../models/User')

// Get all or one user products
router.get('/', async(req, res) => {
    const {user_id, post_id} = req.query
    if (post_id) {
        const post = await Product.findById(post_id)
        res.json(post)
    } else if (user_id) {
        const posts = await Product.find({owner_id: user_id})
        res.json(posts)
    } else {
        res.send([])
    }
})

// Create post
router.post('/', async(req, res) => {
    const {display_name, description, price, img_url, owner_id} = req.body
    if (display_name && description && price && owner_id) {
        const user = await User.findOne({_id: owner_id})
        if (user) {
            const product = new Product({
                display_name: display_name,
                description: description,
                price: price,
                img_url: img_url,
                owner_id: owner_id
            })
            await product.save()
            return res.status(200).json({_id: product._id, owner_id:product.owner_id, msg: "Product added successfully"})
        } else {
            return res.status(400).json({msg: "The user doesn't exist"})  
        }  
    } else {
        return res.status(400).json({msg: "You must specify all fields"})
    }
})

// Get recent posts
router.get('/recent', async(req, res) => {
    const posts = await Product.find().limit(10)
    res.json(posts)
}) 

module.exports = router;