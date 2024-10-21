import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import generateTokenAndSetCookie from '../utils/generateToken.js'


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

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        

        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic:gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            // Generate JWT Token here
                await generateTokenAndSetCookie(newUser.id,res)
                await newUser.save()
                res.status(201).json({
                id:newUser.id,
                fullname:newUser.fullname,
                username:newUser.username,
                profilePic:newUser.profilePic,
            })
        }
        else{
            res.status(400).json({message:"Invalid user data"})
        }
        

    } catch (error) {
        console.log("Error in signup Controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
        
    }
}



export const login = async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || " ");
        if(!user || isPasswordCorrect){
            return res.status(400).json({error:"Invalid Credentials"})
        }
        
        generateTokenAndSetCookie(user.id,res);
        res.status(200).json({
            id:user.id,
            fullname:user.fullname,
            username:user.username,
            profilePic:user.profilePic
        });


    } catch (error) {
        console.log("Error in login Controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
        
    }
}

export const logout = (req,res)=>{
    console.log("Logout user")
}


