import jwt from 'jsonwebtoken';
import dotenv  from 'dotenv';
dotenv.config();
const secret_key=process.env.Secret_Key;

const authenticate=(req,res,next)=>{
    console.log(("hi"));
    
    
    const user2 = req.headers.cookie;
    const user = req.cookies;
    console.log(user);
    console.log(user2,"sr2");
    const cookies = user2.split(';');
    for(let cookie of cookies){
        const [name,token]= cookie.trim().split('=');
        if(name=='authToken'){
            console.log(token);
            const verified=jwt.verify(token,secret_key);
            console.log(verified);
            console.log(verified.UserName);
            
            req.username=verified.UserName;
            req.userrole=verified.UserRole;
            break;
        }}
        next();
    
}
export default authenticate;