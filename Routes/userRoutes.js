const express=require('express');
const { signupController, loginController,getUser } = require('../Controllers/user');
const {auth}=require("../middleware/authMiddleware")
const router=express.Router();


// signup-
router.post("/signup",signupController);
// login-
router.post("/signin",loginController);


// get all users-
router.get("/getUsers",getUser)

//--------------------------------- protected Routes------------------------------------------
router.get("/userData",auth,userData);

router.delete("/deleteUser",auth,deleteUser)

module.exports=router;


