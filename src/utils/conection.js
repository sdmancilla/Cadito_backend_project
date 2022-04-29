const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Cadito')

const {Schema} = mongoose

module.exports = Schema