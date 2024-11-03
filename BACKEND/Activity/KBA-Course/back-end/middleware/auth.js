import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secretkey = process.env.secretKey;
const authenticate = (req, res, next) => {
    const cookies = req.headers.cookie;

    //    req.cookie;

    console.log(cookies);

    const cookie = cookies.split(';')

    for (let cooki of cookie) {
        const [name, token] = cooki.trim().split('=');
        console.log(name, token);
        if (name === 'authToken') {
            const verified = jwt.verify(token, secretkey);
            console.log(verified);
            console.log(verified.UserName);
            req.UserName = verified.UserName;
            req.UserRole = verified.UserRole
            break;
        }
    }

    next();
}

export { authenticate }