import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import SingleAnswer from "./SingleAnswer";

const SingleQuestion = () =>{
    
     const location=useLocation();
     console.log(location.state.pqid);
     const qobj={
         qq: location.state.pques
     }
    //  console.log(qobj);
     const [answersfromb,setAnswersfromb]=useState([]);
     const loc=localStorage.getItem("user");
     const locObject=JSON.parse(loc);
     const [textareaVisibility,setTextareaVisibility]=useState(false);
     const [ans,setAns]=useState({
           q:location.state.pques,
           answer:"",
           answerby:locObject._id
     });
     

     useEffect(()=>{
        axios.post("http://localhost:6969/SingleQuestion2",qobj)
        .then((res)=>{
              console.log(res.data.answerdata[0].answers);
              setAnswersfromb(res.data.answerdata[0].answers);
        })
     },[]);
     const submitAnswer = () =>{
                axios.post("http://localhost:6969/SingleQuestion1",ans)
                .then((res)=>{alert(res.data.message)});
     }

     const updateChangeforans = (event) =>{
           const {name,value}=event.target;
           setAns({
                ...ans,
                [name]:value
           }
           )
     }

     return(
         <>
         <Navbar/>
         <div className="single_question_main_div">
             <div className="single_question_main_div_question">
                 <h2>Question:</h2>
                 <p className="single_question_main_div_question_p">{location.state.pques}</p>
             </div>
             <div className="single_question_main_div_question">
                 <h2>Description:</h2>
                 <p className="single_question_main_div_question_p">{location.state.pquesd}</p>
             </div>
             <div className="single_question_main_div_question">
                 <h2>QuestionTag:</h2>
                 <p className="single_question_main_div_question_p">{location.state.pquest}</p>
             </div>
             <div className="single_question_main_div_answer">
                 <h2>Answers:</h2>
                 

             </div>
             {
                      (answersfromb.length!=0)?
                      answersfromb.map((val,index)=>{
                          return(
                            <SingleAnswer
                            prval={val}
                            key={index}
                            qid={location.state.pqid}

                            />
                          );
                           
                      })
                      :<p>No answers found</p>
            }
             {
                 textareaVisibility?
                 null
                 :<button type="submit" className="single_question_main_div_button" onClick={()=>setTextareaVisibility(true)}>Answer</button>
             }
             {
                 textareaVisibility?
                 <div>
                     <textarea className="single_question_main_div_textarea" cols="77" rows="16" name="answer" value={ans.answer} onChange={updateChangeforans}></textarea>
                     <button className="single_question_main_div_button" type="submit" onClick={()=>{
                         setTextareaVisibility(false);
                         submitAnswer();
                         }
                    }>Submit your Answer</button>
                 </div>
                 :null
             }
            
         </div>
         </>
     );
}

export default SingleQuestion;