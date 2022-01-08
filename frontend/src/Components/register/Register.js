import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () =>{
    const navigate=useNavigate();
       const [user,setUser]=useState(     //this stores the current user's entered data while signing up
           {
               name:"",
               email:"",
               password:""
           }
       );

       const updateChange = (event) =>{     //this changes the user object whenever types the required details
           const {name,value}=event.target;
           setUser({
                   ...user,
                   [name]:value
           });
       }

       const register = () =>{                   //this sends the registered details to the server
           const {name,email,password}=user;
           if(name && email && password){ 
               axios.post("http://localhost:6969/Register",user)
               .then((res)=>{
                   if(res.data.message=="An account with this email already exists! Use another one"){
                       alert(res.data.message);
                       setUser({
                        name:"",
                        email:"",
                        password:""
                    });
                       navigate("/Register",{replace:true});
                   }
                   else{
                    localStorage.setItem("user",JSON.stringify(res.data.newuser));
                    navigate("/Homepage",{replace:true});
                   }
                    
                    
               })
           }
           else{
               alert("Invalid Input");
           }
       }

       return(
           <>
               <div className="login_page">
            <nav className="navbar navbar-expand-lg navbar-dark">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">CollegeConnect</a>
              </div>
            </nav>
        <div className="login_page_body">
            <div className="login_page_body_block">
                 <div className="login_page_body_block_heading">
                     <h1>Create a new account</h1>
                 </div>
                 <div className="login_page_body_block_login_details">
                     <p>Email</p>
                     <input type="email" name="email" value={user.email} onChange={updateChange}/>
                     <p>UserName</p>
                     <input type="text" name="name" value={user.name} onChange={updateChange}/>
                     <p>Password</p>
                     <input type="password" name="password" value={user.password} onChange={updateChange}/>
                     <button className="login_page_body_block_login_details_login_button" type="submit" onClick={register}>Create Account</button>
                 </div>
                     

            </div>
        </div>
       </div>
           </>
       );
       
}

export default Register;