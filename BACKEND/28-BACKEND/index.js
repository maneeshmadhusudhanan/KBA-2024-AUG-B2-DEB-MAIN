import express from 'express';

const app=express();
const port=8000;

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