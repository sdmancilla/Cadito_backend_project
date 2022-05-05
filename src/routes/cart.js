const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const User = require('../models/User')
const uuid = require('crypto').randomUUID;

// Add to cart
router.post('/', async(req, res) => {
    const {product_id, user_id} = req.body
    const user = await User.findById(user_id)
    const product = await Product.findById(product_id)
    if (!user) return res.status(404).json({msg: 'User not found'})
    if (!product) return res.status(404).json({msg: 'Product not found'})
    if (!user.cart.find(item => item.product_id == product_id)) {
        user.cart.push({
            _id: uuid(),
            product_id: product_id,
        })
        await user.save()
        res.status(200).json({msg: 'Product added to cart'})
    } else {
        res.status(200).json({msg: 'Product already in cart'})
    }
})

// Get cart from user
router.get('/', async(req, res) => {
    const {user_id} = req.query
    const user = await User.findById(user_id)
    if (user) {
        res.status(200).json(user.cart)
    } else {
        return res.status(400).json({msg: 'User not found'})
    }
})

// Remove product from cart
router.delete('/', async(req, res) => {
    const {item_id} = req.query
    const users = await User.find()
    let product_found = false
    users.forEach(user => {
        const product = user.cart.find(item => item._id == item_id)
        if (product) {
            user.cart.remove(product)
            user.save()
            product_found = true
            res.json({msg: 'Product removed from cart'})
        }
    })
    if (!product_found) res.status(400).json({msg: "Product doesn't exist in cart"})
})

// Buy products from cart
router.post('/buy', async (req, res) => {
    const {user_id} = req.body;
    const user = await User.findById(user_id);
    if (user) {
        user.history.push(...user.cart);
        user.cart = []
        await user.save()
        res.status(200).json({msg: 'Cart bought'})
    } else {
        return res.status(404).json({msg: 'User not found'});
    }
})

module.exports = router;