import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { generateToken } from "../lib/utils.js";

export const signup = async(req , res)=>{
    console.log("i am here")
    const {fullname  , email , password } = req.body
    try{
        if(!fullname || !email || !password){
            return res.status(400).json({message : " All fields are required"
            })
        }
        if(password.length < 8){
            return res.status(400).json({message : "Password length must be greater than 8 char"})
        }
        const user = await User.findOne({email});
        
        if (user) return res.status(400).json({message : "Email already exist"})
       const  isAdmin = (email == process.env.ADMIN)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)
        const newUser = new User({
            fullname ,
            email ,
            password : hashedPassword,
            role : isAdmin ? 'admin' : 'user'
        })
        if(newUser){
            generateToken(newUser._id , res)
            await newUser.save();
            console.log(newUser._id)

          return res.status(201).json({
                success : true,
                message : "User Created Successfully",
                user:{
                _id : newUser._id ,
                email : newUser.email ,
                fullname : newUser.fullname ,
                password : newUser.password,
                role : newUser.role
                }
            })
        }
        else{
            res.status(400).json({message : "Invalid User Data"})
        }
    }
    catch(err){
        console.log("Error in the Signup Controller" , err.message);
        res.status(400).json({message : "Invalid Credential"})
    }
}

export const login = async(req , res)=>{
    const {email , password} = req.body
    try{
         const user =  await User.findOne({email})
    if(!user){
     return res.status(400).json({message : "User dosent Exist"})   
    }
    const isPasswordCorrect = await bcrypt.compare(password , user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message : "Invalid Credentails"})
    }
    generateToken(user._id , res)
    return res.status(200).json({
        success : true,
        message : "User Created Successfully",
        user:{
        _id:user._id ,
        email : user.email ,
        password : user.password
        }})
    }
    catch(err){
        console.log("Error in the Login controller");
        
        res.status(400).json({message : "Internal Server Error"})
    }
   
}

export const logout = async(req , res)=>{
    try {
    
        res.clearCookie("jwt" , {
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV !== "development"

 })
        res.status(200).json({success : true,message : "Logout Successfully"})
        
    } catch (error) {
        res.status(400).json({message : 'internal Server Error'})
    }
}

export const isLoged = async(req , res)=>{
    try {
        let isAdmin = false
        console.log("isLoged here ")
            const token = req.cookies.jwt;
            
    if(!token){
        return res.json({authenticated : false})
    }
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    if(!decoded) return res.json({authenticated : false})
    const user = await User.findById(decoded.userId).select("-password");
    if(user.role == 'admin'){
        isAdmin = true
        console.log(user)
    }
    if(!user) return res.json({authenticated : false})
        console.log({isAdmin})
    return res.json({authenticated :true  , isAdmin , user})
    } catch (error) {
        console.log(error.message);
        
        return res.json({authenticated : false })
    }


}

