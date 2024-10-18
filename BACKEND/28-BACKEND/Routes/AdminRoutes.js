import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const AdminRoute = Router();
const user = new Map();
const  secretKey = "your_secret_key";

AdminRoute.get('/',(req, res)=>{
    res.send("hello world");
    res.status(201).json({message:"data hello saved"});
});

// User signup route

AdminRoute.post('/signup',async(req, res)=>{
    try{
   console.log(req.body);
   const data = req.body;
   console.log(data.FirstName);

   const  {FirstName,LastName,UserName,Password,UserRole}=data;
    console.log(FirstName);
    const newP = await bcrypt.hash(Password,10)
    user.set(UserName,{FirstName,LastName,Password:newP,UserRole
  });
    console.log(newP);
console.log(UserName.get(UserName));
res.status(201).json({message:"data saved"});
}
catch(error){
    res.status(500).json(error);
    }})



// User login route 
    AdminRoute.post('/login',async(req,res)=>{
        const { UserName, Password } = req.body;
        console.log(req.body);
        const  result = user.get(UserName);
        console.log(result);
        if(!result){
            res.status(404).json({message:"user not found"});
        }
        else{
            const isvalid = await bcrypt.compare(Password,result.Password);
      console.log(isvalid);
      if(isvalid){
       const token= jwt.sign({UserName:UserName,
        UserRole:result.UserRole},secretKey,
        {expiresIn:'1hr'})
       res.cookie('AuthToken',token,{
        httpOnly:true,
       });
       res.status(200).json({token});
      }


      }


    }

      )
   
export {AdminRoute}
