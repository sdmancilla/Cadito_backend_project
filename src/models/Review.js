const mongoose = require('mongoose')
const Schema = require('../utils/conection')

const ReviewSchema = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    rating: {type: Number, required: true},
    description: {type: String},
    versionKey: false
})

module.exports = mongoose.model("Review", ReviewSchema)