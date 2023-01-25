import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

const connect = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("Connected to DB")
    }).catch((err) =>{
        throw err;
    });
};

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("api/comments", commentRoutes)
app.use("/api/auth", authRoutes)

app.use((err, req,res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
         success:false,
         status,
         message
    });
});

app.listen(3000,()=>{
    connect()
    console.log("Connected to Server!")
});