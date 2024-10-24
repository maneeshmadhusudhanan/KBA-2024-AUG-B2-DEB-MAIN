import jwt from 'jsonwebtoken';
import dotenv, { config } from 'dotenv';



dotenv.config();
const secretKey = process.env.SECRET_KEY;
const authenticate = (req, res, next) => {
const cookies= req.headers.cookie;
    // req.cookies
    console.log(cookies);
    const cookie = cookies.split(';')
    const secretkey = "hello";
    for (let cooki of cookie) {
        const [name,token] = cooki.trim().split('=');
        if (name == 'authtoken') {
            const verified = jwt.verify(token, secretkey);
            console.log(verified);
            // console.log(verified.Username);
            req.Username = verified.Username;
            req.Role = verified.role;
   

            break;
            

          }
    }
    next();
}
export { authenticate};