const express=require('express')
const jwt=require("jsonwebtoken")
const jwtSecret=process.env.JWT_SECRET

exports.auth=(req,res,next)=>{
    try {
        const token=req.header("Authorization").replace("Bearer ","").trim();
        if(!token){
            return res.status(403).send({
                success:false,
                msg:"Token is missing"
            })
        }
        // verify the token-
        const tokenVerified=jwt.verify(token,JWT_SECRET);
        console.log("Decoded token is:",tokenVerified);
        req.user=tokenVerified;
        next();
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success:false,
            msg:"Server error in verifying the user"
        })
        
    }
}

