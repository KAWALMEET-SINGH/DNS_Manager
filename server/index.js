import express from "express";
import dotenv from 'dotenv';
import { connectToDB } from "./Database/ConnectToDB.js";
import domainRouter from "./Routes/domian.router.js"
import authRouter from "./Routes/auth.router.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/domain", domainRouter);
app.use("/api/auth",authRouter);


app.use((err,req,res,next)=>{
    const status = err.statusCode || 500 ;
    const message = err.message || "Internal Server Error";
    return res.status(status).json({
        success : false,
        statusCode:status,
        message
    })
})
app.listen(PORT,() =>{
    connectToDB();
    console.log(`server started ${PORT}`);
    }
    );