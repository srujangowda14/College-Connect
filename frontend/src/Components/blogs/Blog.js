import React, {useState} from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blog = () =>{
    const navigate=useNavigate();
    const ls=localStorage.getItem("user");
    const lsobj=JSON.parse(ls);
    const [blogfront,setBlogfront]=useState(
        {
            blogtitle:"",
            blogbody:"",
            blogby:lsobj._id,
        }
    );

    const [alreadyExists,setalreadyExists]=useState(false);

    const updateChangeblog = (event) =>{
        const {name,value}=event.target;
        setBlogfront({
              ...blogfront,
              [name]:value
        });
    }

    const submitBlog = (event) =>{
        event.preventDefault();
            axios.post("http://localhost:6969/Blog",blogfront)
           .then((res)=>{
               if(checkresponse(res)){
                   alert(res.data.message);
                   setalreadyExists(false);
                   navigate("/Homepage");
                   
               }   
           });  
    }

    const checkresponse = (res) =>{
        if(res.data.message==="Title is in use"){
            setalreadyExists(true);
            return false;
        }
        return true;
    }
    return(
        <>
        <Navbar/>
        <div className="blog_main_div">
        <h1>Hey blogger! Convey your views through blogging.</h1>
            <form name="blog_form" onSubmit={submitBlog}>
            <div className="blog_main_div_input_head">
                     <p>What's the blog about?</p>
                     <input type="text" name="blogtitle" value={blogfront.blogtitle} onChange={updateChangeblog} required/>
                     {alreadyExists?<p className="warning_message_style mt-1">*This title already exists. Please use other</p>:null}
                 </div>
                 <div className="blog_main_div_input_blog">
                     <p>Blog:</p>
                     <textarea rows="16" cols="92" name="blogbody" value={blogfront.blogbody} onChange={updateChangeblog} required/>
                   
                 </div>
                 <div className="blog_main_div_button_div">
                       <button className="blog_main_div_button" type="submit">Post</button>
                 </div>
            </form>      
        </div>
        </>
    );
}

export default Blog;