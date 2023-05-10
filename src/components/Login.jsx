import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '..';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import "./Login.css"

export const Login = () => {

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const {isAuthenticated, setIsAuthenticated,loading,setloading} = useContext(Context)

    if(isAuthenticated) return <Navigate to={"/"}/>

    const submithandler = async(e) => {
        e.preventDefault();
        setloading(true);


        try{
            const {data} = await axios.post("https://todoappnodejs.onrender.com/api/v1/user/login",{email,password,},
            {
                headers:{
                "Content-Type":"application/json",
                },
                withCredentials:true,  //for cookie working must pass
            }
            );
        toast.success(data.message)  //to show pop up success message
        setIsAuthenticated(true);   //set auth. true
        setloading(false);

        }

        catch(error){
        toast.error(error.response.data.message)
        setIsAuthenticated(false);       
        }
    };
  return (
<div className="login" style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"8rem"}}>
    <section className='loginsection'>
        <form onSubmit={submithandler}>
        <input type="email" placeholder='Enter email' name="email" value={email}
                            onChange={(e) => setemail(e.target.value)} required/>

        <input type="password" placeholder='Enter password' name="password" value={password}
                            onChange={(e) => setpassword(e.target.value)} required/>

            <button disabled={loading} type="submit">Login</button>
            <h4 style={{marginTop:"0px" }}>OR</h4>
            <Link to="/register" style={{marginTop:"-20px",textDecoration:"none",fontWeight:"bold",color:"blue"}}>Signup</Link>

        </form>
    </section>
</div>
    
  )
}
