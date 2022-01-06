import axios from "axios";
import React from "react";
import {useState} from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () =>{
    const navigate=useNavigate();

    const logOut = () =>{
        localStorage.removeItem("user");
        navigate("/Login",{replace:true});
    }

    
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark ">
                 <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/Homepage">CollegeConnect</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                       <ul className="navbar-nav ms-auto mb-2 mt-2 mb-lg-0 me-2 ">
                          <li className="nav-item">
                             <NavLink className="nav-link" aria-current="page" to="/MyQuestions">My Questions</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" to="/MyBlog">My Blogs</NavLink>
                          </li>
                          <li className="nav-item">
                             <p className="nav-link nav-link-p" onClick={logOut}>Logout</p>
                          </li>
                       </ul>
                    </div>
                 </div>
           </nav> 

        </>
    );
}

export default Navbar;