const express=require("express")
const router=express.Router();
const {createCategory,getCategories,updateCategories,deleteCategory}=require("../Controllers/category")


router.post("/createCategory",createCategory);
router.get("/categories",getCategories);
router.put("/updateCategories/:id",updateCategories);
router.delete("/deleteCategory",deleteCategory);

module.exports=router;