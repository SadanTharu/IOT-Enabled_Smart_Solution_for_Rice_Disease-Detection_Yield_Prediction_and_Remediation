import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FromInquery.css";
//import InquiryHeader from "../InquiryHeader/InquiryHeader";
//import Header from "../../components/Header/Header";

const ViewDiseaseInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/diseaseInquiry/list"
        );
        setInquiries(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the inquiries:", error);
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="view-inquiry-container">
      {/* <InquiryHeader /> */}
      {/* <Header/> */}
      <h2>View Disease Inquiries</h2>
      <div className="inquiry-grid">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <div key={inquiry._id} className="inquiry-card">
              {inquiry.images && (
                <img
                  src={`http://localhost:4000/images/${inquiry.images}`}
                  alt="Inquiry"
                  className="inquiry-image"
                />
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
