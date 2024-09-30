import React from "react";
import { Link } from "react-router-dom";
import "./Disease.css";

const Disease = () => {
  return (
    <div className="disease-container-main">
      <div className="diseasetopiccontainner-main">
        <h1>Disease Management</h1>
      </div>
      <div className="diseasetopiccontainner-2-main">
        <div className="disease-actions-main">
          <Link to="/adddesease" className="disease-action-main">
            <p>Add Disease</p>
          </Link>
          <Link to="/list" className="disease-action-main">
            <p>View Diseases</p>
          </Link>
          <Link to="/deseaseinfo" className="disease-action-main">
            <p>Disease Info</p>
          </Link>
          <Link to="/contactremedy" className="disease-action-main">
            <p>Contact Remedy Managemnt</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Disease;
