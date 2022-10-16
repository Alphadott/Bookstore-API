const mongoose = require('mongoose');
const {Schema} = mongoose;

// Creating the user Schema

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    books:[{type:Schema.Types.ObjectId,ref:'books'}],
    createdAt:{
        type:date,
        default:date.now
    }
})

const User = mongoose.model('user',UserSchema)

module.exports = User;