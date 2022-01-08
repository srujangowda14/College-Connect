const mongoose=require("mongoose");
const User=require("./user");

const blogSchema=new mongoose.Schema({
    blogheading:{
        type:String,
        required: true,
    },
    blogbody:{
        type:String,
        required:true,
    },
    blogby:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId
    },
    likes:{
        nooflikes:{
           type: Number,
           min:0,
           default: 0
        },
        likedby:[
            {
                ref:"User",
                type:mongoose.Schema.Types.ObjectId
            }
        ]
    },
    comments:[
        {
            comment:{
               type:String,
            },
            commentby:{
               ref:"User",
               type:mongoose.Schema.Types.ObjectId
        }
    }],
    date:{
        type: Date,
        default: Date.now,
    }
});

module.exports=new mongoose.model("Blogs",blogSchema);