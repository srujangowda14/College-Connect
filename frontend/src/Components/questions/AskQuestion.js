import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import DisplayAnswer from "../answers/DisplayAnswer";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const AskQuestion = () =>{
    const navigate=useNavigate();
    const [questiondesc,setQuestionDesc]=useState({
        question:"",
        questionDescription:"",
        questionTag:"",
        questionby:""
    });

    useEffect(()=>{
        const userdatafromlocalstorage= localStorage.getItem("user");
        const objectform=JSON.parse(userdatafromlocalstorage);
        setQuestionDesc({
            ...questiondesc,
            questionby:objectform._id
        });
    },[]);
    

    const handleChangeInAskQuestion = (event) =>{
        const {name,value}=event.target;
        setQuestionDesc({
            ...questiondesc,
            [name]: value
        });
    }

    const logOut = () =>{
        localStorage.removeItem("user");
        navigate("/Login",{replace:true});
    }

    const submitQuestion = () =>{
        axios.post("http://localhost:6969/AskQuestion",questiondesc)
        .then((res)=>{
            if(res.data.message==="Answer found"){
                    return(
                          <DisplayAnswer ans={res.data.retfoundQuestion}/>
                    );
            }
            navigate("/Homepage",{replace: true});
        })
    }
      return(
          <>
           <Navbar/>
          <div className="ask_question_main_div">
               <div className="ask_question_main_div_input">
                    <p>TITLE</p>
                    <input type="text" name="question" value={questiondesc.question} onChange={handleChangeInAskQuestion} required/>
               </div>
               <div className="ask_question_main_div_desc">
                    <p>DESCRIBE YOUR QUESTION</p>
                    <textarea name="questionDescription" value={questiondesc.questionDescription} cols="92" rows="16" onChange={handleChangeInAskQuestion} required></textarea>
               </div>
               <div className="ask_question_main_div_input_tag">
                    <p>ADD TAG</p>
                    <input type="text" name="questionTag" value={questiondesc.questionTag} onChange={handleChangeInAskQuestion} required/>
               </div>
                   <button type="submit" className="ask_question_main_div_button" onClick={submitQuestion}>Submit Question</button>
          </div>
          </>
      )
}

export default AskQuestion;
