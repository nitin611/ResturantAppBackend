const express = require("express");
const {auth}=require("../middleware/authMiddleware")
const {
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require("../Controllers/Resturant");

const router = express.Router();

// ✅ Create Restaurant (Protected)
router.post("/createRestaurant", auth, createRestaurant);

// ✅ Get Restaurant Details by ID
router.get("/get/:id", getRestaurant);

// ✅ Update Restaurant Details (Protected)
router.put("/update/:id", auth, updateRestaurant);

// ✅ Delete Restaurant (Protected)
router.delete("/delete/:id", auth, deleteRestaurant);

module.exports = router;
