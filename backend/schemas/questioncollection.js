const mongoose=require("mongoose");
const User=require("../schemas/user");

const questionSchema = new mongoose.Schema(
    {
        question:{
            type: String,
            required: true,
            index:true,
            unique:true
        },
        questionDescription:{
            type: String,
            required: true,
            index:true,
        },
        questionTag:{
            type: String,
            required: true,
            index:true,
        },
        date:{
            type: Date,
            default: Date.now
        },
        questionby: {ref:"User",type:mongoose.Schema.Types.ObjectId,},
        answers: [
            {
                answer: String,
                date:{
                    type:Date,
                    default: Date.now
                },
                answerby: {ref:"User",type:mongoose.Schema.Types.ObjectId,},
            }
        ],
    }
);

questionSchema.index({ question : 'text', questionDescription : 'text',questionTag:'text' });

module.exports=new mongoose.model("QuestionsCollection",questionSchema);