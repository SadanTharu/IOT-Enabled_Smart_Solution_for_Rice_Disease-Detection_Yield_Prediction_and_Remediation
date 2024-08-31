import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""} >
          Home
        </Link>
        <a href="#prediction" onClick={()=> setMenu("prediction")} className={menu==="prediction"?"active":""}>Prediction</a>
        <a href="#diseases" onClick={()=> setMenu("diseases")} className={menu==="diseases"?"active":""}>Diseases</a>
        <Link to="/Remedies" onClick={() => setMenu("remedies")} className={menu === "remedies" ? "active" : ""} >Remedies</Link>
        <a href="#contact-us" onClick={()=> setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>

      </ul>
      <button>Sign In</button>
    </div>
  );
};

export default Navbar;
