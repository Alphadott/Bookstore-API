const mongoose = require('mongoose');
require("dotenv").config()

const MONGO_DB_CONNECTION_URI = process.env.MONGO_DB_CONNECTION_URI

//function to connect to mongodb
function connectToMongoDB(){
    mongoose.connect(MONGO_DB_CONNECTION_URI)
    
    
    //mongodb connected
    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully!")
    })
    //mongodb not connected
    mongoose.connection.on("error", (err) => {
        console.log(err)
        console.log("An error occured while connecting to MongoDB!")
    })
}

module.exports = { connectToMongoDB }
