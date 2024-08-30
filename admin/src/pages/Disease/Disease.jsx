import React from 'react'
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
          <div className="disease-action-main">
            <Link to="/list" className="disease-action-main">
              <p>View Diseases</p>
            </Link>
          </div>
          <div className="disease-action-main">
            <p>Update Disease</p>
          </div>
          <div className="disease-action-main">
            <p>Delete Disease</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Disease
