const mongoose=require("mongoose")

const connectDB=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{console.log("Db connected Successfully")});
    }
     catch (err) {
        console.log(err);
        console.log("Error in db connection");
    }
    
}
module.exports=connectDB;