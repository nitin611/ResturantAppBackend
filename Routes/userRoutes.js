const express=require('express');
const { signupController, loginController,getUser,userData,deleteUser,updateUser,updatePassword } = require('../Controllers/user');
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

// update user-
router.put("/updateUser",auth,updateUser)

// update password-
router.put("/updatePassword",auth,updatePassword)

router.delete("/deleteUser",auth,deleteUser)

module.exports=router;


