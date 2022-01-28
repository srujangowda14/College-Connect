import React,{useState} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const DisplayMyBlog = (props) =>{
    const [isNotDelete,setIsNotDelete]=useState(true);
    const [ismodal,setIsmodal]=useState(false);
    
    const deleteBlog = (val) =>{
        setIsNotDelete(false);
        let url=`http://localhost:6969/DeleteMyBlog?uid=${props.val.blogby._id}`
        axios.get(url)
        .then((res)=>{
            setIsmodal(false);
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
                   <button type="submit" className="my_question_main_div_q_btn" onClick={()=>setIsmodal(true)}>Delete Blog</button>
                </div>
                </div>
                :null
            }
            <Modal show={ismodal} onHide={()=>setIsmodal(false)}>
            <Modal.Header>
                <Modal.Title>Delete Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete Blog?</Modal.Body>
            <Modal.Footer>
                <button className="modal_button_no" onClick={()=>setIsmodal(false)}>No</button>
                <button className="modal_button_yes" onClick={()=>deleteBlog(props.val)}>Yes</button>
            </Modal.Footer>
            </Modal>
            
        
        
        </>
    );
}

export default DisplayMyBlog;