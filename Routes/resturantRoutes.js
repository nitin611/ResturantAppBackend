const express=require('express');
const {auth}=require("../middleware/authMiddleware")

const router=express.Router();


// create Resturant-
router.post("/createResturant",auth,)

// get resturant Details-

// update Resturant details-

// delete Resturant details-

module.exports=router;


