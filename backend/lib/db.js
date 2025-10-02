import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
        console.log("Connecting to the Database")
       const conn =  await mongoose.connect(process.env.MONGO_URI)
       console.log(`MongoDB connected: ${conn.connection.host}`)

    }
    catch(err){
        console.log("The Error in connecting the dbs")
    }
}

