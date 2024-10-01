import React, { useState } from "react";
import "./AddDesease.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddDesease = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    diseaseName: "",
    symptoms: "",
    severityLevel: 5, // Set default value to 5 for the slider
    category: "bacterial blind",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSeverityChange = (event) => {
    setData((prevData) => ({ ...prevData, severityLevel: event.target.value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("diseaseName", data.diseaseName);
    formData.append("symptoms", data.symptoms);
    formData.append("severityLevel", Number(data.severityLevel));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/disease/add`, formData);
    if (response.data.success) {
      setData({
        diseaseName: "",
        symptoms: "",
        severityLevel: 5, // Reset to default value
        category: "bacterial blind",
      });

      setImage(null);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Affected Area's Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Uploaded preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            name="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Enter Disease Name</p>
          <input
            onChange={onChangeHandler}
            value={data.diseaseName}
            type="text"
            name="diseaseName"
            placeholder="enter disease name here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Predicted Symptoms of Disease</p>
          <textarea
            onChange={onChangeHandler}
            value={data.symptoms}
            name="symptoms"
            rows="6"
            placeholder="Write Predicted Symptoms of Disease"
            required
          />
        </div>

        <div className="add-category flex-col">
          <p>Disease Category</p>
          <div className="custom-select-wrapper">
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
              className="custom-select"
              required
            >
              <option value="BacterialBlind">Bacterial Blind</option>
              <option value="bacterialLeafSteak">Bacterial Leaf Steak</option>
              <option value="brownSpot">Brown Spot</option>
              <option value="raggedStunt">Ragged Stunt</option>
              <option value="riceBlast">Rice Blast</option>
              <option value="tungro">Tungro</option>
            </select>
          </div>
        </div>

        <div className="add-severity-level flex-col">
          <p>Severity Level of the Disease (1 to 10)</p>
          <input
            type="range"
            min="1"
            max="10"
            value={data.severityLevel}
            onChange={onSeverityChange}
            name="severityLevel"
            className="slider"
          />
          <p>Selected Severity Level: {data.severityLevel}</p>
        </div>

        <button type="submit" className="add-btn">
          Add Data to System
        </button>
      </form>
    </div>
  );
};

export default AddDesease;
