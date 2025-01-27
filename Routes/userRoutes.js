const express=require('express');
const { signupController } = require('../Controllers/user');
const router=express.Router();


// signup-
router.post("/signup",signupController)






module.exports=router;

