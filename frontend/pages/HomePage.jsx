import React, { useEffect, useState } from "react";
import { Bike } from "lucide-react";
import axiosInstance from "../axios/axios";
import { Link } from "react-router-dom";
import useAuth from "../Components/zustand";

export const Home = () => {
  const user = useAuth((state)=> state.user)
   const [Bikes, setBikes] = useState([])


  
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await axiosInstance.get("/bikes/getallbikes");
       
        setBikes(res.data || []);
       
      } catch (err) {
        console.error("Error fetching bikes:", err);
       
      }
    };
    fetchBikes();
  }, []);

  return (
    <div className="w-full h-full overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-400 to-orange-500 h-screen flex items-center justify-center text-center text-white">
        <div className="px-5">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 drop-shadow-lg">
            Ride Your Freedom
          </h1>
          <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
            Explore the city with our premium bikes. Fast, safe, and convenient rentals for everyone.
          </p>
          <Link 
            to="/bikes" 
            className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            View Bikes
          </Link>
        </div>
      </section>

      {/* Featured Bikes Section */}
      <section className="py-16 bg-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Featured Bikes</h2>
          <p className="text-gray-600 mt-2">Choose from our most popular bikes</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5">
          {Bikes.map((bike, idx) =>
          (
            <div key={idx} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300">
              <img 
                src={bike.Image[0]}
                 
                alt="bike" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800"> {bike.name}</h3>
                <p className="text-lg  text-green-600 mt-2">$ {bike.price}/ day</p>
                <Link 
                  to="/bikes" 
                  className="mt-3 inline-block text-orange-500 font-bold hover:underline"
                >
                  Rent Now
                </Link>
              </div>
            </div>
          )
        
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Why Choose Us?</h2>
          <p className="text-gray-600 mt-2">We make your ride easy and fun</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
            <Bike size={40} className="mx-auto text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-center">Variety of Bikes</h3>
            <p className="text-gray-600 text-center">Choose from a wide range of bikes for all types of riders.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
            <Bike size={40} className="mx-auto text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-center">Affordable Prices</h3>
            <p className="text-gray-600 text-center">Flexible rental plans that fit your budget and needs.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
            <Bike size={40} className="mx-auto text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-center">Easy Booking</h3>
            <p className="text-gray-600 text-center">Book your bike online in just a few clicks, anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
    
      <section className="py-16 bg-orange-500 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Ride?</h2>
       {!user &&
        <>
        <p className="mb-8">Sign up today and start your journey with us!</p>
        <Link 
          to="/signup" 
          className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Get Started
        </Link> 
        </>
       }
      </section>
     

    </div>
  );
};

