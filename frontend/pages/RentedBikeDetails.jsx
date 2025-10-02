import { useParams } from "react-router-dom";
import axiosInstance from "../axios/axios.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export  default function RentedBikeDetails( )  {
  
  const { bikeId } = useParams();
  const navigate = useNavigate();
  const [Price , setPrice] = useState()
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const res = await axiosInstance.get(`bikes/rental/${bikeId}`, {
          withCredentials: true,
        });
        console.log("This is the RenalBikeDetails",res.data.totalPrice)
        setRental(res.data.rental);
        setPrice(res.data.totalPrice)
      } catch (error) {
        console.error("Error fetching rental details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRental();
  }, [bikeId]);

  const handleReturn = async () => {
    try {
     const res =  await axiosInstance.put(`bikes/return/${bikeId}`, {}, { withCredentials: true });
        console.log(res)
      alert("Bike returned successfully!");
      navigate("/rentals");
    } catch (error) {
      console.error("Error returning bike:", error);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!rental) return <div className="text-center py-10">No rental found</div>;

  const { bike, startDate, status, totalPrice } = rental;
  console.log("This is the rental bike details" , rental)
  const rentalDays = Math.ceil((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24));
  const amountDue = Price
  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4">
          {bike.Image && bike.Image.length > 0 ? (
            <img
              src={bike.Image[0]}
              alt={bike.name}
              className="rounded-xl w-full object-cover h-72"
            />
          ) : (
            <div className="text-gray-500">No Image Available</div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between p-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{bike.name}</h2>
            <p className="text-lg text-gray-600">₹{bike.price} / day</p>

            <div className="mt-4 space-y-2">
              <p><span className="font-semibold">Start Date:</span> {new Date(startDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">Status:</span> <span className="capitalize">{status}</span></p>
              <p><span className="font-semibold">Rental Days:</span> {rentalDays} days</p>
             <p><span className="font-semibold">Total Amount:</span> ₹{amountDue}</p>
            </div>
          </div>

          {/* Return Button */}
          {status === "active" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReturn}
              className="mt-6 bg-red-600 text-white py-2 px-4 rounded-xl shadow hover:bg-red-700 transition"
            >
              Return Bike
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};


