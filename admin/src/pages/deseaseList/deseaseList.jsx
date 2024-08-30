import React, { useState, useEffect } from "react";
import "./deseaseList.css";
import axios from "axios";
import { toast } from "react-toastify";

const DeseaseList = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/disease/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Error fetching data:", error);
    }
  };

  const removeDesease = async (DeseaseId) => {
    try {
      const response = await axios.post(`${url}/api/disease/remove`, {
        id: DeseaseId,
      });
      if (response.data.success) {
        toast.success("desease item deleted successfully");
        fetchList(); // Fetch the list again after a successful delete
      } else {
        toast.error("Error deleting Desease item");
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Error deleting Desease item:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Desease Data</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>diseaseName</b>
          <b>Category</b>
          <b>severityLevel</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.diseaseName}</p>
              <p>{item.category}</p>
              <p>{item.severityLevel}</p>
              <p onClick={() => removeDesease(item._id)} className="cursor">
                X
              </p>
            </div>
          ))
        ) : (
          <p>No desease data available.</p>
        )}
      </div>
    </div>
  );
};

export default DeseaseList;
