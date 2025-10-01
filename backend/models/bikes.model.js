import mongoose from "mongoose";
const bikeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required :true
    },
   Available : {
        type : Boolean,
        default :  true
    },
    Image :[String]
},{timestamps : true})

const Bikes = mongoose.model('Bikes' , bikeSchema);
export default Bikes