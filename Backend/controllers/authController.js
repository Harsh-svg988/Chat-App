import User from '../models/userModel.js'
export const signUp = async(req,res)=>{
    try {
        const {fullname,username,password,confirmPassword,gender}= req.body
        if(password !== confirmPassword){
            return res.status(400).json({message:"Passwords do not match"})
        }

        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({message:"Username already exists"})
        }
    } catch (error) {
        
    }
}



export const login = (req,res)=>{
    
}

export const logout = (req,res)=>{
    console.log("Logout user")
}


