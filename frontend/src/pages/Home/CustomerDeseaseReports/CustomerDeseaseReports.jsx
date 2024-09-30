import React, { useContext } from "react";
import "./CustomerDeseaseReports.css";
import { StoreContext } from "../../../context/StoreContext";

const CustomerDeseaseReports = () => {
  const { disease_report, disease_list, removeFromDeseaseList } =
    useContext(StoreContext);
  return (
    <div className="deseaseReport">
      <div className="desease-items">
        <div className="desease-items-title">
          <p>Desease</p>
          <p>Region</p>
          <p>Severatity scale</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {disease_list.map((item, index) => {
          if (disease_report[item._id] > 0) {
            return (
              <div className="desease-items-title desease-items-title">
                <p>{item.name}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default CustomerDeseaseReports;
