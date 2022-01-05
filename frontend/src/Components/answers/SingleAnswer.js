import react from "react";

const SingleAnswer = (props) =>{
    const dateofq=new Date(props.prval.date);
    const d=dateofq.toLocaleString({timezone:"+05:30"});
    return(
       <> 
       <div className="single_answer_main_block">
           <div className="single_answer_div">
                  <p className="single_answer_div_p">Answer by: {props.prval.answerby.name} on {d}</p>
               <p>{props.prval.answer}</p>
               
           </div>    
       </div>
      
       
       </>
    );
}
export default SingleAnswer;