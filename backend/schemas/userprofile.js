const mongoose=require("mongoose");

const userprofileSchema = new mongoose.Schema({
    userid:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId,
    },
    lastname:{
        type:String,
        default:"",
    },
    firstName:{
        type:String,
        default:"",
    },
    branch:{
        type:String,
        default:"",
    },
    year:{
        type:Number,
    },
    bio:{
        type:String,
        default:"",
    },
    birthday:{
        type:Date,
        default:null,
    },
    skills:{
        type: String,
        default:""
    }
})

module.exports=new mongoose.model("UserProfiles",userprofileSchema);