import './App.css';
import React, { useState, useEffect } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Components/homepage/Homepage';
import Register from './Components/register/Register';
import Login from './Components/login/Login';
import MyQuestions from './Components/questions/MyQuestions';
import AskQuestion from './Components/questions/AskQuestion';
import SingleQuestion from './Components/answers/SingleQuestion';
import Blog from './Components/blogs/Blog';
import SearchedQuestions from './Components/questions/SearchedQuestions';
import MyBlogs from './Components/blogs/MyBlogs';
import MyProfile from './Components/profile/MyProfile';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [user, setLoginUser] = useState(null);

  useEffect(() => {
    try{
      const userinlocalstorage=localStorage.getItem("user");
      if(!user){
          setLoginUser(null);
      }
      else{
        setLoginUser(JSON.parse(userinlocalstorage));
      }
    }catch(err){
      console.log(err);
      setLoginUser(null);
    }
    
  }, []);
  // const fnsetLoginUser = (userobject) =>{
  //   console.log("hellllo")
  //   setLoginUser(userobject);

  // }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user && user._id ? <Homepage/> : <Login />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/MyQuestions" element={<MyQuestions/>} />
          <Route path="/AskQuestion" element={<AskQuestion/>} />
          <Route path="SingleQuestion" element={<SingleQuestion/>}/>
          <Route path="/Blog" element={<Blog/>}/>
          <Route path="/SearchedQuestions" element={<SearchedQuestions/>}/>
          <Route path="/MyBlogs" element={<MyBlogs/>}/>
          <Route path="/MyProfile" element={<MyProfile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
