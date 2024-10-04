import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/dashboard" className="sidebar-option">
          <img src={assets.dashboard_icon} alt="" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/disease" className="sidebar-option">
          <img src={assets.disease_icon} alt="" />
          <p>Disease Management</p>
        </NavLink>
        <NavLink to='/remedies' className="sidebar-option">
          <img src={assets.treat_icon} alt="" />
          <p>Remedy Management</p>
        </NavLink>
        <NavLink to="/Inquiries" className="sidebar-option">
          <img src={assets.user_icon} alt="" />
          <p>Inquiry Management</p>
        </NavLink>
        <NavLink to="/prediction" className="sidebar-option">
          <img src={assets.prediction_icon} alt="" />
          <p>Prediction Management</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
