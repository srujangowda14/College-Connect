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
                   if(res.data.message==="An account with this email already exists! Use another one"){
                       alert(res.data.message);
                       setUser({
                        name:"",
                        email:"",
                        password:""
                    });
                       navigate("/Register",{replace:true});
                   }else if(res.data.message===" Password too short. Should be minimum 8 characters in length"){
                       alert(res.data.message);
                       setUser({
                           ...user,
                           password:"",
                       });
                       navigate("/Register",{replace:true});
                   }
                   else if(res.data.message==="Username already exists. Use another one"){
                       alert(res.data.message);
                       setUser({
                           ...user,
                        name:""
                    });
                    navigate("/Register",{replace:true});
                    }
                    else if(res.data.message==="Enter a valid email address"){
                        alert(res.data.message);
                        setUser({
                            ...user,
                         name:""
                     });
                     navigate("/Register",{replace:true});
                     }
                   else{
                    localStorage.setItem("user",JSON.stringify(res.data.newuser));
                    navigate("/Homepage",{replace:true});
                   }       
               })
               .catch((err)=>{
                   console.log(err);
                   alert(err);
               })
           }
           else{
               alert("Invalid Input");
           }
       }

       const checkifempty = () =>{
        let x=document.forms["login_form"]["email"].value;
        if(x=""){
            alert("Oops!! You forgot to enter email id");
        }
        let y=document.forms["login_form"]["password"].value;
        if(y=""){
            alert("Oops!! Password is required");
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
                     <form name="login_form" onSubmit={checkifempty} autoComplete="off">
                         <p>Email</p>
                         <input type="email" name="email" value={user.email} onChange={updateChange} pattern="(4NI)[0-9]{2}[a-zA-Z]{2}[0-9]{3}(_)[ABC](@nie.ac.in)"/>
                         <p>UserName</p>
                         <input type="text" name="name" value={user.name} onChange={updateChange}/>
                         <p>Password</p>
                         <input type="password" name="password" value={user.password} onChange={updateChange}/>
                         <div className="form_button_register">
                            <button className="login_page_body_block_login_details_login_button" type="submit" onClick={register}>Create Account</button>
                         </div>   
                     </form>
                    
                 </div>
                     

            </div>
        </div>
       </div>
           </>
       );
       
}

export default Register;