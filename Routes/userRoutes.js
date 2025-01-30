const express=require('express');
const { signupController, loginController } = require('../Controllers/user');

const router=express.Router();


// signup-
router.post("/signup",signupController);
// login-
router.post("/signin",loginController);

// protected Routes-

router.get("/getUsers",getUser)

module.exports=router;


