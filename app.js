const express = require("express")

const { connectToMongoDB } = require("./db")
const bookRoute = require('./routes/books')

require("dotenv").config()

const PORT = process.env.PORT

const app = express()

//connecting to MongoDB Instance
connectToMongoDB()

//express.json is a middle to help access anything contained in the req.body object
app.use(express.json())
app.use('/books', bookRoute)

app.get("/", (req, res) => {
    res.send("Welcome Home!")
})

app.listen(PORT, () => {
    console.log(`Server started on port: http://localhost:${PORT}`)
})


