const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const User=require("../schemas/user");
const QuestionsCollection=require("../schemas/questioncollection");
const Blogs=require("../schemas/blog");
const UserProfiles=require("../schemas/userprofile");

const app=express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/collegeconnectdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    autoIndex: true,
});()=>{
    console.log("Connected to database");
}

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
        else if(!email.includes("@gmail.com")){
            res.send({message:"Enter a valid email address"});
        }
        else{
            const user=new User({name,email,password});
            user.save((err)=>{
                if(err){
                    if (err.name == 'ValidationError') {
                            console.error(err.message.split(':')[2]);
                            res.send({message:err.message.split(':')[2]});
                        } else {
                            console.log("hid");
                            console.error(err.message.split(":")[1]);
                            res.send({message:"Username already exists. Use another one"});
                        }
                    }
                else{
                    res.send({message:"successful",newuser:user});
                }
            })
            const userprofile=new UserProfiles({userid:user._id});
            userprofile.save((err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
    })
    
});

app.post("/AskQuestion",(req,res)=>{
    const {question,questionDescription,questionTag,questionby}=req.body;
    QuestionsCollection.findOne({$and:[{question:question},{answers:{$ne:[]}}]},(err,foundQuestion)=>{
        if(foundQuestion){
            console.log(foundQuestion);
            res.send({message:"Question already exists",qdata:foundQuestion});
            
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
app.get("/Homepage1",(req,res)=>{
    const nq=req.query.nq;
    const numnq=Number(nq);
    QuestionsCollection.find({},(err,questiondata)=>{
            res.send({questiondata:questiondata});
            
    }).sort({date:-1}).limit(numnq).populate('questionby','name');

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
    QuestionsCollection.deleteOne({question:question},(err,removedData)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({message:"Your question has been deleted succesfully"});
        }
    });
})



app.post("/Blog",(req,res)=>{
    const {blogtitle,blogbody,blogby}=req.body;
    Blogs.findOne({blogheading:blogtitle},(err,bdata)=>{
        if(err){
            console.log(err);
        }
        else if(bdata){
            console.log(bdata);
            res.send({message:"Title is in use"});
        }
        else{
            const newblog=new Blogs({blogheading:blogtitle,blogbody:blogbody,blogby:blogby});
            newblog.save((err)=>{
            if(err){
               console.log(err);
            }
            else{
                res.send({message:"Your blog has been created successfully",newblog:newblog});
            }
            })
        }
    })
    
});

app.get("/Homepage2",(req,res)=>{
    const nb=req.query.nb;
    const numnb=Number(nb);
    Blogs.find({},(err,blogdata)=>{
        if(err){
            console.log(err);
        }else{
            res.send({blogdata:blogdata});
        }
        
    }).sort({date:-1}).limit(numnb).populate('blogby','name');
})

app.post("/DisplayBlogLike",(req,res)=>{
    const bid=req.query.bid;
    const uid=req.query.uid;
    Blogs.findByIdAndUpdate(bid,{$push:{"likes.likedby":uid}},(err)=>{
        if(err){
            console.log(err);
        }
    })
    Blogs.findByIdAndUpdate(bid,{$inc:{"likes.nooflikes":1}},{new:true},(err,likesdata)=>{
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

    Blogs.findByIdAndUpdate(bid,{$inc:{"likes.nooflikes":-1}},{new:true},(err,likesdata)=>{
        if(err){
            console.log(err);
        }else{
            res.send({likesdata:likesdata});
        }
    })
});

app.post("/DisplayBlogNoofLike",(req,res)=>{
    let likedalready=false;
    const {bid,comment,uid}=req.body;
    // console.log(uid);
    // console.log("newone");
    Blogs.findOne({$and:[{_id:bid},{"likes.likedby":uid}]},(err,isPresent)=>{
        if(isPresent){
            // console.log("hi sru");
            // console.log(isPresent.blogheading);
            likedalready=true;
        }
    })
    Blogs.findById(bid,{"likes.nooflikes":1},(err,likesdata)=>{
        if(err){
            console.log(err);
        }else{
            res.send({likesdata:likesdata,likedalready:likedalready});
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
    console.log(req.body);
    QuestionsCollection.findByIdAndUpdate(qid,{$pull:{answers:{answer:answer,answerby:answerby._id}}},(err,qdata)=>{
        if(err){
            console.log(err);
        }else{
            console.log("deleted successfully");
            console.log(qdata);
            res.send({message:"Deleted successfully"});
        }
    })
})

app.get("/userprofile",(req,res)=>{
    const uid=req.query.uid;
    UserProfiles.findOne({userid:uid},(err,userprofiledata)=>{
        if(err){
            console.log(err);
        }else{
            console.log(userprofiledata);
            res.send({userprofiledata:userprofiledata});
        }
    }).populate('userid','name');
})

app.get("/DeleteMyBlog",(req,res)=>{
    const uid=req.query.uid;
    console.log(uid);
    Blogs.deleteOne({blogby:uid},(err,deletedata)=>{
        if(err){
            console.log(err);
        }else{
            console.log(deletedata);
            res.send({message:"Your blog has been deleted successfully"});
        }
    })
})

app.post("/userprofileupdate",(req,res)=>{
    const {userid,firstName,lastname,branch,year,skills,bio,birthday}=req.body;
    const numyear=Number(year);
    console.log(req.body);
    UserProfiles.updateOne({userid:userid},{$set:{firstName:firstName,lastname:lastname,branch:branch,year:numyear,skills:skills,bio:bio,birthday:birthday}},(err,profiledata)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(profiledata)
            res.send({message:"Change has been made successfully"});

        }
    }).populate('userid','name');
})

app.post("/deleteuser",(req,res)=>{
    const {name,email,password,_id}=req.body;
    console.log(_id);
    UserProfiles.deleteOne({userid:_id},(err)=>{
        console.log("up deleted");
    })
    User.deleteOne({email:email},(err)=>{
        res.send({message:"Your account has been deleted. Sorry to let you go"});
    })
   
})
app.listen(6969,()=>{
    console.log("Backend server started");
});