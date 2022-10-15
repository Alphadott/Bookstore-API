const mongoose = require('mongoose');

const Schema = mongoose.Schema

//Book model schema
const BookModelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        max: [2022, 'Year must be less than or equal to 2022']
    },
    isbn : {
        type: String,
        require: true,
        unique: [true, 'ISBN must be unique']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("books", BookModelSchema)