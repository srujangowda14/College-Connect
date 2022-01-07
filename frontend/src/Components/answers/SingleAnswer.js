import axios from "axios";
import react, { useState } from "react";

const SingleAnswer = (props) =>{
    const dateofq=new Date(props.prval.date);
    const d=dateofq.toLocaleString({timezone:"+05:30"});
    const ls=localStorage.getItem("user");
    const lobj=JSON.parse(ls);
    const [isNotDelete,setIsNotDelete]=useState(true);
   
    const deleteanswer = () =>{
        setIsNotDelete(false);
        const delobj={
            qid:props.qid,
            answer:props.prval.answer,
            answerby:props.prval.answerby,
        }
        axios.post("http://localhost:6969/deleteanswer",delobj)
        .then((res)=>{

        })
    }


    return(
       <>{
           isNotDelete?
           <div className="single_answer_main_block">
           <div className="single_answer_div">
                  <p className="single_answer_div_p">Answer by: {props.prval.answerby.name} on {d}</p>
               <p>{props.prval.answer}</p>
               <div className="delete_answer_button">
                 {
                   (props.prval.answerby._id==lobj._id)?<button type="submit" onClick={deleteanswer} className="delete_answer">Delete Answer</button>:null
                 }
               </div>
           </div>    
       </div>
       :null
       }
       
      
       
       </>
    );
}
export default SingleAnswer;