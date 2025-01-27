const mongoose=require("mongoose");
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        },
        address:{
            type:String,
        },
        phone:{
            type:String,
            required:true
        },
        Role:{
            type:String,
            enum:["Seller","Client","admin"],
            default:"Client"
        },
        profile:{
            type:String,
            default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIn-gE6j6sjvg0ekFgFBIzVP5VdN3aBu9dLg&s'
        }

},{timestamps:true});
module.exports=mongoose.model("User",userSchema)