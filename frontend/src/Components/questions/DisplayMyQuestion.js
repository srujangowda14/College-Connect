import react from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DisplayMyQuestion = (props) =>{
    const navigate=useNavigate();
    const gotoanswerpage = (val) =>{
        navigate("/SingleQuestion",{state:{pques:val.question,pquesd:val.questionDescription,pquest:val.questionTag}});
    }
    const deleteQuestion = (val) =>{
        axios.post("http://localhost:6969/MyQuestions2",props.val)
        .then((res)=>{
            alert(res.data.message);
        })
    }
    return(
        <>
        <div className="display_my_answer_main">
            <div className="my_question_main_div_q_first">
               <p className="display_answer_each_question_p" onClick={()=>gotoanswerpage(props.val)}>{props.val.question}</p>
               <p>{new Date(props.val.date).toLocaleString({timezone:"+05:30"})}</p>
           </div>
           <button type="submit" className="my_question_main_div_q_btn" onClick={()=>deleteQuestion(props.val)}>Delete Question</button>
        </div>
        
        </>
    );
}

export default DisplayMyQuestion;