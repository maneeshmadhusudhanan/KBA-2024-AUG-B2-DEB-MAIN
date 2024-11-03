import express,{json} from "express";
import { adminRoute } from "./routes/admin.js";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();

app.use(cors({
    origin:"http://127.0.0.1:5500" ,// for a particular port initilizze it before any use case 
    credentials:true
}));

app.use(json());
app.use(cookieParser());
app.use('/',adminRoute);



const port = process.env.port;


app.listen(port ,()=>{
    console.log('server running',port);
})