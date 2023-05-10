import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Header from "./components/Header";
import {Login}  from "./components/Login";
import {Register} from "./components/Register";
import  {Profile}  from "./components/Profile";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context } from ".";


function App() {

  const {isAuthenticated, setIsAuthenticated,loading,setloading,user,setuser} = useContext(Context)


useEffect(()=>{

setloading(true);

  axios.get("https://todoappnodejs.onrender.com/api/v1/user/me",
  {
    withCredentials:true,
  })
  .then((res)=>{
    setuser(res.data.user)
    setIsAuthenticated(true);
    setloading(false);


  })
  .catch((error)=>{
   setuser({});
   setIsAuthenticated(false);
   setloading(false);


})
  
},[]);

  return (
   
      <Router>
      <Header/>
        <Routes>

          <Route path='/' element={<Home/>} /> 
          <Route path="/profile" element={<Profile/>}/>   
          <Route path="/login" element={<Login/>}/>  
          <Route path="/register" element={<Register/>}/>  


      </Routes>

      <Toaster/>
      </Router>

  );
}


export default App;
