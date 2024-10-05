import React from "react";
import { Link } from "react-router-dom";
import "./Disease.css";
import { assets } from "../../assets/assets";

const Disease = () => {
  return (
    <div className="disease-container-main">
      <div className="diseasetopiccontainner-main">
        <h1>Disease Management</h1>
      </div>
      <div className="diseasetopiccontainner-2-main">
        <div className="disease-actions-main">
          <Link to="/adddesease" className="disease-action-main">
            <img src={assets.addDisease} alt="" />

            <p>Add New Disease</p>
          </Link>
          <Link to="/list" className="disease-action-main">
            <img src={assets.viewAdded} alt="" />

            <p>View Added Diseases</p>
          </Link>
          <Link to="/deseaseinfo" className="disease-action-main">
            <img src={assets.newDiscovered} alt="" />

            <p>Newly Discovered</p>
          </Link>
          <Link to="/contactremedy" className="disease-action-main">
            <img src={assets.remedy} alt="" />

            <p>Remedy Managemnt</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Disease;
