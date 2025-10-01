import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../Components/zustand";
import Navbar from "../Components/Navbar";

export const RootLayout = () => {
 
  const checkAuth = useAuth((state)=> state.checkAuth)

  const [authenticated, setAuthenticated] = useState(null); // null = loading
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthed = async () => {
      try {
        const res = await checkAuth();

        console.log("The res is " , res.data)

        if (res?.data?.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          // navigate("/login", { state: { from: location }, replace: true });
        }
      } catch (err) {
        setAuthenticated(false);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    checkAuthed();
  }, [checkAuth]); // ✅ dependencies
  



  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};
