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
            msg:"All Users fetched Successfully",
            allUsers
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
        console.log(id);
        // check if user is there with this id or not-

        const user=await userModel.findById(id);
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

exports.updateUser=async(req,res)=>{
    try {
        const id=req.user.id;
        const user=await userModel.findById(id);
        if(!user){
            return res.status(403).send({
                success:false,
                msg:"user not found"
            });
        }
        // update-
        const {name,address,phone}=req.body;
        if(user.name)user.name=name;
        if(user.address)user.address=address;
        if(user.phone)user.phone=phone;
        // save user-
        await user.save();

        return res.status(200).send({
            success:true,
            msg:"User updated successfully",
            user
        })


    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success:false,
            msg:"Server Error in updating the user"
        })
        
    }
}

// update password-------------------------
exports.updatePassword=async(req,res)=>{
    try {
        const id=req.user.id;
        const user=await userModel.findById(id);
        if(!user){
            return res.status(403).json({
                success:false,
                msg:"User does not exist"
            })
        }
        // take old password from user and new password also from input-
        const{oldPassword,newPassword}=req.body;
        if(!oldPassword || !newPassword){
            return res.status(403).send({
                success:false,
                msg:"please provide old and new password"
            })
        }
        // compare old password from database-
        const isMatch=await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(403).send({
                success:false,
                msg:"Password do not match , give correct old password"
            })
        }
        
        // hash the new password-
        const hashedNewPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedNewPassword;
        await user.save();
        res.status(200).send({
            success:true,
            msg:"Password updated Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            msg:"Error in password updation"
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