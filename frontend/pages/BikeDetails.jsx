import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios";

export const BikeDetailPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  const fetchBike = async () => {
    try {
      const res = await axiosInstance.get(`/bikes/getbike/${id}`);
      setBike(res.data);
      setActiveImage(res.data.Image[0]);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bike:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBike();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Loading Bike Details...
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        Bike not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100 flex flex-col md:flex-row gap-8 md:gap-12">
      
      {/* Left: Images */}
      <div className="flex flex-col md:w-1/2 items-center w-full">
        <div className="w-full md:h-[400px] h-80 bg-white rounded-xl shadow-md flex justify-center items-center overflow-hidden">
          {activeImage ? (
            <img
              src={activeImage}
              alt={bike.name}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <p className="text-gray-500">No Image Available</p>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-4 flex-wrap justify-center">
          {bike.Image?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer border-2 transition-transform duration-200 ${
                activeImage === img
                  ? "border-orange-500 scale-105"
                  : "border-transparent hover:scale-105"
              }`}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="md:w-1/2 flex flex-col justify-center w-full space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{bike.name}</h1>
        <p className="text-xl md:text-2xl text-orange-600 font-semibold">
          ₹{bike.price} / day
        </p>
        <p
          className={`text-lg md:text-xl font-medium ${
            bike.Available ? "text-green-600" : "text-red-600"
          }`}
        >
          {bike.Available ? "Available for Rent" : "Currently Unavailable"}
        </p>

        {/* Rent Button */}
        <button
          disabled={!bike.Available}
          onClick={async () => {
            try {
              const res = await axiosInstance.post(`/bikes/rental/${bike._id}`);
              console.log(res.data.message);
              fetchBike();
            } catch (err) {
              console.error(err);
            }
          }}
          className={`px-6 md:px-8 py-2 md:py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-200 ${
            bike.Available
              ? "bg-orange-500 hover:bg-orange-400 text-white"
              : "bg-gray-400 cursor-not-allowed text-white"
          }`}
        >
          {bike.Available ? "Rent Now" : "Unavailable"}
        </button>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 underline hover:text-gray-800 self-start mt-2 md:mt-4"
        >
          ← Back to Bikes
        </button>
      </div>
    </div>
  );
};
