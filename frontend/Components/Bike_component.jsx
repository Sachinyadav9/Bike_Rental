

import React from "react";
import { useNavigate } from "react-router-dom";
import { Ban } from 'lucide-react';

export const Bike = ({ bike}) => {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col relative">
     
      {!bike.Available && (<Ban className="  absolute top-0.5 right-0.5 text-red-500 hover:bg-red-600 "/>)} 
      <img
        src={bike.Image[0]}
        alt={bike.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

     
     
      <h3 className="text-xl font-semibold text-gray-800">{bike.name}</h3>
  

      
      <p className="text-lg  text-green-600 mt-2">$ {bike.price}/day </p>

   
      <div className="mt-auto flex gap-3 pt-4">
        <button
          onClick={() => navigate(`/getbike/${bike._id}`)}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Book
        </button>
        <button
          onClick={() => navigate(`/getbike/${bike._id}`)}
          className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};


