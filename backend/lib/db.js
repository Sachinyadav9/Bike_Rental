import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
       const conn =  await mongoose.connect("mongodb://127.0.0.1:27017/bikerental" )
       console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch(err){
        console.log("The Error in connecting the dbs")
    }
}