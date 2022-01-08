const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        name: String,
        email:{
            type: String,
            unique: true
        },
        password: String
    }
);

module.exports= new mongoose.model("User",userSchema);