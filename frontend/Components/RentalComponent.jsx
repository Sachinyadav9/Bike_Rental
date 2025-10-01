// RentalComponent.jsx
import { useState } from "react";
import axiosInstance from "../axios/axios";
import { useNavigate } from "react-router-dom";

export const RentalComponent = ({ bike }) => {
const navigate = useNavigate();
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRent = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/rentals/rentbike", {
        bikeId: bike._id,
        days,
      }, { withCredentials: true });

      setMessage("Bike rented successfully!");
      setLoading(false);
     
    } catch (error) {
      console.log(error);
      setMessage(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const totalPrice = bike.price * days;

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <img
        src={bike.Image[0]?.path || "/placeholder.jpg"}
        alt={bike.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{bike.name}</h2>
      <p className="text-gray-600 mb-2">Price per day: ₹{bike.price}</p>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Days:</label>
        <input
          type="number"
          min={1}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="border rounded px-2 py-1 w-20"
        />
      </div>

      <p className="mb-4 font-semibold">Total: ₹{totalPrice}</p>

      <button
        onClick={handleRent}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Renting..." : "Rent Bike"}
      </button>

      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
};
