import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import authenticate from "../Middleware/auth.js";
import mongoose from "mongoose";
dotenv.config();

const adminRoute = Router();
// const user = new Map();   replaced by  database
// const course = new Map();
const secret_key = process.env.Secret_Key;

//define user schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: {type:String,unique:true },
  password: String,
  userRole: String,
});
//create model
const User = mongoose.model("usedetails", userSchema);
//create course schema
const CourseSchema = new mongoose.Schema({
  courseName: String,
  courseId: String,
  courseType: String,
  description: String,
  price: String,
});
//create course model
const Course = mongoose.model("course", CourseSchema);

mongoose.connect("mongodb://localhost:27017/KBA-WEBSITE");

// adminRoute.get('/', function (req, res) {
//     // res.send("Hello World");
//     res.status(400).send("Hello World")
// })

adminRoute.post("/signup", async (req, res) => {
  try {
    const { FirstName, LastName, UserName, Password, UserRole } = req.body;
    // const data1= JSON.parse(data);

    const newPassword = await bcrypt.hash(Password, 10);

    // console.log(newPassword);
    console.log(UserName);

    const existingUser = await User.findOne({ userName: UserName });
    console.log(existingUser);

    if (existingUser) {
      res.status(400).json({ message: "Username already exist" });
    } else {
      //create a newuser
      const newUser = new User({
        firstName: FirstName,
        lastName: LastName,
        userName: UserName,
        password: newPassword,
        userRole: UserRole,
      });
      //save user to mongodb
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// --------------------------------------------------------------

adminRoute.post("/login", async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    const result = await User.findOne({ userName: UserName });
    // const result = user.get(UserName)
    console.log(result);

    if (!result) {
      res.status(404).json({ message: "User not found" });
    } else {
      // console.log(Password);
      // console.log(result.password);

      const isvalid = await bcrypt.compare(Password, result.password);
      console.log(isvalid);

      if (isvalid) {
        console.log(result.userRole);
        const token = jwt.sign(
          { UserName: result.userName, UserRole: result.userRole },
          secret_key,
          { expiresIn: "1h" }
        );
        console.log(token);

        res.cookie("authToken", token, {
          httpOnly: true,
        });
        res.status(200).json({ token });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// adminRoute.get("/viewUser", authenticate, (req, res) => {
//   try {
//     const user = req.userrole;
//     res.json({ user });
//   } catch {
//     res.status(404).json({ message: "user not authorized" });
//   }
// });

adminRoute.post("/addCourse", authenticate, async (req, res) => {
  try {
    if (req.userrole === "admin") {
      const body = req.body;
      const { CourseName, CourseId, CourseType, Description, Price } = body;
      console.log(body);

      const exstingCourse = await Course.findOne({ courseName: CourseName });

      if (exstingCourse) {
        res.status(400).json({ message: "Course already present" });
      } else {
        //create a new course
        const newCourse = new Course({
          courseName: CourseName,
          courseId: CourseId,
          courseType: CourseType,
          description: Description,
          price: parseInt(Price),  //parseint convert string to intiger 
        });
        //save course to mongodb
        await newCourse.save();
      }
    } else {
      res.status(400).json({ message: "Unauthorized Access" });
    }
  } catch (error) {
    res.status(401).json({ message: "Check Course details" });
  }
});





// adminRoute.get('/getCourse/:name', async (req, res) => {

        // const search = req.params.name.toUpperCase();
        // console.log(search);
        adminRoute.get('/getCourse', async (req, res) => {
          try {
        const search = req.query.courseName.toUpperCase();
        console.log(search);
        const result = await Course.findOne({courseName:search})// find and stored in result
        if (result) {

            res.send(result);
            res.stutus(200).json(result)
        }
        else {
            res.status(404).json({ message: "No course found,Check the name" })
        }
    }
    catch (error) {
        res.status(400).json({ message: "Check the input" })
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

// adminRoute.put('/updateCourse',authenticate,(req,res)=>{
//     const user = req.userrole;

//     const {  CourseName, CourseId, CourseType, Description, Price } = req.body;

//     try {

//         if (user == "admin") {
//             try {
//                 let data = course.get(CourseName);
//                 if(data){
//                     course.set(CourseName, {
//                         CourseId: CourseId,
//                         CourseType: CourseType,
//                         Description: Description,
//                         Price: parseInt(Price)
//                     });

//                 }
//                 else {
//                     res.status(400).json({ message: "No such course" })
//                 }

//                     res.status(201).json({ message: "Course Details Updated" });
//                     console.log(course.get(CourseName));

//                 }

//             catch (error) {
//                 res.status(400).json({ message: "Check the Course Details" });

//             }
//         }

//         else {
//             res.status(400).json({ message: "Unauthorized Access" })
//         }
//     }

//     catch (error) {
//         res.status(401).json({ message: "Check Course details" });

//     }

// })

// adminRoute.delete('/deleteCourse/:name',authenticate,(req,res)=>{
//     const user = req.userrole;
//     try{
//     if(user=="admin"){
//     const courseName=req.params.name.toUpperCase();
//     console.log(courseName);
//     const data = course.get(courseName);
//     if(data){
//         course.delete(courseName);
//         res.status(200).json({"message":"Course deleted"})
//     }
//     else{
//         res.status(400).json({message:"Course not found"});
//     }

// }}
// catch{
//     res.status(404).json({message:'Unauthorized acess'})
//     console.log(data);
// }
// })

// adminRoute.get('/logout', (req, res) => {
//     res.clearCookie('authToken'); // 'authToken' is the cookie name
//     res.status(200).json({ message: 'Logout successful' });
// })

export { adminRoute };
