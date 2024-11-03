import {Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from '../Middleware/auth.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const adminRoute=Router();
const secretKey="hello";
// Define User Schema
const userSchema= new mongoose.Schema(
    {
    firstName:String,
    lastName:String,
    userName:{type:String,unique:true},
    password:String,
    userRole:String 
    }
    )
// Create Model
const User=mongoose.model('Userdetails',userSchema); 
// Create Course Schema
const CourseSchema=new mongoose.Schema({
    courseName:{type:String,unique:true},
    courseId:String,
    courseType:String,
    description:String,
    price: String

}) 
// Create Course model
const Course=mongoose.model('courses',CourseSchema) 

mongoose.connect('mongodb://localhost:27017/KBA_COURSE')

adminRoute.get('/',(req,res)=>{
    res.send("Hello World");
 })
 function userLogin(){}
 adminRoute.post('/signup',async(req,res)=>{
     try{
        // const data = req.body;
        // console.log("body", data);
        
        // console.log(data.FirstName);

        const { FirstName, LastName, UserName, Password, UserRole } = req.body;
        // const data1= JSON.parse(data);
        console.log(UserName);
        const newPassword = await bcrypt.hash(Password, 10)

        console.log(newPassword);
        const existingUser=await User.findOne({userName:UserName})
        if (existingUser) {
            res.status(400).json({ message: "Username already exist" });
        }
        else {
             // Create a new user
       const newUser = new User({
        firstName: FirstName,
        lastName: LastName,
        userName: UserName,
        password: newPassword,
        userRole: UserRole
      });
       // Save user to MongoDB
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
           
        }
    }
 
    
    catch (error) {
        res.status(500).json(error);
    }
 
 })

 adminRoute.post('/login',async(req,res)=>{
    const { UserName, Password } = req.body;
        const result = await User.findOne({userName:UserName})
        console.log(result);


        if (!result) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            console.log(Password);
            console.log(result.password);


            const isvalid =await bcrypt.compare(Password,result.password);
            console.log(isvalid);
            if(isvalid){
               const token= jwt.sign({UserName:result.userName,UserRole:result.userRole},secretKey,{expiresIn:'1h'})
               console.log(token);
               res.cookie('authToken',token,{
                httpOnly:true,
                
               });
             res.status(200).json({token});
            }
        }

 })

 adminRoute.post('/addCourse',authenticate,async (req,res)=>{
    // console.log(req.UserName);
    // console.log(req.UserRole);
    const user=req.UserRole;
    const { CourseName, CourseId, CourseType, Description, Price } = req.body;

    try {

        if (user == "admin") {
            try {
                const existingCourse=await Course.findOne({courseName:CourseName}) 
                if (existingCourse) {
                    res.status(400).json({ message: "Course already present" })
                }
                else {
                    // Create a new course
     const newCourse = new Course({
        courseName: CourseName,
        courseId: CourseId,
        courseType: CourseType,
        description: Description,
        price: parseInt(Price)
        
     
      });
 
 
      // Save course to MongoDB
      await newCourse.save();
 
 
      res.status(201).json({ message: 'Course details uploaded successfully',course: newCourse  });
      console.log(newCourse);
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
// //using params
// //  adminRoute.get('/getCourse/:name',authenticate,(req,res)=>{
// //    console.log(req.params.name); 
// //  })

 //using query
 adminRoute.get('/getCourse',async(req,res)=>{
    try{
   const search= req.query.courseName; 
   console.log(search);
        const result = await Course.findOne({courseName:search})
        // console.log(result)
        if (result) {

            //res.send(result);
            res.status(200).json(result);
        console.log(result);
        }
        else {
            res.status(404).json({ message: "No course found,Check the name" })
        }
    }
    catch (error) {
        res.status(400).json({ message: "Check the input" })
    }
 })

 adminRoute.patch('/updateCourse', authenticate, async (req, res) => {
    const user = req.UserRole;
    const { CourseName, CourseId, CourseType, Description, Price } = req.body;

    try {
        // Check if user has admin privileges
        if (user === "admin") {
            // Find the course by CourseName and update its details
            const result = await Course.updateOne(
                { courseName: CourseName },
                {
                    $set: {
                        courseId: CourseId,
                        courseType: CourseType,
                        description: Description,
                        price: parseInt(Price)
                    }
                }
            );
            console.log(result);

            // Check if a course was found and updated
            if (result.matchedCount === 0) {
                return res.status(400).json({ message: "No such course" });
            }

            res.status(201).json({ message: "Course Details Updated" });
        } else {
            res.status(400).json({ message: "Unauthorized Access" });
        }
    } catch (error) {
        // Error handling for any unexpected issues
        res.status(400).json({ message: "Check the Course Details" });
    }
});

adminRoute.get('/viewUser',authenticate,(req,res)=>{
    try{
    const user=req.UserRole;
    res.json({user});}
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})

// adminRoute.get('/viewCourse', async(req,res)=>{
//     try{
//         console.log(course.size);

//         if(course.size!=0){
           
            
//         res.send(Array.from(course.entries()))
//     }
// else{
//     res.status(404).json({message:'Not Found'});
// }}
//     catch{
//         res.status(404).json({message:"Internal error"})
//     }
// })

adminRoute.get('/viewCourse', async (req, res) => {
    try {
        // Fetch all courses from the MongoDB collection
        //const courses = await Course.find();
        const courses = await Course.find();


        // Check if there are any courses in the collection
        if (courses.length > 0) {
            res.status(200).json(courses);  // Send all courses as JSON response
        } else {
            res.status(404).json({ message: 'No courses found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});



 export  {adminRoute};
// export default {adminRoute,userLogin};
 

