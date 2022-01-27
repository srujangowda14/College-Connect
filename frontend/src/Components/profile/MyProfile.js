import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Modal from "react-bootstrap/Modal";

const MyProfile  = () =>{
    const [showmodal,setShowmodal]=useState(false);
    const [ismodal,setIsmodal]=useState(false);
    const navigate=useNavigate();
    const [userprofile,setUserProfile]=useState({
        userid: "",
        firstName:"",
        lastname: "",
        branch: "",
        year: null,
        skills: "",
        bio: "",
        birthday:"",
        uname:""
        
    });
    const ls=localStorage.getItem("user");
    const lobj=JSON.parse(ls);
    useEffect(()=>{
        let url=`http://localhost:6969/userprofile?uid=${lobj._id}`;
        axios.get(url)
        .then((res)=>{
            const d=new Date(res.data.userprofiledata.birthday);
            console.log(d);
            const dt=d.getFullYear()+"-"+(changemonthformat(d.getMonth()+1))+"-"+d.getDate();
            console.log(dt);
            setUserProfile({
                userid:lobj._id,
                firstName:res.data.userprofiledata.firstName,
                lastname:res.data.userprofiledata.lastname,
                branch:res.data.userprofiledata.branch,
                year:res.data.userprofiledata.year,
                skills:res.data.userprofiledata.skills,
                bio:res.data.userprofiledata.bio,
                birthday:dt,
                uname:res.data.userprofiledata.userid.name,
            });
            // console.log(dt);
           
        })
    },[]);
    console.log(userprofile.birthday);
    const updateChange = (event) =>{
        const {name,value}=event.target;
        console.log(value);
        setUserProfile({
            ...userprofile,
            [name]:value
        })
    }

    const saveChanges = () =>{
        axios.post("http://localhost:6969/userprofileupdate",userprofile)
        .then((res)=>{
            alert(res.data.message);
        })
    }

    const changemonthformat = (val) =>{
        if(val<10){
            return "0"+val;
        }
    }

    const deleteAccount = () =>{
        axios.post("http://localhost:6969/deleteuser",lobj)
        .then((res)=>{
            alert(res.data.message);
            navigate("/Login");
        })
    }
    return(
        <>
        <Navbar/>
         <div className="userprofile_container">
             <div className="userprofile_uname_section">
                 <div className="userprofile_uname">
                     <h2>{userprofile.firstName} {userprofile.lastname}</h2>
                     <p>CollegeConnect username: {userprofile.uname}</p>
                 </div>
             </div>
           <div className="userprofile_first_div_profile_division">
             <div className="profile_division_firstname">
                   <p>FirstName</p>
                   <input type="text" value={userprofile.firstName} placeholder={userprofile.firstName} onChange={updateChange} name="firstName"/>
             </div>
             <div className="profile_division_firstname">
                   <p>LastName</p>
                   <input type="text" value={userprofile.lastname} placeholder={userprofile.lastname}  onChange={updateChange} name="lastname"/>
             </div>
             <div className="profile_division_firstname">
                   <p>Branch</p>
                   <select name="branch" onChange={updateChange} value={userprofile.branch}>
                        <option value="">Please select</option>
                        <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                        <option value="Information Science and Engineering">Information Science and Engineering </option>
                        <option value="Mechanical Engineering">Mechanical Engineering </option>
                        <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering </option>
                        <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                   </select>
             </div>
             <div className="profile_division_firstname">
                   <p>Year</p>
                   <select name="year" onChange={updateChange} value={userprofile.year}>
                        <option value="">Please select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                   </select>
             </div>
             <div className="profile_division_firstname">
                   <p>Skills</p>
                   <input type="text" value={userprofile.skills} placeholder={userprofile.skills} onChange={updateChange} name="skills"/>
             </div>
             <div className="profile_division_firstname">
                   <p>Bio</p>
                   <input type="text" value={userprofile.bio} placeholder={userprofile.bio} onChange={updateChange} name="bio"/>
             </div>
             <div className="profile_division_firstname">
                   <p>Birthday</p>
                   <input type="date" value={userprofile.birthday} placeholder={userprofile.birthday} onChange={updateChange} name="birthday"/>
             </div>
             <button type="submit" className="userprofile_profile_divison_button" onClick={saveChanges}>Save changes</button>
        </div>
        <div className="d-flex mb-2 justify-content-center mt-3">
            <button className="btn-danger del_btn_prop" type="button" onClick={()=>setIsmodal(true)}>Delete account</button>
        </div>
         </div> 
         <Modal show={ismodal} onHide={()=>setIsmodal(false)}>
            <Modal.Header>
                <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete account?</Modal.Body>
            <Modal.Footer>
                <button className="modal_button_no" onClick={()=>setIsmodal(false)}>No</button>
                <button className="modal_button_yes" onClick={()=>deleteAccount()}>Yes</button>
            </Modal.Footer>
            </Modal>

        </>
    );
}

export default MyProfile;