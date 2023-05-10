import React, { useContext } from 'react'
import { Context } from '..'
import Loader from './Loader'

export const Profile = () => {

  const {isAuthenticated, setIsAuthenticated,loading,setloading,user,setuser} = useContext(Context)
  

  return (

    loading?  <Loader/>:(
    <div style={{border:"2px solid black",width:"70%",display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center",margin:"13rem"}}>
<h1>Name : {user?.name}</h1>
<h1>Email : {user?.email}</h1>
    </div>
    )
  )
}
