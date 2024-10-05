import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./UpdateDisease.css"; // Import the CSS file

const UpdateDisease = ({ url = "http://localhost:4000" }) => {
  const { id } = useParams(); // Get the disease ID from the URL parameters
  const navigate = useNavigate(); // For navigation
  const [diseaseData, setDiseaseData] = useState({
    diseaseName: "",
    category: "", // Initialize category
    severityLevel: 1, // Set initial severity level to 1
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

  const handleSliderChange = (e) => {
    setDiseaseData({ ...diseaseData, severityLevel: e.target.value });
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
        navigate("/list"); // Navigate back to the list page after successful update
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
          <label>Disease Category:</label>
          <select
            name="category"
            value={diseaseData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="BacterialBlind">Bacterial Blind</option>
            <option value="bacterialLeafSteak">Bacterial Leaf Steak</option>
            <option value="brownSpot">Brown Spot</option>
            <option value="raggedStunt">Ragged Stunt</option>
            <option value="riceBlast">Rice Blast</option>
            <option value="tungro">Tungro</option>
          </select>
        </div>
        <div>
          <label>Severity Level:</label>
          <input
            type="range"
            name="severityLevel"
            min="1"
            max="10"
            value={diseaseData.severityLevel}
            onChange={handleSliderChange}
            className="severity-slider"
          />
          <p>Current Severity Level: {diseaseData.severityLevel}</p>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleChange} />
          {diseaseData.image && (
            <p className="image-preview">
              Selected file: {diseaseData.image.name}
            </p>
          )}
        </div>
        <button type="submit">Update Disease</button>
      </form>
    </div>
  );
};

export default UpdateDisease;
