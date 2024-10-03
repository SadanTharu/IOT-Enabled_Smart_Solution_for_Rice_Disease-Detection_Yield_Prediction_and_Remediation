import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateDisease = ({ url = "http://localhost:4000" }) => {
  const { id } = useParams(); // Get the disease ID from the URL parameters
  const navigate = useNavigate(); // For navigation
  const [diseaseData, setDiseaseData] = useState({
    diseaseName: "",
    category: "",
    severityLevel: "",
    image: null, // To store the selected image file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setDiseaseData({ ...diseaseData, image: e.target.files[0] }); // Store the selected file
    } else {
      setDiseaseData({ ...diseaseData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append only the fields that you want to update
    if (diseaseData.diseaseName) {
      formData.append("diseaseName", diseaseData.diseaseName);
    }
    if (diseaseData.category) {
      formData.append("category", diseaseData.category);
    }
    if (diseaseData.severityLevel) {
      formData.append("severityLevel", diseaseData.severityLevel);
    }
    if (diseaseData.image) {
      formData.append("image", diseaseData.image); // Append the image file
    }

    try {
      const response = await axios.put(
        `${url}/api/disease/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success("Disease updated successfully");
        navigate("/"); // Navigate back to the list page after successful update
      } else {
        toast.error("Failed to update disease");
      }
    } catch (error) {
      console.error("Error updating disease:", error);
      toast.error("Error updating data");
    }
  };

  return (
    <div className="update-disease">
      <h2>Update Disease</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Disease Name:</label>
          <input
            type="text"
            name="diseaseName"
            value={diseaseData.diseaseName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={diseaseData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Severity Level:</label>
          <input
            type="number"
            name="severityLevel"
            value={diseaseData.severityLevel}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleChange} />
          {diseaseData.image && <p>Selected file: {diseaseData.image.name}</p>}
        </div>
        <button type="submit">Update Disease</button>
      </form>
    </div>
  );
};

export default UpdateDisease;
