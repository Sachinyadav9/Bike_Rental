  import { Route, Routes } from "react-router-dom"
  import { useState } from "react";
  import { RootLayout } from "../pages/RootLayout";
  import { BikesPage } from "../pages/Bikes";
  import RentedBikeDetails from "../pages/RentedBikeDetails.jsx";
  import { BikeDetailPage } from "../pages/BikeDetails";
  import { Home } from "../pages/HomePage";
  import { Rental } from "../pages/Rental";
  import { Login } from "../pages/Login";
  import { Signup } from "../pages/Signup";
  import Navbar from "../Components/Navbar";
  import AddBikeForm from "../Components/AddBike";
  const App = () => {
    return(
  <>
  
       <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="bikes" element={<BikesPage />} />
        <Route path="getbike/:id" element={<BikeDetailPage/>}/>
        <Route path="rentals" element={<Rental />} />
        <Route path="rentals/:bikeId" element={<RentedBikeDetails />} />
      <Route path="login" element={<Login/>} />
      <Route path="signup" element={<Signup />} />
       <Route path="addbike" element={<AddBikeForm />} />
      </Route>


    </Routes>
  </>
    )

  }

  export default App