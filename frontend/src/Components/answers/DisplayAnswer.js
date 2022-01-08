import React from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

const DisplayAnswer = (props) =>{
    const qid=props.pval._id;
    const ques=props.pval.question;
    const quesd=props.pval.questionDescription;
    const quest=props.pval.questionTag;
    const dateofq=new Date(props.pval.date);
    const d=dateofq.toLocaleString({timezone:"+05:30"});
    const navigate=useNavigate();
    const gotoanswerpage = () =>{
        navigate("/SingleQuestion",{state:{pqid:qid,pques:ques,pquesd:quesd,pquest:quest}});
    }
    return(
        <>
        <div className="display_answer_main_block">
            <div className="display_answer_each_question">
                <p className="display_answer_each_question_p" onClick={gotoanswerpage}>{props.pval.question}</p>
                <p className="display_answer_each_question_askedby">Asked by: {props.pval.questionby.name}<br/>{d}</p>
            </div>
        </div>
        </>  
    );
}

export default DisplayAnswer;
