const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const { timestampFormat } = require("concurrently/src/defaults");
const { response } = require("express");

const app=express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/collegeconnectdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});()=>{
    console.log("Connected to database");
}

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

const User= new mongoose.model("User",userSchema);

app.post("/Login",(req,res)=>{
    const {email,password}=req.body;      //The req. body object allows you to access data in a string or JSON object from the client side
    User.findOne({email:email},(err,user)=>{ 
        if(user){
            if(password===user.password){
                user.password = null;
                res.send({message:"Login Succesful",Loginuser:user});  //an object with members message of alert and user with user info for going to sepcific user page
            }
            else{
                res.send({message:"Wrong Credentials"});
            }
        }
        else{
              res.send({message:"Sorry! You have not registered"});
        }
    });
})

app.post("/Register",(req,res)=>{
    const {name,email,password}=req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"An account with this email already exists! Use another one"});
        }
        else{
            const user=new User({name,email,password});
            user.save((err)=>{
                if(err){
                    res.send(err);
                }
                else{
                    res.send({message:"successful",newuser:user});
                }
            })
        }
    })
    
});

const questionSchema = new mongoose.Schema(
    {
        question:{
            type: String,
            required: true,
            index:true
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
        // questionbyemail: String,
        // questionbyname: String,
        questionby: {ref:"User",type:mongoose.Schema.Types.ObjectId,},
        answers: [
            {
                answer: String,
                // answerbyemail: String,
                // answerbyname: String,
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

const QuestionsCollection = new mongoose.model("QuestionsCollection",questionSchema);


app.post("/AskQuestion",(req,res)=>{
    const {question,questionDescription,questionTag,questionby}=req.body;
    QuestionsCollection.findOne({$and:[{question:question},{answers:{$ne:[]}}]},(err,foundQuestion)=>{
        if(foundQuestion){
            foundQuestion.forEach(element => {
                res.send({message:"Answer found",retfoundQuestion:element});
            });
            
        }
        else{
            const newQuestion=new QuestionsCollection({question:question,questionDescription:questionDescription,questionTag:questionTag,questionby:questionby});
            newQuestion.save((err)=>{
                if(err){
                    console.log(err);
                    res.send({message:"Couldn't add"});
                }
                else{
                    res.send({message:"Your question has been added succesfully. hope you will be answered soon"});
                }
            })
        }
    })
})

var temp=[];
app.post("/Homepage1",(req,res)=>{
    QuestionsCollection.find({},(err,questiondata)=>{
            res.send({questiondata:questiondata});
            
    }).sort({date:-1}).limit(10).populate('questionby','name');

})

app.post("/SingleQuestion1",(req,res)=>{
    const {q,answer,answerbyname,answerby}=req.body;
    QuestionsCollection.updateOne({question:q},{$push:{answers:{answer:answer,answerbyname:answerbyname,answerby:answerby}}},(err)=>{
        if(err){
            res.send({message:err});
        }else{
            res.send({message:"Your answer has been accounted"});
        }
    })
})

app.post("/SingleQuestion2",(req,res)=>{
    const {qq}=req.body;
    QuestionsCollection.find({question:qq},{answers:1,_id:0},(err,answerdata)=>{
        if(err){
            console.log(err);
        }
        res.send({answerdata:answerdata});
    }).populate({path:'answers.answerby',select:'name'});
})

app.post("/MyQuestions1",(req,res)=>{
    const {_id}=req.body;
    QuestionsCollection.find({questionby:_id},(err,retdata)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({retdata:retdata});
        }
    })
})
app.post("/MyQuestions2",(req,res)=>{
    const {_id,question}=req.body;
    QuestionsCollection.remove({question:question},(err,removedData)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({message:"Your question has been deleted succesfully"});
        }
    });
})

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

const Blogs=new mongoose.model("Blogs",blogSchema);

app.post("/Blog",(req,res)=>{
    const {blogtitle,blogbody,blogby}=req.body;
    const newblog=new Blogs({blogheading:blogtitle,blogbody:blogbody,blogby:blogby});
    newblog.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({message:"our blog has been created successfully",newblog:newblog});
        }
    })
});

app.post("/Homepage2",(req,res)=>{
    Blogs.find({},(err,blogdata)=>{
        if(err){
            console.log(err);
        }else{
            res.send({blogdata:blogdata});
        }
        
    }).populate('blogby','name');
})

app.post("/DisplayBlogLike",(req,res)=>{
    const {bid,comment,uid}=req.body;
    console.log(uid);
    Blogs.findByIdAndUpdate(bid,{$push:{"likes.likedby":uid}},(err)=>{
        if(err){
            console.log(err);
        }
    })
    Blogs.findByIdAndUpdate(bid,{$inc:{"likes.nooflikes":1}},(err,likesdata)=>{
        if(err){
            console.log(err);
        }else{
            res.send({likesdata:likesdata});
        }
    })
})

app.post("/DisplayBlogRemoveLike",(req,res)=>{
    const {bid,comment,uid}=req.body;
    Blogs.findByIdAndUpdate(bid,{$pull:{"likes.likedby":uid}},(err)=>{
        if(err){
            console.log(err);
        }
    })

    Blogs.findByIdAndUpdate(bid,{$inc:{"likes.nooflikes":-1}},(err,likesdata)=>{
        if(err){
            console.log(err);
        }else{
            res.send({likesdata:likesdata});
        }
    })
});

app.post("/DisplayBlogNoofLike",(req,res)=>{
    const {bid}=req.body;
    Blogs.findById(bid,{"likes.nooflikes":1},(err,likesdata)=>{
        if(err){
            console.log(err);
        }else{
            res.send({likesdata:likesdata});
        }
    })
});




app.post("/Homepage3",(req,res)=>{
    const {stext}=req.body;
    QuestionsCollection.find({$text:{$search:stext}},(err,searchdata)=>{
        if(err){
            console.log(err);
        }else{
            res.send({searchdata:searchdata});
        }
    })
})
app.post("/DisplayBlogComment",(req,res)=>{
    const {bid,comment,uid}=req.body;
    Blogs.findByIdAndUpdate(bid,{$push:{comments:{comment:comment,commentby:uid}}},(err,commentdata)=>{
        if(err){
            console.log(err);
        }else{
            console.log(commentdata.comments);
            res.send({commentdata:commentdata.comments});
        }
    })

})

app.post("/MyBlogs",(req,res)=>{
    const {name,email,password,_id}=req.body;
    Blogs.find({blogby:_id},(err,retdata)=>{
        if(err){
            console.log(err);
        }else{
            res.send({retdata:retdata});
        }
    }).populate('blogby','name')
})

app.post("/ReadComment",(req,res)=>{
    const {bid,comment,uid}=req.body;
    Blogs.findById(bid,(err,commentdata)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({commentdata:commentdata.comments});
        }
    }).populate({path:'comments.commentby',select:'name'});
})

app.post("/deleteanswer",(req,res)=>{
    const {qid,answer,answerby}=req.body;
    QuestionsCollection.findByIdAndUpdate(qid,{$pull:{answers:{answer:answer,answerby:answerby}}},(err,qdata)=>{
        if(err){
            console.log(err);
        }else{
            console.log("deleted successfully");
            res.send({message:"Deleted successfully"});
        }
    })
})


app.listen(6969,()=>{
    console.log("Backend server started");
});