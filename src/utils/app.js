const express = require("express")
const cors = require("cors")

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// ROUTES
const user = require('../routes/users')
app.use('/users', user)

app.get('*', (req, res) => {
    res.status(404).json({error: "Not Found"})
});

// LISTENING
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})