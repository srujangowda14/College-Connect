import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import DisplayMyQuestion from "./DisplayMyQuestion";

const MyQuestions = () =>{
    const [myQuestions,setmyQuestions]=useState([]);
    const loc=localStorage.getItem("user");
    const locobj=JSON.parse(loc);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.post("http://localhost:6969/MyQuestions1",locobj)
          .then((res)=>{
                setmyQuestions(res.data.retdata);
          })
    },[]);
    

    return(
        <>
        <Navbar/>
        <div className="my_questions_main_div">
                    {
                     (myQuestions.length===0)?
                     <div>
                         <h3 className="text-center">It seems you haven't asked any question yet</h3>
                        </div>
                        :myQuestions.map((val,index)=>{
                            return(
                               <DisplayMyQuestion
                               val={val}
                               key={index}
                                />
                            );
                        })
                     
                     
                 }

        </div>
        </>
    )
}

export default MyQuestions;