
import User from "../models/user.model.js"
const AdminRoute = (req , res , next)=>{
    try{
      
  const user = req.user.email
    if(user == process.env.ADMIN){
        next()
    }
    }
  catch(err){
    console.log("Error in the Admin Middlware");
 res.status(400).json({message : "Admin Only Allowed"});

  }
   
    
}
export default AdminRoute