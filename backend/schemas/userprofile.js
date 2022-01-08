const mongoose=require("mongoose");
const User=require("./user");

const userprofileSchema = new mongoose.Schema({
    userid:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId,
    },
    firstname:{
        type:String,
    },
    lastname:"String",
    branch:"String",
    year:"Number",
    bio:"String",
    birthday:"Date",
    skills:"String"
})

module.exports=new mongoose.model("UserProfiles",userprofileSchema);