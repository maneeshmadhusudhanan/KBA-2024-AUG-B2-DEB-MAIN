import express, { json } from 'express';
import { adminroute } from './Routes/adminroutes.js';
import dotenv from 'dotenv';


const app = express();

app.use(express.json());

app.use('/', adminroute);
dotenv.config();

const port=8001;

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})