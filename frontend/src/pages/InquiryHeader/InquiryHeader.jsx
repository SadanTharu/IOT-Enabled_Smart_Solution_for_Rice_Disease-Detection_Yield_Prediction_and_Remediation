import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InquiryHeader.css';

const InquiryHeader = () => {
  const navigate = useNavigate();

  const handleNewDiseaseClick = () => {
    navigate('/diseaseInquiry');
  };

  const handleFaqClick = () => {
    navigate('/inquiryHome', { state: { scrollTo: 'info' } }); // Navigate with state
  };

  const handleQueriesClick = () =>{
    navigate('/viewDiseaseInquiry');
  }


  return (
    <div className='inquiry-header'>
      <div className="inquiry-heade-contents">
        <h2>Ask Us About Your Crop Concerns</h2>
        <p>Quickly inquire about any crop issues and receive the guidance you need to protect your yield. Our system provides accurate information to help you manage and prevent diseases, ensuring your crops stay healthy and your harvest remains strong.</p>
        <div className='button-group'>
          <button onClick={handleNewDiseaseClick}>New Disease?</button>
          <button onClick={handleFaqClick}>FAQ?</button>
          <button onClick={handleQueriesClick}>View Queries</button>
        </div>
      </div>
    </div>
  );
}

export default InquiryHeader;
