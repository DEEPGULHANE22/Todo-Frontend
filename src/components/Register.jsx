import React, { useContext } from 'react'
import { Link,Navigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios"
import toast from "react-hot-toast"
import { Context } from '..';
import "./Login.css"


export const Register = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isAuthenticated, setIsAuthenticated,loading,setloading} = useContext(Context)



    const submithandler = async(e) => {
        e.preventDefault();
        // setloading(false);

        try{
            const {data} = await axios.post("https://todoappnodejs.onrender.com/api/v1/user/new",{name,email,password,},
            {
                headers:{
                "Content-Type":"application/json",
                },
                withCredentials:true,  //for cookie working must pass
            }
            );
        toast.success(data.message)  //to show pop up success message
        setIsAuthenticated(true);   //set auth. true
        // setloading(false);

        }

        catch(error){
        toast.error("ERROR")
        setIsAuthenticated(false);       
        }
    };

    if(isAuthenticated) return <Navigate to={"/"}/>

    return (
        <>
            <div className="login"  style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"8rem"}}>
                <section className='loginsection' >
                    <form onSubmit={submithandler} style={{height:"23rem"}}>
                        <input type="text" placeholder='Enter name' name="name" value={name}
                            onChange={(e) => setName(e.target.value)} required/>

                        <input type="email" placeholder='Enter email' name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required/>

                        <input type="password" placeholder='Enter password' name="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required/>

                        <button type="submit" disabled={loading}>Register</button>
                        <h4 style={{marginTop:"0px" }}>OR</h4>
                        <Link to="/login" style={{marginTop:"-20px",textDecoration:"none",fontWeight:"bold",color:"blue"}}>Login</Link>

                    </form>
                </section>
            </div>
        </>
    )
}
