// pages/ActiveRentals.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios.js";
import BikeCard from "../Components/RentedBikeCard.jsx";

export function Rental() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await axiosInstance.get("bikes/active-rentals", {
          withCredentials: true,
        });
        setRentals(res.data.activeRentals || []);
      } catch (err) {
        console.error("Error fetching rentals", err);
      }
    };
    fetchRentals();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Active Rentals</h1>
      {rentals.length === 0 ? (
        <p>No active rentals yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rentals.map((rental) => (
            <BikeCard key={rental._id} rental={rental} />
          ))}
        </div>
      )}
    </div>
  );
}
