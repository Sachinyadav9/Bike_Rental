import Bikes from "../models/bikes.model.js"

import User from "../models/user.model.js"
import { Rental } from "../models/Rental.model.js"

import cloudinary from "../lib/cloudinary.js"

export const addBikes = async(req , res)=>{
    try{
        const {name , price  } = req.body
        const images = req.files.map(file => file.path);

        const newBike = new Bikes({
         name,
         price,
         Image : images
        })
        await newBike.save()
        return res.status(201).json({message : " New Bike Added"})
    }
    catch(err){
        console.log("The Error Generated in AddBike" , err.message);
        
        return res.status(400).json({message : "Error in Adding the Bike"
        })
    }
}

export const deleteBike = async(req , res)=>{
    try {
    const {bike_id} = req.params;
    const removedBike = await Bikes.findByIdAndDelete({bike_id});
    res.status(200).json({message : "The Bike was Deleted"})
    } 
    catch (error) {
        console.log("Error in Deleting a Bike" , error.message)
        res.status(400).json({message : "Error in Deleting a Bike"


        })
    }
}

export const getBike = async(req , res )=>{
    try {
        const bikeId = req.params.id;
       
        const bike = await Bikes.findById({_id : bikeId});
       
        res.json(bike);

    } catch (error) {
        res.status(400).json({message : "Internal Server Error"})
    }
}

export const getAllBike = async(req , res)=>{
    try {
        const bikes = await Bikes.find() //.select("-_id")
        
        res.json(bikes);
    } catch (error) {
        console.log(error)
        res.status(400).json({message : "Internal Server Error"})
    }
}

export const RentBike = async(req , res)=>{
    const bike_id = req.params.id;
    const user_id = req.user._id;

    const bike =  await Bikes.findById(bike_id);
    if(!bike){
       return  res.status(404).json({message : 'Bike Not Found'})
    }
    if(!bike.Available){
       return  res.status(400).json({message : 'Bike is not Available '})
    }
    
    const rental = new Rental({
        user : user_id,
        bike : bike_id,
        startDate : new Date(),
        status : "active"
    });
   
   await  rental.save();

    await User.findByIdAndUpdate(user_id , {
        $push : {
            rental : rental._id
        }
    })

    bike.Available = false;
   await bike.save();
   let wanted = await Bikes.findById(bike_id)
  

   
    res.status(200).json({message : "Renatal Created Successfully" , rental})
}

export const ReturnBike = async (req, res) => {
  try {
    const { bikeId } = req.params; 
    const userId = req.user._id; 


    const rental = await Rental.findOne({ bike: bikeId, user: userId, status: "active" });
   
    if (!rental) {
       
      return res.status(400).json({ message: "Active rental not found for this bike." });
    }

    const bike = await Bikes.findById(bikeId);
    if (!bike) {
      return res.status(404).json({ message: "Bike not found." });
    }

   
    const startDate = rental.startDate;
    const endDate = new Date();
    const diffTime = Math.abs(endDate - startDate); // ms difference
    const rentedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms → days
    const totalPrice = rentedDays * bike.price;

  
    rental.status = "completed";
    rental.enddate = endDate;
    rental.totalPrice = totalPrice;
    await rental.save();

   
    bike.Available = true;
    await bike.save();

    res.json({
      message: "Bike returned successfully",
      totalPrice,
      rentedDays,
      bike: bike.name
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while returning bike." });
  }
};

export const ActiveRental = async(req , res)=>{
    try {
  

const user = await User.findById(req.user._id)
  .populate({
    path: "rental",
    match: { status: 'active' },
    populate: {
      path: 'bike',
      select: "name price Image"
    }
  });

if (!user || user.rental.length === 0) {
  return res.status(200).json({ activeRentals: [] });
}


user.rental.forEach((rent, idx) => {

});


res.json({
  activeRentals: user.rental
});
    } catch (error) {
        console.log("Error in Fetching the Active Rental" , error.message);
         res.status(400).json({message:"Internal Server Error"})  ;
    }

  
}

export const rentalHistory = async(req ,res)=>{
    try {
     
         const user = await  User.findById(req.user._id).populate("rental");
        // res.json({rentalHistory : user.rental})
        console.log("The Rental History is" , user.rental)
    } catch (error) {
        console.log("Erorr in rental-history" ,error)
        res.status(400).json({message : "No History"})
    }
   
}

export const getRentalDetails = async (req, res) => {
  try {
    const { bikeId } = req.params;     // coming from route /rental/:bikeId
    const userId = req.user._id;       // from logged in user (auth middleware)

    // Find rental with matching user & bike
    const rental = await Rental.findOne({
      user: userId,
      bike: bikeId,
      status : 'active',
    }).populate({
      path: "bike",
      select: "name price Image",
    });

    if (!rental) {
      return res.status(404).json({
        message: "No rental found for this user and bike.",
      });
    }
    const bike = await  Bikes.findById(bikeId)
    const startDate = rental.startDate;
    const endDate = new Date() ;
    const diffTime = Math.abs(endDate - startDate); // ms difference
    const rentedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms → days
    const totalPrice = rentedDays * bike.price;
    rentalHistory(req , res)
     
    return res.status(200).json({
      message: "Rental details fetched successfully",
      rental,
      totalPrice,
    });
  } catch (error) {
    console.error("Error fetching rental details:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};