import React, {useEffect, useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComments} from '@fortawesome/free-solid-svg-icons'

const DisplayBlog = (props) =>{
  const toggle=false;
  const lo=localStorage.getItem("user");
  const locobj=JSON.parse(lo);
  const [isLike,setIsLike]=useState(toggle);
  const [likes,setLikes]=useState(0);
  const [bdata,setbdata]=useState({
       bid:props.pval._id,
       comment:"",
       uid:locobj._id
  });
  
  const [isComment,setISComment]=useState(false);

  useEffect(()=>{
       axios.post("http://localhost:6969/DisplayBlogNoofLike",bdata)
       .then((res)=>{
            setLikes(res.data.likesdata);
            console.log(likes);
       })
  },[]);
  const addLike = () =>{
         setIsLike(!toggle);
         axios.post("http://localhost:6969/DisplayBlogLike",bdata)
         .then((res)=>{
           console.log(res.data.message);
         })
  }
  const removeLike = () =>{
         setIsLike(!toggle);
         axios.post("http://localhost:6969/DisplayBlogRemoveLike",bdata)
         .then((res)=>{

         })
  }
  const addComment = () =>{
         setISComment(false);
         axios.post("http://localhost:6969/DisplayBlogComment",bdata)
         .then((res)=>{
           console.log(res.data.message);
         })
  }

  const updateChangeInComment = (event) =>{
       const {name,value}=event.target;
       setbdata({
         ...bdata,
         [name]:value
       })
  }
    return(
      <>
      <div className="display_blog_main_div">
          <div className="display_blog_main_div_blog">
               <h2>{props.pval.blogheading}<br/><p className="display_blog_main_div_blog_by">(by {props.pval.blogby.name} on {new Date(props.pval.date).toLocaleString({timezone:"+05:30"})})</p></h2>
               <p>{props.pval.blogbody}</p>
               <div className="display_blog_main_div_blog_buttons">
                  <button type="button" onClick={isLike?removeLike:addLike} className={isLike?"display_blog_main_div_blog_button_liked":"display_blog_main_div_blog_button"}>Like <FontAwesomeIcon icon={faThumbsUp} /></button>
                  <button type="Comment" onClick={()=>setISComment(true)} className="display_blog_main_div_blog_button"> Comment <FontAwesomeIcon icon={faComments}/></button> 
               </div>
               <div className="display_blog_main_div_blog_commentsection">
                {
                 isComment?
                 <textarea rows="4" cols="50" className="display_blog_main_div_blog_textarea" name="comment" value={bdata.comment} onChange={updateChangeInComment}/>:
                 null
                }
                {
                 isComment?
                 <button type="Submit" onClick={addComment} className="display_blog_main_div_blog_commentsection_button">Post</button>:
                  null
                }
               </div>
               
               
               
          </div>
         
      </div>
     
      </>  
    );
}

export default DisplayBlog;