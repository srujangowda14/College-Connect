import React, {useEffect, useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComments} from '@fortawesome/free-solid-svg-icons'

const DisplayBlog = (props) =>{
  const lo=localStorage.getItem("user");
  const locobj=JSON.parse(lo);
  const [isLike,setIsLike]=useState(true);
  const [likes,setLikes]=useState(0);
  const [comments,setComments]=useState([]);
  const [bdata,setbdata]=useState({
       bid:props.pval._id,
       comment:"",
       uid:locobj._id
  });
  const [isShowComment,setIsShowComment]=useState(false);
  const [isComment,setISComment]=useState(false);

  useEffect(()=>{
     //   let url=`http://localhost:6969/DisplayBlogNoofLike?bid=${bdata.bid}&uid=${bdata.uid}`;
       axios.post("http://localhost:6969/DisplayBlogNoofLike",bdata)
       .then((res)=>{
            if(res.data.likedalready===true){
                 console.log("hi1"); 
                 console.log(bdata.bid);
                 setIsLike(false);
            }
            setLikes(res.data.likesdata.likes.nooflikes);
       })
  },[]);
  const addLike = async () =>{
         setIsLike(!isLike);
         let url=`http://localhost:6969/DisplayBlogLike?bid=${bdata.bid}&uid=${bdata.uid}`;
         axios.post(url)
         .then((res)=>{
                   setLikes(res.data.likesdata.likes.nooflikes);
         },(err)=>{
              console.log(err);
         })
  }
  const removeLike = () =>{
         setIsLike(!isLike);
         axios.post("http://localhost:6969/DisplayBlogRemoveLike",bdata)
         .then((res)=>{
            setLikes(res.data.likesdata.likes.nooflikes);
         })
  }
  const addComment = () =>{
         setISComment(false);
         console.log("Hi dosto");
         if(bdata.comment.length>=1){
              axios.post("http://localhost:6969/DisplayBlogComment",bdata)
              .then((res)=>{
                  setComments(res.data.commentdata);
          })
         }
  }

  const updateChangeInComment = (event) =>{
       const {name,value}=event.target;
       setbdata({
         ...bdata,
         [name]:value
       })
  }

  const readComments = () =>{
       setIsShowComment(!isShowComment);
       axios.post("http://localhost:6969/ReadComment",bdata)
       .then((res)=>{
            console.log(res.data.commentdata);
            setComments(res.data.commentdata);
       })
  }
    return(
      <>
      <div className="display_blog_main_div">
          <div className="display_blog_main_div_blog">
               <h2>{props.pval.blogheading}<br/><p className="display_blog_main_div_blog_by">(by {props.pval.blogby.name} on {new Date(props.pval.date).toLocaleString({timezone:"+05:30"})})</p></h2>
               <p>{props.pval.blogbody}</p>
               <div className="display_blog_main_div_blog_lastsection">
                   <div className="display_blog_main_div_blog_lastsection_likes">
                        <p>Likes: {likes}</p> 
                        <p className="comment" onClick={readComments}> Comments</p> 
                   </div>
                   <div className="display_blog_main_div_blog_buttons">
                       <button type="button" onClick={isLike?addLike:removeLike} className={!isLike?"display_blog_main_div_blog_button_liked":"display_blog_main_div_blog_button"}>Like <FontAwesomeIcon icon={faThumbsUp} /></button>
                       <button type="Comment" onClick={()=>setISComment(!isComment)} className="display_blog_main_div_blog_button"> Comment <FontAwesomeIcon icon={faComments}/></button> 
               </div>
               </div>
               <div className="big_comment_section">
               {
                             isShowComment?
                  <div className="display_blog_main_div_blog_showcomments">
                        {
                             comments.map((val,index)=>{
                              return(
                                   <div className="display_blog_main_div_blog_showcomments_comment">
                                   <p className="display_blog_main_div_blog_showcomments_commentername">{val.commentby.name}</p>
                                  <p>{val.comment}</p>
                               </div>
                              )
                             
                         })
                    }    
                  </div>
                  :null
               }
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
         
      </div>
     
      </>  
    );
}

export default DisplayBlog;