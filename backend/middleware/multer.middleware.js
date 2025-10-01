import multer, { MulterError } from "multer";
import path from "path";
import fs from 'fs'
import {CloudinaryStorage } from 'multer-storage-cloudinary'
import { fileURLToPath } from "url";
import cloudinary from "./cloudinary.middleware.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//     destination : (req , file , cb)=>{
//         try {
//         const filepath = path.join(process.cwd(),'./BikeImages')
//     if(!fs.existsSync(filepath)){
//         fs.mkdirSync(filepath , {recursive:true})
//     }
//         cb(null, filepath)
//         } catch (error) {
//             cb(error ,null) 
//         }

//     },
//     filename : (req , file , cb)=>{
//         cb(null , Date.now() + path.extname(file.originalname))
//     }
// });

const storage = new CloudinaryStorage({
    cloudinary ,
    params : {
        folder : "bike_rental",
        allowed_formats: ["jpg", "png", "jpeg", "webp" , "avif"],
    }
})

const upload = multer({storage});
export default upload