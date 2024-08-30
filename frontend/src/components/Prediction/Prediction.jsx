import React , { useState } from 'react'
import "./Prediction.css";
import axios from 'axios'
import { toast } from 'react-toastify'

const Prediction = () => {
  const url = "http://localhost:4000"

  const [data, setData] = useState({
    cropType: "paddy",
    location: "",
    fieldSize: "",
    plantingDate: "",
    disease: "",
    diseaseSpreadSize: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    try {
      // Send data as JSON rather than FormData
      const response = await axios.post(`${url}/api/prediction/add`, data);
      
      if (response.data.success) {
        setData({
          cropType: "paddy",
          location: "",
          fieldSize: "",
          plantingDate: "",
          disease: "",
          diseaseSpreadSize: "",
        });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the data. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className='prediction' id='prediction'>
      <h1>Yield Prediction</h1>
      <p id ='underconstruction'>"ML part" We're currently working on this section and it will be available soon. Thank you for your patience!</p>
      <div className="formcss">
      <form className="flex-col"  onSubmit={onSubmitHandler}>
        <div className="formside">
          <div className="add-type flex-col">
            <p>Crop Type</p>
            <select onChange={onChangeHandler} name="cropType" value={data.cropType} required >
              <option value="paddy">Paddy</option>
              <option value="tea">Tea</option>
              <option value="coconut">Coconut</option>
              <option value="rubber">Rubber</option>
              <option value="riceBlast">Rice Blast</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="add-location flex-col">
            <p>Location</p>
            <input onChange={onChangeHandler} value={data.location} type="text" name="location" placeholder="Enter Location Name Here" required />
          </div>
          <div className="add-size flex-col">
            <p>Field Size</p>
            <input onChange={onChangeHandler} value={data.fieldSize} type="number" name="fieldSize" placeholder="Hectare" required />
          </div>
        </div>
        <div className="formside">
          <div className="add-date flex-col">
              <p>Planting Date</p>
              <input onChange={onChangeHandler} value={data.plantingDate} type="date" name="plantingDate" placeholder="Enter Planting Date" required />
            </div>
          <div className="add-disease flex-col">
            <p>Disease</p>
            <input onChange={onChangeHandler} value={data.disease} type="text" name="disease" placeholder="Enter Disease Name Here"/>
          </div>
          <div className="add-size flex-col">
            <p>Disease Spread Size</p>
            <input onChange={onChangeHandler} value={data.diseaseSpreadSize} type="number" name="diseaseSpreadSize" placeholder="Hectare"/>
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add Data to System
        </button>
      </form>
      </div>
    </div>
  )
}

export default Prediction
