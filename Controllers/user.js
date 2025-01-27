const express=require('express')
const userModel=require("../Models/user");
const bcrypt = require('bcrypt');
exports.signupController=async(req,res)=>{
    try {
        const {name,email,password,address,phone,Role,profile}=req.body;
        console.log(req.body);
        // validation-
        if(!name || !email || !password || !address || !phone  || !profile){
            return res.status(403).send({
                success:false,
                msg:"All fields are required"
            })
        }
            // check if this user is already existed or not-
            const userExisted=await userModel.findOne({email});
            if(userExisted){
                return res.status(403).send({
                    success:false,
                    msg:"User already exist kindly SingIn"
                })
            }
            // hash the password-
            const hashedPassword=await bcrypt.hash(password,10);
            // create a new user-
            const User=await userModel.create({name,email,password: hashedPassword,address,phone,Role,profile});
            res.status(201).send({
                success:true,
                msg:"User Registered Successfully",
                User
            })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            msg:"Error in signup"
        })
    }
}

// signIn Controller-
