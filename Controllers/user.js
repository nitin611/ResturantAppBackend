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
        const ExistingUser=await userModel.findOne({email});
        if(!ExistingUser){
            return res.status(403).send({

                success:false,
                msg:"User is not found"
            })
        }
        
        // hashed password ko decrypt karke password se match karo-
        const passwordMatch = await bcrypt.compare(password, ExistingUser.password);
        if (passwordMatch) {
            return res.status(200).send({
                success: true,
                msg: "User logged in successfully"
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