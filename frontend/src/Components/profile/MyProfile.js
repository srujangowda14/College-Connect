import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";

const MyProfile  = () =>{
    const [userprofile,setUserProfile]=useState({
        userid: "",
        lastname: "",
        branch: "",
        year: 1,
        bio: "",
        skills: "",
    });
    const ls=localStorage.getItem("user");
    const lobj=JSON.parse(ls);
    useEffect(()=>{
        let url=`http://localhost:6969/userprofile?uid=${lobj._id}`;
        axios.get(url)
        .then((res)=>{
            setUserProfile({
                userid:res.data.userprofiledata.userid,
                lastname:res.data.userprofiledata.
            });
        })
    },[]);
    return(
        <>
        <Navbar/>
        <div className="userprofile_first_div">
            <div className="userprofile_first_div_name">
                  
             </div>
           
        </div>
        </>
    );
}

export default MyProfile;