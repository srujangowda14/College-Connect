import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

const Login = (props) =>{
    const navigate=useNavigate();
    const [user,setUser]=useState({
        email:"",
        password:""
    });
      
    const updateChange = (event) =>{
        const {name,value}=event.target;
        setUser({
                ...user,
                [name]:value
        });
    }

    const setUserAsNull = () =>{
        setUser(
            {
                email:"",
                password:""
            }
        )
    }

    const login = (event) =>{
        event.preventDefault();
        if(checkifempty){
            axios.post("http://localhost:6969/Login",user)
            .then(res=>{alert(res.data.message)
                // props.setit(res.data.Loginuser);
                localStorage.setItem("user", JSON.stringify(res.data.Loginuser));
                setUserAsNull();
                if(res.data.message=="Login Succesful"){           //whatever user data was returned, set it to user which is in app.js page
                    navigate("/Homepage", { replace: true });                                           //this will push / to the link so that now a user specific page is opened                                                   
                }                                                    
            })
        }
        
        
    }

    const checkifempty = () =>{
        let x=document.forms["login_form"]["email"].value;
        if(x=""){
            alert("Oops!! You forgot to enter email id");
            return false;
        }
        let y=document.forms["login_form"]["password"].value;
        if(y=""){
            alert("Oops!! Password is required");
            return false;
        }
        return true;
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
                     <h1>Login to your account</h1>
                 </div>
                 <div className="login_page_body_block_login_details">
                     <form name="login_form" onSubmit={login}>
                         <p>Email</p>
                         <input type="email" name="email" id="email_id" value={user.email} onChange={updateChange} autoComplete="off" required/>
                         <p>Password</p>
                         <input type="password" name="password" id="password" value={user.password} onChange={updateChange} autoComplete="off"/>
                         <div className="form_button_register">
                              <button className="login_page_body_block_login_details_login_button_l" type="submit">Login</button>
                         </div>
                     </form>
                     
                 </div>
                 <div className="login_page_body_block_no_account">
                     <p>Don't have an account?</p>
                     <Link className="login_page_body_block_create_account" to="/Register">Create Account</Link>
                 </div>
            </div>
        </div>
       </div>
       </>
    );
}

export default Login;
