const mongoose = require("mongoose")
const Schema = require("../utils/conection")

const ProductSchema = new Schema({
    display_name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    img_url: {type: String},
    owner_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    created_at: {type: Date, default: Date.now},
    versionKey: false
})

module.exports = mongoose.model("Product", ProductSchema)