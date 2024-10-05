import React, { useState, useEffect } from "react";
import "./deseaseList.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const DeseaseList = ({ url }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate(); // For navigation

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
        toast.success("Disease item deleted successfully");
        fetchList(); // Fetch the list again after a successful delete
      } else {
        toast.error("Error deleting Disease item");
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Error deleting Disease item:", error);
    }
  };

  // Navigate to the update page
  const handleUpdate = (diseaseId) => {
    navigate(`/update/${diseaseId}`); // Navigate to the update page with the disease ID
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Disease Data</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Disease Name</b>
          <b>Category</b>
          <b>Severity Level</b>
          <b>Update</b> {/* Header for Update button */}
          <b>Delete</b> {/* Header for Delete button */}
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.diseaseName}</p>
              <p>{item.category}</p>
              <p>{item.severityLevel}</p>

              <img
                src={assets.update_icon}
                alt="update"
                className="update-button"
                onClick={() => handleUpdate(item._id)}
              />

              <img
                src={assets.delete_icon}
                alt="Delete"
                className="delete-icon"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this item?')) {
                    removeDesease(item._id); // Call the delete function if confirmed
                  }
                }}
              />
            </div>
          ))
        ) : (
          <p>No disease data available.</p>
        )}
      </div>
    </div>
  );
};

export default DeseaseList;
