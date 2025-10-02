import express from 'express'
import cookieParser from 'cookie-parser'
import authRoute from "./Routes/auth.routes.js"
import bikeRoute from './Routes/bikes.route.js'
import { connectDB } from './lib/db.js'
import cors from "cors"
import dotenv from "dotenv"
import { addBikes } from './controllers/bikes.controller.js'
import { protectedRoute } from './middleware/auth.middleware.js'
import upload from './middleware/multer.middleware.js'

import path from 'path'
const app = express()
const PORT = process.env.PORT || 5001
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/bikeImages" , express.static(path.join(process.cwd() , "./bikeImages")))
app.use(cors({origin : process.env.CLIENT_URL , credentials : true}))
app.use("/api/auth" , authRoute)
app.use("/api/auth/bikes" , bikeRoute)
app.listen( PORT , async ()=>{
      await  connectDB()
    console.log("The Server Started at " , 5001);
})