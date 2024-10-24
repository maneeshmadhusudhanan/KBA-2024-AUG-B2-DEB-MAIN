import {Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from '../Middleware/auth.js';
import dotenv from 'dotenv';



dotenv.config();
const adminRoute=Router();
const user=new Map();
const course=new Map();
// const secretKey="hello";
const Course = new Map();
const secretKey=process.env.secretKey;


adminRoute.get('/',(req,res)=>{
    res.send("Hello World");
 })
 function userLogin(){}
 adminRoute.post('/signup',async(req,res)=>{
     try{
        const data = req.body;
        console.log("body", data);
        
        console.log(data.FirstName);

        const { FirstName, LastName, UserName, Password, UserRole } = req.body;
        // const data1= JSON.parse(data);
        console.log(UserName);
        const newPassword = await bcrypt.hash(Password, 10)

        console.log(newPassword);
        if (user.get(UserName)) {
            res.status(400).json({ message: "Username already exist" });
        }
        else {
            user.set(UserName, { FirstName, LastName, Password: newPassword, UserRole })
            console.log(user.get(UserName));
            // // console.log(result);
            res.status(201).json({ message: "Saved Data" })
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
 
 })

 adminRoute.post('/login',async(req,res)=>{
    const { UserName, Password } = req.body;
        const result = user.get(UserName)
        console.log(result);


        if (!result) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            console.log(Password);
            console.log(result.Password);


            const isvalid = await bcrypt.compare(Password, result.Password);
            console.log(isvalid);
            if(isvalid){
               const token= jwt.sign({UserName:UserName,UserRole:result.UserRole},secretKey,{expiresIn:'1h'})
               console.log(token);
               res.cookie('authToken',token,{
                httpOnly:true,
                
               });
             res.status(200).json({token});
            }
        }

 })

 adminRoute.post('/addCourse',authenticate, (req,res)=>{
    console.log(req.UserName);
    console.log(req.UserRole);
    const user=req.UserRole;
    const { CourseName, CourseId, CourseType, Description, Price } = req.body;

    try {

        if (user == "admin") {
            try {
                if (course.get(CourseName)) {
                    res.status(400).json({ message: "Course already present" })
                }
                else {
                    course.set(CourseName, {
                        CourseId: CourseId,
                        CourseType: CourseType,
                        Description: Description,
                        Price: parseInt(Price)
                    })

                    res.status(201).json({ message: "Course Details Uploaded" });
                    console.log(course.get(CourseName));

                }
            }

            catch (error) {
                res.status(400).json({ message: "Check the Course Details" });

            }
        }

        else {
            res.status(400).json({ message: "Unauthorized Access" })
        }
    }


    catch (error) {
        res.status(401).json({ message: "Check Course details" });

    }
 })

//using params

//  adminRoute.get('/getCourse/:name',authenticate,(req,res)=>{
// console.log(req.params.name);
//  })


 //using query
//  adminRoute.get('/getCourse',authenticate,(req,res)=>{
//  adminRoute.get('/getCourse',(req,res)=>{
//     console.log(req.query.CourseName);
//  });


  //using query
//  adminRoute.get('/getCourse',authenticate,(req,res)=>{
    adminRoute.get('/getCourse',(req,res)=>{
        try{
            const search= req.query.CourseId;
            console.log(search);
            const result = course.get(search)
            if(result){
                res.send(result);
                }
                else{
                    res.status(400).json({message:"no course found"})
                }
            }
            catch(error){
                res.status(400).json({message:"check the input"})
            }
        }
        // console.log(req.query.CourseName);
     );
    

     //update route

    //  adminRoute.patch('/updateCourse',authenticate,(req,res)=>{
    //     const user = req.UserRole;

    //     const{CourseName, Description,Price } = req.body;

    //     try{
    //         if (user == "admin"){
    //             try{}
    //         }
    //     }
    //  })

 export  {adminRoute};
// export default {adminRoute,userLogin};
 