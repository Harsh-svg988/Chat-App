import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]

    },
    profilePic:{
        type:String,
        default:""
    },
    // CreatedAt and Updated At => It is majority used in the feature when like Member Since or Last Active
},{timestamps:true})


const User = mongoose.model("User",userSchema)
export default User;