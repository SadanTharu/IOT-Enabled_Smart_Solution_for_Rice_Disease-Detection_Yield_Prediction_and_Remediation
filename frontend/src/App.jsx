import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom"; // Ensure Route is imported
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Remedies from "./pages/Remedies/RemedyListView";
import RemedyDetailView from './pages/Remedies/RemedyDetailView'
import LoginPopup from './components/LoginPopup/LoginPopup';
import Profile from './components/User Profile/profile'
import Inquery from './pages/InquiryHome/InquiryHome'
import DiseaseInquiry from './pages/DiseaseInquiry/DiseaseInquiry'
import OtherInquiry from './pages/OtherInquiry/OtherInquiry'
import ViewDiseaseInquiry from './pages/DiseaseInquiry/ViewDiseaseInquiry'

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  const url = "http://localhost:4000"

  return (
    <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Remedies" element={<Remedies />} />
          <Route path="/remedy-detail-view/:id" element={<RemedyDetailView url={url} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/Inquirie" element={<Inquery />} />
          <Route path="/diseaseInquiry" element={<DiseaseInquiry />} />
          <Route path="/otherInquiry" element={<OtherInquiry />} />
          <Route path='/viewDiseaseInquiry' element={<ViewDiseaseInquiry/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
