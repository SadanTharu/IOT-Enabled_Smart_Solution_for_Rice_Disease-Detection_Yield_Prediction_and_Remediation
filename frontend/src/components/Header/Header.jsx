import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>These Are Common Diseases Divcovered By Our Experties</h2>
        <p>
          Rice diseases are significant challenges in agriculture, affecting
          rice yield and quality worldwide. They are caused by various
          pathogens, including fungi, bacteria, viruses, and nematodes, leading
          to symptoms like leaf spots, blights, and stunted growth.
        </p>
        <button>View Deseases</button>
      </div>
    </div>
  );
};

export default Header;
