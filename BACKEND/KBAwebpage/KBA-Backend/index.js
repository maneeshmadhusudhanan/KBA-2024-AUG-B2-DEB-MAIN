import express,{json} from 'express';
import dotenv from 'dotenv';
import { adminRoute } from './Routes/adminRoutes.js';
import cors from 'cors';

dotenv.config();
const app=express();
app.use(cors({
    origin:'*'
}))
app.use(json());
app.use('/',adminRoute)

const port=process.env.port;

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})