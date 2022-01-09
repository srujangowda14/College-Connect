const mongoose=require("mongoose");

const userprofileSchema = new mongoose.Schema({
    userid:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId,
    },
    firstname:{
        type:String,
        defualt:"",
    },
    lastname:{
        type:String,
        default:"",
    },
    branch:{
        type:String,
        default:"",
    },
    year:{
        type:Number,
        default:1,
    },
    bio:{
        type:String,
        default:"",
    },
    birthday:Date,
    skills:{
        type: String,
        default:""
    }
})

module.exports=new mongoose.model("UserProfiles",userprofileSchema);