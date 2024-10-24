import express, { json } from 'express';
import { adminroute } from './Routes/adminroutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookieParser';

const app = express();
app.use (cookieParser());
app.use(express.json());

app.use('/', adminroute);
dotenv.config();

const port=8001;

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})