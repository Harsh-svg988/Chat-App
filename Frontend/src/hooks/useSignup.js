import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";

const useSignUp = () =>{
    const [loading,setLoading] = useState(false);
    const{authUser,setAuthUser} = useAuthContext()

    const signUp = async({fullname,username,password,confirmPassword,gender})=>{
        const success = handleInputError({fullname,username,password,confirmPassword,gender})
        console.log({fullname, username, password, confirmPassword, gender});
        if(!success)return;
        setLoading(true)
        try {
            const res = await fetch("http://localhost:8081/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullname,username,password,confirmPassword,gender})
            })
            const data = await res.json();
            if(data.error){
                throw new Error (data.error)
            }
            // local storage
            localStorage.setItem("chat-user",JSON.stringify(data))
            // context
            setAuthUser(data)
            
            
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }

    }
    return {signUp,loading}
}

export default useSignUp;


function handleInputError({fullname,username,password,confirmPassword,gender}){
    if(!fullname || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill all the fields")
        return false
    }
    if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;

}
