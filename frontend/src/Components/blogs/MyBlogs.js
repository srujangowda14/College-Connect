import React,{useState,useEffect} from "react";
import Navbar from "../navbar/Navbar";
import DisplayMyBlog from "./DisplayMyBlog";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBlogs = () =>{
    const navigate=useNavigate();
    const [myBlogs,setmyBlogs]=useState([]);
    const loc=localStorage.getItem("user");
    const locobj=JSON.parse(loc);
    useEffect(()=>{
        axios.post("http://localhost:6969/MyBlogs",locobj)
          .then((res)=>{
                setmyBlogs(res.data.retdata);
          })
    },[]);
    
    const gotoblogpage = () =>{
        navigate("/Blog");
    }
    return(
        <>
        <Navbar/>
        <div className="my_questions_main_div">
                 {
                     (myBlogs.length===0)?
                     <div className="d-flex flex-column justify-content-center align-items-center">
                         <h3 className="text-center">It seems you haven't written any blog yet</h3>
                         <button className="btn w-25 mt-5 btn-info color-white" onClick={gotoblogpage}>Write a blog</button>
                        </div>
                        :
                     myBlogs.map((val,index)=>{
                         return(
                            <DisplayMyBlog
                            val={val}
                            key={index}
                             />
                         );
                     })
                     
                 }

        </div>
        </>
    );
}

export default MyBlogs;