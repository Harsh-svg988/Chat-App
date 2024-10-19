import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js"
import { connect } from 'mongoose';
import connectToMongoDB from './db/connectToMongoDb.js';

const app = express()
const PORT = process.env.PORT || 5000



dotenv.config();

app.use(express.json())  

app.get("/",(req,res)=>{
    res.send("Hello world Good Morning")
})

app.use("/api/auth",authRoutes)



app.listen(8081,()=>{
    connectToMongoDB()
    console.log(`server is running on port ${PORT}`)
})