import express, { json } from "express";
import { certRoute } from "./Routes/certRout.js";

const app = express();
app.use(express.json());
app.use('/',certRoute);

app.listen(8000,function(){
    console.log("server is running on port 8000")
})