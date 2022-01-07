import React,{useState} from "react";
import axios from "axios";

const DisplayMyBlog = (props) =>{
    const [isNotDelete,setIsNotDelete]=useState(true);
    
    const deleteBlog = (val) =>{
        setIsNotDelete(false);
        axios.post("http://localhost:6969/DeleteMyBlog",props.val)
        .then((res)=>{
            alert(res.data.message);
        })
    }
    return(
        <>
            {
                isNotDelete?
                <div className="display_my_answer_main">
                <div>
                    <div className="my_question_main_div_q_blog">
                       <h2>{props.val.blogheading}</h2><br/><p className="display_blog_main_div_blog_by">(by {props.val.blogby.name} on {new Date(props.val.date).toLocaleString({timezone:"+05:30"})})</p>
                   </div>
                   <p>{props.val.blogbody}</p>
                   <button type="submit" className="my_question_main_div_q_btn" onClick={()=>deleteBlog(props.val)}>Delete Blog</button>
                </div>
                </div>
                :null
            }
            
            
        
        
        </>
    );
}

export default DisplayMyBlog;