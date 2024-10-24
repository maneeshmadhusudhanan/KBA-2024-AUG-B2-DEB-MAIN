import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticate } from "../middleware/auth.js";
import dotenv, { config } from 'dotenv';



dotenv.config();
const adminroute=Router();
const user= new Map();
const certidetails =new Map();
const secretKey = process.env.SECRET_KEY;

// signup part
adminroute.post("/signup",async(req,res)=>{
    try{
        const data =req.body;
        // console.log(data)
        const {firstname,lastname,username,password,role}=data;
        const newp =await bcrypt.hash(password,10)

        if(user.has(username)){
            res.send('user already exist');
        }else{
            user.set(username,{firstname,lastname,username,password:newp,role})
            res.send("data saved")
            console.log(user.get(username));
        }
    }
    catch{
        res.send("error");
    }
});

// login part
adminroute.post("/login",async(req,res)=>{
    try{
        const  logindata =req.body;
        const {username,password}=logindata;
        const result = user.get(username);
        console.log(result);
        if(!result){
            res.send("user not found")
        }else{
            const info = await bcrypt.compare(password,result.password)
            if(info){
                const token = jwt.sign({username:username, role:result.role},secretkey,{expiresIn:"1h"})
                res.cookie('certiapp',token,{httpOnly:true});
                res.send("login success")
            }
        }
    }
    catch(error){
        res.send("error")
    }
})
//view certificate
adminroute.post('/addcourse',authenticate,(req,res)=>{
    try{
        const data =req.body;
        const {coursename,certificateid,Candidatename,SelectGrade,IssueDate}=data;
        const role=req.role;
        if(role!=="admin")
        {
            res.send("you are not admin to issue certificate")
        }else{
            if(certidetails.has(Candidatename)){
                res.send("certificate already exist")
            }
            else{
                certidetails.set(Candidatename,{coursename,certificateid,Candidatename,SelectGrade,IssueDate});
                // console.log(certidetails.get(Candidatename));
                console.log("certificate issued")
                res.send("certificate issued")
                const detailcert ="This is to certify that ${Candidatename} has successfully completed the course ${coursename} with a grade of ${SelectGrade}.Certificate ID: ${certificateid} Issued on: ${IssueDate}";
                    console.log(detailcert);
            }
        }
    }
    catch(error){
        res.send("error")
    }
})
export{adminroute};