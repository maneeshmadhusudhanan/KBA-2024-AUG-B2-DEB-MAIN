import express from 'express';
import { json } from 'express';
import { adminRoute } from './Routes/adminRoute.js';
import userRoute from './Routes/userRoute.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import { urlencoded } from 'express';
dotenv.config();
const app=express();
// app.use(urlencoded())

app.use(json());
// app.use(cors({
//     origin:'http://1.0.0.1:9000'
// }))

// app.use(cors({
//     origin:'http://127.0.0.1:5501',
//     credentials:true
// }))
// app.use(cors())
app.use(cookieParser());
app.use('/',adminRoute);
app.use('/user',userRoute);

app.get('/', function (req, res) {
    // res.send("Hello World");
    res.status(400).send("Hello World")
});
const port=process.env.port;

app.listen(port,function(){
    console.log(`server listening to port ${port}`);
    
})