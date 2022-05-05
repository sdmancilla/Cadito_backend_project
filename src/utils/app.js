const express = require("express")
const cors = require("cors")

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// ROUTES
const user = require('../routes/users')
app.use('/users', user)

const posts = require('../routes/posts')
app.use('/posts', posts)

const cart = require('../routes/cart')
app.use('/cart', cart)

const history = require('../routes/history')
app.use('/history', history)

const reviews = require('../routes/reviews')
app.use('/reviews', reviews)

const products = require('../routes/products')
app.use('/product', products);


app.get('*', (req, res) => {
    res.status(404).json({error: "Not Found"})
});

// LISTENING
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})