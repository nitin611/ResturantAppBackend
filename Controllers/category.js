const express=require("express")
const Category=require("../Models/Category")
const { findByIdAndDelete } = require("../Models/user")

exports.createCategory=async(req,res)=>{
    try {
        const {name}=req.body
        if(!name){
            return res.status(403).json({
                success:false,
                msg:"All fields are required"
            })
        }
        // check if this Category is already there or not ,also Case-Sensitive-
        const categoryExisted = await Category.findOne({ name: { $regex: new RegExp("^" + name + "$", "i") } });
        if(categoryExisted){
            return res.status(403).send({
                success:false,
                msg:"Category Already existed"
            })
        }
        // create new category
        const category=await Category.create({name});
        return res.status(200).send({
            success:true,
            msg:"Category created Successfully",
            category
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success:false,
            msg:"Server error in creating a category"
        })
        
    }
}
// get all categories-
exports.getCategories=async(req,res)=>{
    try {
        const categories=await Category.find({});
        return res.status(200).send({
            success:true,
            msg:"All Categories fetched successfully!",
            categories
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success:false,
            msg:"Server error in fetching the categories"
        })
        
    }
}

// updating the categories-
exports.updateCategories=async(req,res)=>{
    try {
        const {id}=req.params;
        const {name:newName}=req.body;
        // check if this cateogry exist or not-
        const categoryExisted=await Category.findById(id);
        if(!categoryExisted){
            return res.status(403).send({
                success:false,
                msg:"Category Did not exist with this id"
            });
        }
        if(!newName){
            return res.status(403).send({
                success:false,
                msg:"New Name is required to update the Category Name"
            })
        }
        const UpdatedCategory=await Category.findByIdAndUpdate(id,{name:newName},{new:true});
        return res.status(200).send({
            success:true,
            msg:"Category updated Successfully",
            UpdatedCategory
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success:false,
            msg:"Server error in updating the category"
        })
        
    }
}

// deleting the category-
exports.deleteCategory=async(req,res)=>{
    try {
        const {id}=req.body;
        const category=await findByIdAndDelete(id);
        return res.status(200).send({
            success:true,
            msg:"Category Deleted Successfully",
            category
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success:false,
            msg:"Server Error in deleting the Category"
        });
        
    }
}