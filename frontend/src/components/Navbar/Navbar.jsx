import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";


const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const {token,setToken} = useContext(StoreContext);
    
    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/")
    }

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#prediction"
          onClick={() => setMenu("prediction")}
          className={menu === "prediction" ? "active" : ""}
        >
          Prediction
        </a>
        <a
          href="#diseases"
          onClick={() => setMenu("diseases")}
          className={menu === "diseases" ? "active" : ""}
        >
          Diseases
        </a>
        <Link to="/Remedies" onClick={() => setMenu("remedies")} className={menu === "remedies" ? "active" : ""} >Remedies</Link>
        
        <Link to="/Inquirie" onClick={() => setMenu("inquiries")} className={menu === "inquiries" ? "active" : ""} >Inquiries</Link>
        <a
          href="#contact-us"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
         :  <div className="navbar-profile">
              <img src={assets.logout_icon} alt=""  onClick={logout}/>
              <p>Logout</p>
           </div> 
          }
    </div>
  );
};

export default Navbar;
