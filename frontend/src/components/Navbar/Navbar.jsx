import React, {  useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import {Link, useNavigate} from 'react-router-dom';
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";


const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");
    const navigate = useNavigate();
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
    
    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/")
    }
    

  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={()=> setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href="#Prediction" onClick={()=> setMenu("prediction")} className={menu==="menu"?"active":""}>Yield Prediction</a>
        <a href="#app-download" onClick={()=> setMenu("disease")} className={menu==="mobile-app"?"active":""}>Disease Detection</a>
        <a href="#app-download" onClick={()=> setMenu("treatment")} className={menu==="mobile-app"?"active":""}>Treatment Options</a>
        <a href="#enquiry" onClick={()=> setMenu("enquiry")} className={menu==="enquiry"?"active":""}>Enquiry</a>
        <a href="#footer" onClick={()=> setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
        
       
      </ul>

      <div className="navbar-right">
        <div className="navbar-profile">
          <img src={assets.profile_icon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
