const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.get('/:product_id', async (req, res) => {
    const {product_id} = req.params;
    const product = await Product.findById(product_id);
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).json({msg: 'Product not found'})
    }
});

module.exports = router;