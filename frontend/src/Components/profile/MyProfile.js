import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";

const MyProfile  = () =>{
    const [userprofile,setUserProfile]=useState({});
    const ls=localStorage.getItem("user");
    const lobj=JSON.parse(ls);
    useEffect(()=>{
        axios.get(`http://localhost:6969/userprofile?uid=${lobj._id}`)
        .then((res)=>{
            setUserProfile(res.data.userprofiledata);
            console.log(res.data.userprofiledata);
        })
    })
    return(
        <>
        <Navbar/>
        <div className="userprofile_first_div">
            <h1>{userprofile.firstname} {userprofile.lastname}</h1>
            {/* <p>CollegeConnect Username: {userprofile.userid.name}</p> */}
        </div>
        </>
    );
}

export default MyProfile;