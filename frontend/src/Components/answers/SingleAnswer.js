import axios from "axios";
import react, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const SingleAnswer = (props) =>{
    const dateofq=new Date(props.prval.date);
    const d=dateofq.toLocaleString({timezone:"+05:30"});
    const ls=localStorage.getItem("user");
    const lobj=JSON.parse(ls);
    const [isNotDelete,setIsNotDelete]=useState(true);
    const [ismodal,setIsmodal]=useState(false);
   
    // console.log(props.prval);
    const deleteanswer = () =>{
        setIsNotDelete(false);
        setIsmodal(false);
        const delobj={
            qid:props.qid,
            answer:props.prval.answer,
            answerby:props.prval.answerby,
        }
        // console.log(delobj);
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
                   (props.prval.answerby._id==lobj._id)?<button type="submit" onClick={()=>setIsmodal(true)} className="delete_answer">Delete Answer</button>:null
                 }
               </div>
           </div>    
       </div>
       :null
       }
       <Modal show={ismodal} onHide={()=>setIsmodal(false)}>
            <Modal.Header>
                <Modal.Title>Delete answer</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete answer?</Modal.Body>
            <Modal.Footer>
                <button className="modal_button_no" onClick={()=>setIsmodal(false)}>No</button>
                <button className="modal_button_yes" onClick={()=>deleteanswer()}>Yes</button>
            </Modal.Footer>
            </Modal>
      
       
       </>
    );
}
export default SingleAnswer;