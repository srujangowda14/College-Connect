import React, { useEffect } from "react";
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
    
    const [alreadyExists,setalreadyExists]=useState(false);
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
    
    const checkresponse = (res) =>{
        if(res.data.message==="Question already exists"){
            setalreadyExists(true);
            return false;
        }
        return true;
    }

    const submitQuestion = (event) =>{
        event.preventDefault();
        axios.post("http://localhost:6969/AskQuestion",questiondesc)
        .then((res)=>{
            if(checkresponse(res)){
                navigate("/Homepage",{replace: true});
            }
            
        })
    }


       return(
          <>
           <Navbar/>
          <div className="ask_question_main_div">
              <form onSubmit={submitQuestion} autocomplete="off">
               <div className="ask_question_main_div_input">
                    <p>TITLE</p>
                    <input type="text" name="question" value={questiondesc.question} onChange={handleChangeInAskQuestion} minlength="10" maxlength="100" autocomplete="on" required />
                    {alreadyExists?<p className="warning_message_style mt-1">*Question already exists. Please be specific</p>:null}
               </div>
               <div className="ask_question_main_div_desc">
                    <p>DESCRIBE YOUR QUESTION</p>
                    <textarea name="questionDescription" value={questiondesc.questionDescription} cols="92" rows="16" onChange={handleChangeInAskQuestion} minlength="20" required></textarea>
               </div>
               <div className="ask_question_main_div_input_tag">
                    <p>ADD TAG</p>
                    <input type="text" name="questionTag" value={questiondesc.questionTag} onChange={handleChangeInAskQuestion} required/>
               </div>
               <div className="d-flex flex-row justify-content-center">
                    <button type="submit" className="ask_question_main_div_button ms-6 me-5">Submit Question</button>
               </div>
                   
              </form>
               
          </div>
          </>
      )
}

export default AskQuestion;
