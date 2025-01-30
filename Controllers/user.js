const express=require('express')
const userModel=require("../Models/user");
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const jwtSecret=process.env.JWT_SECRET
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
exports.loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(403).send({
                success:false,
                msg:"All fields are required"
            })
        }
        // check user Exist or not-
        const User=await userModel.findOne({email});
        if(!User){
            return res.status(403).send({

                success:false,
                msg:"User is not found"
            })
        }

        // hashed password ko decrypt karke password se match karo-
        const passwordMatch = await bcrypt.compare(password, User.password);
        if (passwordMatch) {
            const payload={
                id:User._id,
                Role:User.Role
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:"2h"});
             User.password=undefined;
            return res.status(200).send({
                success: true,
                msg: "User logged in successfully",
                data:User,
                token

            });
        } else {
            return res.status(403).send({
                success: false,
                msg: "Password does not match"
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            msg:"User not Registered"
        })
    }
}




// get user controller-
exports.getUser=async(req,res)=>{
    try {
        const allUsers=await userModel.find({});
        return res.status(200).send({
            success:true,
            msg:"All Users fetched Successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success:false,
            msg:"Server error in fetching all the users"
        })
        
    }
}

exports.userData=async(req,res)=>{
    try {
        // req.user is attached in auth middleware-
        const id=req.user.id
        // check if user is there with this id or not-

        const user=await User.findById(id);
        if(!user){
            return res.status(403).send({
                success:false,
                msg:"User does not exist"
            })
        }
        user.password=undefined;
        return res.status(200).send({
            success:true,
            msg:"User fetched successfully!!",
            user
        })
    } catch (err) {
        return res.status(500).send({
            success:false,
            msg:'Server error in fetching the user'
        })
    }
}

exports.deleteUser=async(req,res)=>{
    try {
       
    } catch (err) {
        console.log(err)
        return
        
    }
}