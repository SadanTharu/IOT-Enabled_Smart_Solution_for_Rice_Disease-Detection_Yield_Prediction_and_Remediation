import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewDiseaseInquiry.css"; // Import the CSS file

const ViewDiseaseInquiry = ({ url }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list of disease inquiries
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(`${url}/api/diseaseInquiry/list`);
        setInquiries(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the inquiries:", error);
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [url]); // Fetch inquiries again if the `url` prop changes

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="view-inquiry-container">
      <h3>View Disease Inquiries</h3>
      <div className="inquiry-grid">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <div key={inquiry._id} className="inquiry-card">
              {/* Display image if available */}
              {inquiry.images ? (
                <img
                  src={`${url}/images/${inquiry.images}`} // Dynamic image path
                  alt="Inquiry"
                  className="inquiry-image"
                />
              ) : (
                <p>No Image Available</p> // Fallback if no image is provided
              )}
              <div className="inquiry-details">
                <h3>{inquiry.farmerName}</h3>
                <p>
                  <strong>Email:</strong> {inquiry.email}
                </p>
                <p>
                  <strong>Phone:</strong> {inquiry.phone}
                </p>
                <p>
                  <strong>Inquiry Date:</strong>{" "}
                  {new Date(inquiry.inquiryDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {inquiry.location}
                </p>
                <p>
                  <strong>Inquiry Topic:</strong> {inquiry.inquiryTopic}
                </p>
                <p>
                  <strong>Symptoms:</strong> {inquiry.symptoms}
                </p>
                <p>
                  <strong>Area:</strong> {inquiry.area}
                </p>
                <p>
                  <strong>Priority Level:</strong> {inquiry.priorityLevel}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No inquiries found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewDiseaseInquiry;
