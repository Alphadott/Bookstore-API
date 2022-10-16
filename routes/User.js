const express = require('express');
const User = require('../model/User');
const userRoute = express.Router();
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// CRUD Operations on the Route User Route


// User Sign Up or User Creation

userRoute.post('/signup' ,body('name').isLength({min:5}) , body('email').isEmail(), body('password').length({min:6}), async (req,res) => {

    // This will check if any error is present in the request only 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    try {
        let user = await userModel.findOne({email:req.body.email});
        if (user) {
            return res.status(400).json({msg:"User Already Exists with this email"})
        }
        // Generate Salt and hash the password
        const salt = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(req.body.password,salt)
         // Creating a new user
        user = User({...req.body,password:securePassword})
        await user.save();
        const data = {
            user:{
                id:user.id
            }
        }

        const authToken = jsonWebToken.sign(data , JWT_SECRET);
        res.status(200).json({authToken,msg:"User Created Successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({errorMsg:"Some Unknown Error occured"})
    }
})