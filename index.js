import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoutes from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.get('/', (req, res)=>{
    res.send("Hii Kyle");
});

app.use(express.json()); //allows us to parse incoming requests: req.body
app.use(cookieParser());//allows us to parse incoming cookies

app.use("/api/auth", authRoutes);


app.listen(PORT, ()=>{
    if(app.listen){
        // console.log("ligado");
        connectDB();
        return 1;
    }else{
        return 0;
    }
});

// 7WvsBkItaF2Qv8cf