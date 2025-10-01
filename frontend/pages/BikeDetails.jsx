import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios";

export const BikeDetailPage = () => {
  const { id } = useParams(); // bike id from route
  const navigate = useNavigate();

  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  const fetchBike = async () => {
      try {
        console.log(id)
        const res = await axiosInstance.get(`/bikes/getbike/${id}`);
        console.log(res)
        setBike(res.data);
        setActiveImage(res.data.Image[0]); 
        console.log("The Image in the bike detail" , res.data.Image)// first image as default
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
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col md:flex-row gap-10">
      {/* Left: Images */}
      <div className="flex flex-col md:w-1/2 items-center">
        <div className="w-full h-96 bg-white rounded-lg shadow flex justify-center items-center">
          {activeImage ? (
            <img
              src={activeImage}
              alt={bike.name}
              className="h-full object-contain"
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
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                activeImage === img
                  ? "border-orange-500"
                  : "border-transparent"
              }`}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{bike.name}</h1>
        <p className="text-2xl text-orange-600 font-semibold mb-6">
          ₹{bike.price} / day
        </p>
        <p
          className={`text-lg font-medium mb-6 ${
            bike.Available ? "text-green-600" : "text-red-600"
          }`}
        >
          {bike.Available ? "Available for Rent" : "Currently Unavailable"}
        </p>

        {/* Rent Button */}
        <button
          disabled={!bike.Available}
          onClick={ async () => {
          const res =  await axiosInstance.post(`/bikes/rental/${bike._id}`)
            console.log(res.data.message);
            fetchBike()
            

          }
        
        }
          className={`px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition ${
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
          className="mt-4 text-gray-600 underline hover:text-gray-800"
        >
          ← Back to Bikes
        </button>
      </div>
    </div>
  );
};
