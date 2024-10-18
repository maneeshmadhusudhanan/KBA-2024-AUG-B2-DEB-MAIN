import express,{json} from 'express';
import cors   from 'cors';
import { AdminRoute } from './Routes/AdminRoutes.js';

const app=express();
app.use(json())
app.use (cors());
app.use ('/',AdminRoute)

const port=8000;
app.get('/',(req,res)=>{
    res.send("hello world");

})

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// without arrow funtion 
// app.listen(port,funtion (){

// })
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// with arrow funtion 
// app.listen(port,()=>{
//     console.log(`server is listening on port ${port}`);
// })


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>