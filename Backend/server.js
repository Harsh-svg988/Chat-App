import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from "./routes/authRoutes.js"
import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connectToMongoDb.js';
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from 'cors';
import {app, server} from "./socket/socket.js"



dotenv.config();

const PORT = process.env.PORT || 5000
console.log(PORT);

const __dirname = path.resolve();

// app.use(cors());
app.use(cookieParser())
app.use(express.json())   // To parse the incoming requests with JSON payloads (from req.body)


app.use("/api/messages",messageRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

server.listen(8081,()=>{
    connectToMongoDB()
    console.log(`server is running on port ${PORT}`)
})