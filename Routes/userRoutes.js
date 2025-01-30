const express=require('express');
const { signupController, loginController } = require('../Controllers/user');
const router=express.Router();


// signup-
router.post("/signup",signupController)
// login-
router.post("/signin",loginController)

module.exports=router;


