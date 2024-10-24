import {Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminRoute=Router();
const user=new Map();
const secretKey="hello";

adminRoute.get('/',(req,res)=>{
    res.send("Hello World");
 })
 
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



 export {adminRoute};
 