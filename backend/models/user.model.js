import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email :{
        type : String,
        unique : true,
        required : true
    },
    fullname : {
        type :String,
        required : true,
        
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    },
    rental : [{type : mongoose.Schema.Types.ObjectId ,  ref : "Rental"}] ,
    role : {
        type : String,
        enum : ['user' , 'admin'],
        default : "user"
    }
} , {timestamps : true})

const User = mongoose.model("User" , userSchema)
export default User