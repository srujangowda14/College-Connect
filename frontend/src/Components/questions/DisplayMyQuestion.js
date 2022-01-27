import React from "react";
import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const DisplayMyQuestion = (props) =>{
    const [isNotDelete,setIsNotDelete]=useState(true);
    const [ismodal,setIsmodal]=useState(false);
    const navigate=useNavigate();
    const gotoanswerpage = (val) =>{
        navigate("/SingleQuestion",{state:{pques:val.question,pquesd:val.questionDescription,pquest:val.questionTag}});
    }
    const deleteQuestion = (val) =>{
        setIsNotDelete(false);
        axios.post("http://localhost:6969/MyQuestions2",props.val)
        .then((res)=>{
            alert(res.data.message);
        })
    }
    return(
        <>
            <Modal show={ismodal} onHide={()=>setIsmodal(false)}>
            <Modal.Header>
                <Modal.Title>Delete Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete question?</Modal.Body>
            <Modal.Footer>
                <button className="modal_button_no" onClick={()=>setIsmodal(false)}>No</button>
                <button className="modal_button_yes" onClick={()=>deleteQuestion(props)}>Yes</button>
            </Modal.Footer>
            </Modal>
            {
                isNotDelete?
                <div className="display_my_answer_main">
                <div>
                    <div className="my_question_main_div_q_first">
                       <p className="display_answer_each_question_p" onClick={()=>gotoanswerpage(props.val)}>{props.val.question}</p>
                       <p>{new Date(props.val.date).toLocaleString({timezone:"+05:30"})}</p>
                   </div>
                   <button type="submit" className="my_question_main_div_q_btn" onClick={()=>setIsmodal(true)}>Delete Question</button>
                </div>
                </div>
                :null
            }
            
        
        
        </>
    );
}

export default DisplayMyQuestion;