import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bike, Menu, X } from "lucide-react";
import useAuth from "./zustand";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAuth((state) => state.user);
  const admin = useAuth((state) => state.admin);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Bike
            size={40}
            color="#bba5a5"
            strokeWidth={2}
            absoluteStrokeWidth
            onClick={() => navigate("/")}
            className="cursor-pointer"
          />
          <span
            className="font-bold text-2xl hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            Bike<span className="text-amber-700">Rental</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 uppercase font-bold text-black">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Home</NavLink>
          <NavLink to="/bikes" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Bikes</NavLink>
          <NavLink to="/rentals" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Rentals</NavLink>
          {admin && <NavLink to="/addbike" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Add Bikes</NavLink>}
        </div>

        {/* Auth Section Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-3 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white"
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
              <span className="font-medium">👤 {admin ? "Admin" : "User"}</span>
              <button
                onClick={() => logout()}
                className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow-md">
          <NavLink to="/" onClick={toggleMenu} className="block">Home</NavLink>
          <NavLink to="/bikes" onClick={toggleMenu} className="block">Bikes</NavLink>
          <NavLink to="/rentals" onClick={toggleMenu} className="block">Rentals</NavLink>
          {admin && <NavLink to="/addbike" onClick={toggleMenu} className="block">Add Bikes</NavLink>}

          {!user ? (
            <>
              <Link to="/login" onClick={toggleMenu} className="block px-3 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white">Login</Link>
              <Link to="/signup" onClick={toggleMenu} className="block px-3 py-2 bg-transparent hover:bg-black hover:text-white rounded">Signup</Link>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="font-medium">👤 {admin ? "Admin" : "User"}</span>
              <button
                onClick={() => { logout(); toggleMenu(); }}
                className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
