const express = require('express')
const bookModel = require("../model/book")
const bookRoute = express.Router()

//CRUD routes ===> CREATE, READ, UPDATE, DELETE

//Read all book route
bookRoute.get("/", (req, res) => {
    bookModel.find({})
        .then((books) => {
            res.status(200).send(books)
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
})


//Read by ID route
bookRoute.get("/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    bookModel.findById(id)
        .then((book) => {
            res.status(200).send(book)
        }).catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })
})

//Create Route
bookRoute.post("/", (req, res) => {
    const book = req.body
    console.log(book)
    book.lastUpdateAt = new Date() //set the lastUpdateAt to the current date
    bookModel.create(book)
        .then((book) => {
            res.status(201).send({
                message: "Book added successfully!",
                data: book
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
})

//Update Route
bookRoute.put("/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    const book = req.body


    book.lastUpdateAt = new Date() //set lastUpdateAt to the current date
    bookModel.findByIdAndUpdate(id, book, { new: true })
        .then((book) => {
            console.log(book)
            res.status(200).send(book)
        }).catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })
})

//Delete Route
bookRoute.delete("/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    bookModel.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send({
                message: "Deletion Successful",
                data: ""
            })
        }).catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })
})

module.exports = bookRoute
