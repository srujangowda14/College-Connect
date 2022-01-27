const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        name: {
            type:String,
            lowercase:[true,"Username must consist of only lowercase letters"],
            required:[true,"Username is required"],
            unique:[true,"Username taken! Please use another one"],
        },
        email:{
            type: String,
            unique: true,
            required:[true,"email ID is required"],
        },
        password: {
            type:String,
            required:true,
            minlength: [8,"Password too short. Should be minimum 8 characters in length"],
            maxlength: [15,"Password too long. Password should maximum contain 15 characters"]
        }
    }
);

module.exports= new mongoose.model("User",userSchema);