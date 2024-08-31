import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom"; // Ensure Route is imported
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Remedies from "./pages/Remedies/RemedyListView";
import RemedyDetailView from './pages/Remedies/RemedyDetailView'

const App = () => {

  const url = "http://localhost:4000"

  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Remedies" element={<Remedies />} />
          <Route path="/remedy-detail-view/:id" element={<RemedyDetailView url={url} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
