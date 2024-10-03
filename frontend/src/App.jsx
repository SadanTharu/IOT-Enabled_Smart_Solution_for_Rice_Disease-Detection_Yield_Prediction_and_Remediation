import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom"; // Ensure Route is imported
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import CustomerDeseaseReports from "./pages/Home/CustomerDeseaseReports/CustomerDeseaseReports";
import LoginPopup from './components/LoginPopup/LoginPopup';
import Profile from './components/User Profile/profile'

const App = () => {
  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<CustomerDeseaseReports />} />
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
