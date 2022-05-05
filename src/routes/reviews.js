const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const User = require('../models/User')
const Review = require('../models/Review')

// Get reviews from a product
router.get('/', async(req, res) => {
    const {product_id, user_id} = req.query
    if (product_id || user_id) {
        if (user_id) {
            const review = await Review.find({user_id});
            res.status(200).json(review);
        } else if (product_id) {
            const review = await Review.find({product_id});
            res.status(200).json(review);
        }
    } else {
        return res.status(400).json({msg: "You must specify a product_id and a user_id"})
    }
})

// Add review to a product
router.post('/', async (req, res) => {
    const {user_id, product_id, rating, description} = req.body
    if (user_id && product_id && rating) {
        const user = await User.findById(user_id)
        const product = await Product.findById(product_id)
        if (user && product) {
            const review = new Review({
                user_id: user_id,
                product_id: product_id,
                rating: rating,
                description: description
            })
            await review.save()
            res.status(200).json({_id: review._id, success: "Review created"})
        } else {
            return res.status(400).json({msg: 'User or product not found'})
        }
    } else {
        return res.status(400).json({msg: 'You must specify all fields'})
    }
})

module.exports = router;