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

    const updateChangeblog = (event) =>{
        const {name,value}=event.target;
        setBlogfront({
              ...blogfront,
              [name]:value
        });
    }

    const submitBlog = () =>{
        axios.post("http://localhost:6969/Blog",blogfront)
        .then((res)=>{
            alert(res.data.message);
        });
        navigate("/Homepage");
    }
    return(
        <>
        <Navbar/>
        <div className="blog_main_div">
            <h1>Hey blogger! Convey your views through blogging.</h1>
                 <div className="blog_main_div_input_head">
                     <p>What's the blog about?</p>
                     <input type="text" name="blogtitle" value={blogfront.blogtitle} onChange={updateChangeblog}/>
                 </div>
                 <div className="blog_main_div_input_blog">
                     <p>Blog:</p>
                     <textarea rows="16" cols="92" name="blogbody" value={blogfront.blogbody} onChange={updateChangeblog}/>
                 </div>
                 <div className="blog_main_div_button_div">
                       <button className="blog_main_div_button" onClick={submitBlog} type="submit">Post</button>
                 </div>
                 
        </div>
        </>
    );
}

export default Blog;