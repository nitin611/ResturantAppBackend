const express=require('express');
const { signupController, loginController,getUser } = require('../Controllers/user');

const router=express.Router();


// signup-
router.post("/signup",signupController);
// login-
router.post("/signin",loginController);

// protected Routes-

router.get("/getUsers",getUser)

module.exports=router;


