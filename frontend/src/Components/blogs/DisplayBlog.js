import React, {useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComments} from '@fortawesome/free-solid-svg-icons'

const DisplayBlog = (props) =>{
  const [bdata,setbdata]=useState({
       bid:props.pval._id,
       comment:""
  });
  
  const [isComment,setISComment]=useState(false);

  const addLike = () =>{
         axios.post("http://localhost:6969/DisplayBlogLike",bdata)
         .then((res)=>{
           console.log(res.data.message);
         })
  }
  const addComment = () =>{
         axios.post("http://localhost:6969/DisplayBlogComment",bdata)
         .then((res)=>{
           console.log(res.data.message);
         })
  }

  const updateChangeInComment = (event) =>{
       const value=event.target;
       setbdata({
         ...bdata,
         comment:value
       })
  }
    return(
      <>
      <div className="display_blog_main_div">
          <div className="display_blog_main_div_blog">
               <h2>{props.pval.blogheading}<br/><p className="display_blog_main_div_blog_by">(by {props.pval.blogby.name} on {new Date(props.pval.date).toLocaleString({timezone:"+05:30"})})</p></h2>
               <p>{props.pval.blogbody}</p>
               <div className="display_blog_main_div_blog_buttons">
                  <button type="button" onClick={addLike} className="display_blog_main_div_blog_button">Like <FontAwesomeIcon icon={faThumbsUp} /></button>
                  <button type="Comment" onClick={()=>setISComment(true)} className="display_blog_main_div_blog_button"> Comment <FontAwesomeIcon icon={faComments}/></button> 
               </div>
               <div className="display_blog_main_div_blog_commentsection">
                {
                 isComment?
                 <textarea rows="4" cols="50" className="display_blog_main_div_blog_textarea" onChange={updateChangeInComment}/>:
                 null
                }
                {
                 isComment?
                 <button type="Submit" onClick={addComment}>Send</button>:
                  null
                }
               </div>
               
               
               
          </div>
         
      </div>
     
      </>  
    );
}

export default DisplayBlog;