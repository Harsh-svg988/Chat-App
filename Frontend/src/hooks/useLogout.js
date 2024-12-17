import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from "react-hot-toast";

function UseLogout() {
   const [loading,setLoading] = useState(false);
   const {authuser,setAuthUser} = useAuthContext()

   const logout = async ()=>{
    setLoading(true);
    try{
        const response = await fetch("api/auth/logout",{
            method: "POST",
            headers: {"Content-Type":"applicaton/json"}
        })
        const data = await response.json();
        if(data.error){
            throw new Error(data.error);
        }
        localStorage.removeItem("chat-user")
        setAuthUser(null)
    }
    catch(error){
        toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
   }
   return {logout,loading}
}

export default UseLogout;
