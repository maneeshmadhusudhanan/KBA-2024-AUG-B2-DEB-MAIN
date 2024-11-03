import express,{json} from 'express';
import dotenv from 'dotenv';
import { adminRoute } from './Routes/adminRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();
const app=express();
app.use(cors({
    origin:'http://127.0.0.1:5500',
    credentials:true
}))
app.use(json());
app.use(cookieParser());
app.use('/',adminRoute)

const port=process.env.port;

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})