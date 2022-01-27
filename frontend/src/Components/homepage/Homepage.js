import React from "react";
import { useState,useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import DisplayAnswer from "../answers/DisplayAnswer";
import DisplayBlog from "../blogs/DisplayBlog";
import Navbar from "../navbar/Navbar";

const Homepage = () =>{
    const navigate=useNavigate();
    const [nq,setNq]=useState(5);
    const [showquestions,setShowquestions]=useState([]);
    const [showblogs,setShowblogs]=useState([]);
    const [searchText,setSearchText]=useState({
      stext:""
    });

    useEffect(()=>{
      let url=`http://localhost:6969/Homepage1?nq=${nq}`
      axios.all([
        axios.get(url)
        .then((res)=>{
         setShowquestions(res.data.questiondata);
         setNq(nq+5);
         }),
        axios.get("http://localhost:6969/Homepage2")
        .then((res)=>{
         setShowblogs(res.data.blogdata);
        })
      ]) 
    },[]);

    const getquestions = () =>{
      let url=`http://localhost:6969/Homepage1?nq=${nq}`;
      axios.get(url)
        .then((res)=>{
         setShowquestions(res.data.questiondata);
         setNq(nq+10);
         })
    }

    const getblogs = () =>{
      axios.get("http://localhost:6969/Homepage2")
      .then((res)=>{
       setShowblogs(res.data.blogdata);
      })
    }

    const updateSearchText = (event) =>{
      const {name,value}=event.target;
      setSearchText({
        ...searchText,
        [name]:value
      });
    }

    const gosearch = () =>{
      axios.post("http://localhost:6969/Homepage3",searchText)
      .then((res)=>{
           navigate("/SearchedQuestions",{state:{searchdata:res.data.searchdata}});
      })
   }

     return(
         <>
           <Navbar/> 
           <div className="homepage_below_navbar_search">
                <input className="form-control ms-5" 
                type="search" placeholder="Search" aria-label="Search" name="stext" value={searchText.stext} onChange={updateSearchText}/>
                <button className="searchbutton" type="submit" onClick={gosearch}>Search</button>
           </div>
            
           <div className="homepage_below_navbar">
               <h2>Top Questions</h2>
               <button className="homepage_below_navbar_button"><Link className="homepage_below_navbar_button_navlink" to="/AskQuestion">Ask a Question</Link></button>
          </div>
          {
            showquestions.map((val,index)=>{
                return(
                   <DisplayAnswer
                    key={index}
                    pval={val}
                   />
                );
            })
          }
          <div className="homepage_view_more">
               <button className="homepage_below_navbar_button" type="submit" onClick={getquestions}>View more</button>
          </div>
          
          <div className="homepage_below_questions">
               <h2>Top Blogs</h2>
               <button className="homepage_below_navbar_button"><Link className="homepage_below_navbar_button_navlink" to="/Blog">Write a Blog</Link></button>
          </div>
          {
            showblogs.map((val,index)=>{
              return(
                <DisplayBlog
                key={index}
                pval={val}
                />
              );
            })
          }
          <div className="homepage_view_more">
               <button className="homepage_below_navbar_button" type="submit" onClick={getblogs}>View more</button>
          </div>
          
         </>
     );
}

export default Homepage;