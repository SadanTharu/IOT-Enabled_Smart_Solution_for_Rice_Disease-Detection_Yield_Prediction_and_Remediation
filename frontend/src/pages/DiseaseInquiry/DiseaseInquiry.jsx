import React, { useState } from 'react';
import axios from 'axios';
import './DiseaseInquiry.css'


const DiseaseInquiry = () => {
  const [formData, setFormData] = useState({
    farmerName: '',
    email: '',
    phone: '',
    inquiryDate: '',
    location: '',
    inquiryTopic: '',
    symptoms: '',
    area: '',
    priorityLevel: '',
    images: null
  });

  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await axios.post("http://localhost:4000/api/diseaseInquiry/add", form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setNotification({ message: 'Disease Inquiry Added Successfully', type: 'success' });
        setFormData({
          farmerName: '',
          email: '',
          phone: '',
          inquiryDate: '',
          location: '',
          inquiryTopic: '',
          symptoms: '',
          area: '',
          priorityLevel: '',
          images: null
        });
      } else {
        setNotification({ message: 'Error adding Disease Inquiry', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Error adding Disease Inquiry', type: 'error' });
    }
  };

  return (
    <div className="form-container">
      <h2>Add Disease Inquiry</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="farmerName">Farmer Name:</label></td>
              <td><input type="text" name="farmerName" placeholder="Farmer Name" value={formData.farmerName} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="email">Email:</label></td>
              <td><input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="phone">Phone Number:</label></td>
              <td><input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="inquiryDate">Inquiry Date:</label></td>
              <td><input type="date" name="inquiryDate" placeholder="Inquiry Date" value={formData.inquiryDate} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="location">Location:</label></td>
              <td>
                <select name="location" value={formData.location} onChange={handleChange} required>
                  <option value="">Select Location</option>
                  <option value="Western">Western</option>
                  <option value="Central">Central</option>
                  <option value="Southern">Southern</option>
                  <option value="Northern">Northern</option>
                  <option value="Eastern">Eastern</option>
                  <option value="North Western">North Western</option>
                  <option value="North Central">North Central</option>
                  <option value="Uva">Uva</option>
                  <option value="Sabaragamuwa">Sabaragamuwa</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="inquiryTopic">Inquiry Topic:</label></td>
              <td><input type="text" name="inquiryTopic" placeholder="Inquiry Topic" value={formData.inquiryTopic} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="symptoms">Symptoms:</label></td>
              <td><textarea
                name="symptoms"
                placeholder="Symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                required
              /></td>
            </tr>
            <tr>
              <td><label htmlFor="area">Area:</label></td>
              <td><input type="number" name="area" placeholder="Area" value={formData.area} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="priorityLevel">Priority Level:</label></td>
              <td>
                <select name="priorityLevel" value={formData.priorityLevel} onChange={handleChange} required>
                  <option value="">Select Priority Level</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="images">Images:</label></td>
              <td><input type="file" name="images" onChange={handleChange} accept="image/*" required /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit Inquiry</button>
      </form>
      {notification && <p className={`notification ${notification.type}`}>{notification.message}</p>}
    </div>
  );
};

export default DiseaseInquiry;
