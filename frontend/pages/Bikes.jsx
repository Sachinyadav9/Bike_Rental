
import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { Bike } from "../Components/Bike_component";
import { Search } from "lucide-react";

export const BikesPage = () => {
  const [bikes, setBikes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bikes from backend
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await axiosInstance.get("/bikes/getallbikes");
        console.log(res.data)
        setBikes(res.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bikes:", err);
        setLoading(false);
      }
    };
    fetchBikes();
  }, []);

  // Filter bikes by search
  useEffect(() => {
    const filtered = bikes.filter((bike) =>
      bike.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBikes(filtered);
  }, [search, bikes]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Loading Bikes...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-5 bg-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">
          All Bikes
        </h1>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search bikes..."
            className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Bikes Grid */}
      {filteredBikes.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No bikes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBikes.map((bike, idx) => (
            <div
              key={bike._id || idx}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <Bike bike={bike} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination / Load More Placeholder */}
      {/* <div className="flex justify-center mt-8">
        <button className="px-6 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-400 transition">
          Load More
        </button>
      </div> */}
    </div>
  );
};
