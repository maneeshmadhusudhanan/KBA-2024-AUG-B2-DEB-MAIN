import express,{json} from 'express';
import { adminRoute } from './Routes/adminRoutes.js';
import dotenv, { config } from 'dotenv'
dotenv. config();





const app=express();
app.use(json());
app.use('/',adminRoute)


// const port=8000;
const port=process.env.port;

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})