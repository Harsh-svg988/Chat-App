import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js"
import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connectToMongoDb.js';
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"


dotenv.config();
const app = express()
const PORT = process.env.PORT || 5000
console.log(PORT);


app.use(cookieParser())
app.use(express.json())   // To parse the incoming requests with JSON payloads (from req.body)

app.get("/",(req,res)=>{
    res.send("Hello world Good Morning")
})

app.use("/api/messages",messageRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

app.listen(8081,()=>{
    connectToMongoDB()
    console.log(`server is running on port ${PORT}`)
})