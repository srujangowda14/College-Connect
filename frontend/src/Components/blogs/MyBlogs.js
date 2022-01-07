import React,{useState,useEffect} from "react";
import Navbar from "../navbar/Navbar";
import DisplayMyBlog from "./DisplayMyBlog";
import axios from "axios";

const MyBlogs = () =>{
    const [myBlogs,setmyBlogs]=useState([]);
    const loc=localStorage.getItem("user");
    const locobj=JSON.parse(loc);
    useEffect(()=>{
        axios.post("http://localhost:6969/MyBlogs",locobj)
          .then((res)=>{
                setmyBlogs(res.data.retdata);
          })
    },[]);
    

    return(
        <>
        <Navbar/>
        <div className="my_questions_main_div">
                 {
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