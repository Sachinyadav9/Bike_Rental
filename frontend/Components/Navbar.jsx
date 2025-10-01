import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bike } from "lucide-react";
import useAuth from "./zustand";

const Navbar = () => {
const user = useAuth((state) => state.user);
const admin = useAuth((state) => state.admin);
const logout = useAuth((state) => state.logout);


  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white text-black shadow-lg w-full">
      {console.log("I aM the Navbar")}
      <div className="flex items-center gap-2">
        <Bike
          size={40}
          color="#bba5a5"
          strokeWidth={2}
          absoluteStrokeWidth
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer"
        />
        <span className="font-bold text-2xl hover:cursor-pointer" onClick={()=> navigate("/") }>
          Bike<span className="text-amber-700">Rental</span>
        </span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-6 text-black uppercase font-bold">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/bikes"
          className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
        >
          Bikes
        </NavLink>
        <NavLink
          to="/rentals"
          className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
        >
          Rentals
        </NavLink>
        {admin  && (
          <NavLink
            to="/addbike"
            className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
          >
            Add Bikes
          </NavLink>
        )}
      </div>

      {/* Auth Section */}
      <div>
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-3 py-2 mx-5 bg-white text-black rounded-lg hover:bg-black hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-2 bg-transparent text-shadow-white hover:bg-black hover:text-white rounded"
            >
              Signup
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <span className="font-medium">👤 {(admin)? 'Admin' : "User"}</span>
            <button
              onClick={() => logout()}
              className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-400"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
