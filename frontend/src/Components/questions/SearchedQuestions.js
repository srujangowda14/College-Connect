import React from "react";
import { useLocation } from "react-router-dom";
import DisplaySearchedQuestion from "./DisplaySearchedQuestion";

const SearchedQuestions  = () =>{
    const location=useLocation();
    const searchArray=location.state.searchdata;
    return(
        <>
           <div>
               {
                   searchArray.map((val,index)=>{
                       return(
                           <DisplaySearchedQuestion
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