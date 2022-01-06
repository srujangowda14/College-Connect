import React from "react";
import { useLocation } from "react-router-dom";
import DisplayAnswer from "../answers/DisplayAnswer";
import Navbar from "../navbar/Navbar";

const SearchedQuestions  = () =>{
    const location=useLocation();
    const searchArray=location.state.searchdata;
    return(
        <>
        <Navbar/>
           <div>
               {
                   searchArray.map((val,index)=>{
                       return(
                           <DisplayAnswer
                           pval={val}
                           key={index}
                           />
                       )
                   })
               }
           </div>
        </>
    );
}

export default SearchedQuestions;