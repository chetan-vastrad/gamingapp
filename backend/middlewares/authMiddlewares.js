// This middleware ensures that only logged-in users can access certain routes.
import jwt from "jsonwebtoken";
import User  from "../model/User.js";

const protect = async (req,res,next) =>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
    try {
        // Send this to frontend and make a spce and take secnd element i.e is token
        token = req.headers.authorization.split(" ")[1];
        // jwt.verify() decodes and validates the token using a secret key (JWT_SECRET
        const decode = jwt.verify(token, process.env.JWT_SECRET)
         // Using the id from the decoded token payload, it fetches the user from the database.
        req.user = await User.findById(decode.id).select("-password");
        // If everything is good move neext
        next();

    } catch (error) {
        return res.status(400).json({message:"Not Authorised User, Invalid Token"})
    }
    if(!token){
        return res.status(400).json({message:"Not Authorised User, No Token"})
    }
};

const authorizeRole = (...roles) =>{
    return (req,res,next) =>{
        if(!req.user || !roles.includes(req.user.role)){
            return res.status(404).json({message: "Access Denaied"})
        }
        next();
    };
};

export {protect,authorizeRole}