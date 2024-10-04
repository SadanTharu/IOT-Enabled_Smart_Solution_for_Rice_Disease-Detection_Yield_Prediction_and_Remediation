import React from 'react';
import { ToastContainer } from 'react-toastify'; // Added import for ToastContainer
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Disease from './pages/Disease/Disease';
import Remedies from './pages/Treat/TreatmentDashboard';
import User from './pages/User/User';
import Prediction from './pages/Prediction/Prediction';
import AddDesease from "./pages/AddDesease/AddDesease";
import DeseaseList from "./pages/deseaseList/deseaseList";
import AddNewRemedies from './pages/Treat/AddNewRemedies';
import RemedyList from './pages/Treat/RemedyList';
import RemedyDetail from './pages/Treat/RemedyDetail';
import EditRemedy from './pages/Treat/EditRemedy';
import RemedyReport from './pages/Treat/RemedyReport';
import ContctRemedyManagement from "./pages/ContctRemedyManagement/ContactRemedyManagement";
import ViewDiseaseInquiry from "./pages/ViewDiseaseInquiry/ViewDiseaseInquiry";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/disease" element={<Disease url={url} />} />
          <Route path="/adddesease" element={<AddDesease url={url} />} />
          <Route path="/list" element={<DeseaseList url={url} />} />
          <Route path="/remedies" element={<Remedies url={url} />} />
          <Route path="/AddNewRemedies" element={<AddNewRemedies url={url} />} />
          <Route path="/RemedyList" element={<RemedyList url={url} />} />
          <Route path="/remedy/:id" element={<RemedyDetail url={url} />} />
          <Route path="/edit-remedy/:id" element={<EditRemedy url={url} />} />
          <Route path="/RemedyReport" element={<RemedyReport url={url} />} />
          <Route path="/user" element={<User />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route
            path="/deseaseinfo"
            element={<ViewDiseaseInquiry url={url} />}
          />
          <Route
            path="/contactremedy"
            element={<ContctRemedyManagement url={url} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
