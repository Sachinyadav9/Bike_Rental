import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectedRoute = async(req , res ,next)=>{
    try{

        const token = req.cookies.jwt;
        console.log("The Token is " , token)

        if(!token){
            return res.status(400).json({message : "Unathorised No Token Provided"});
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        if(!decoded){
            return res.status(400).json({message:"Unathorised Invalid Token"})
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(400).json({message : "User not found"});
        }
        req.user = user
        next();
    }
    catch(err){
            console.log("Error in the protectedRoute :" , err.message);
            return res.status(400).json({message : "Internal server Error"});
            
    }
}