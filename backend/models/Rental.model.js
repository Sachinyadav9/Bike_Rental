import mongoose from "mongoose";

const RentalSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    bike : {type : mongoose.Schema.Types.ObjectId , ref : "Bikes"},
    startDate : {type : Date , default : Date.now()},
    enddate : {type : Date},
    totalPrice : {type : Number},
    status : {type : String , enum :["active" , "completed"] , default : "active"}
});

export const Rental = mongoose.model("Rental" , RentalSchema);
