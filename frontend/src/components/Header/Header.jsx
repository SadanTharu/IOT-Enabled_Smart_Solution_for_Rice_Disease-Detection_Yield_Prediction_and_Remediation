import React, { useState, useEffect } from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Header = () => {

  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const {token,setToken} = useContext(StoreContext);

  return (
    <div className="header1">
      <div className="header-contents1">
        <h2>These Are Common Diseases Divcovered By Our Experties</h2>
        <p>
          Rice diseases are significant challenges in agriculture, affecting
          rice yield and quality worldwide. They are caused by various
          pathogens, including fungi, bacteria, viruses, and nematodes, leading
          to symptoms like leaf spots, blights, and stunted growth.
        </p>
        <button><a href="#diseases" onClick={() => setMenu("diseases")} className={menu === "diseases" ? "active" : ""}> Diseases </a></button>
      </div>
    </div>
  );
};

export default Header;
