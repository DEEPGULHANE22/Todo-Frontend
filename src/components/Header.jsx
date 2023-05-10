import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '..'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import "./Header.css"

const Header=()=> {
    const {isAuthenticated, setIsAuthenticated,loading,setloading} = useContext(Context)
    

    const logouthandler = async() => {
     setloading(true)
      try{
          const {data} = await axios.get("https://todoappnodejs.onrender.com/api/v1/user/logout",
          { 
              withCredentials:true,  //for cookie working must pass
          }
          );
      toast.success("Logged out succcessfully")  //to show pop up success message
      setIsAuthenticated(false);   //set auth. true
    setloading(false);
      }

      catch(error){
      toast.error(error.response.data.message)
      setIsAuthenticated(true);   
      setloading(false);
    
      }
  };

  return (

    <>
    <nav className='header'>
       

        <article className='navitems'>

          <div className="navitem">
            <Link to={"/"}>Home</Link>
            </div>
            <div className="navitem">

            <Link to={"/profile"}>Profile</Link>
            </div>

            <div className="navitem">

            {
                isAuthenticated?(<button  onClick={logouthandler}>Logout</button>): (<Link to={"/login"}>Login</Link>)
            }
            </div>

           


        </article>

    </nav>
    </>
  )
}

export default Header;
