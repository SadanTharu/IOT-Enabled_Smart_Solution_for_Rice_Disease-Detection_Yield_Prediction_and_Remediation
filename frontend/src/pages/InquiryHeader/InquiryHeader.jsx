import React from 'react'
import './InquiryHeader.css'

const InquiryHeader = () => {
  return (
    <div className='inquiry-header'>
      <div className="inquiry-heade-contents">
        <h2>Ask Us About Your Crop Concerns</h2>
        <p>Quickly inquire about any crop issues and receive the guidance you need to protect your yield. Our system provides accurate information to help you manage and prevent diseases, ensuring your crops stay healthy and your harvest remains strong.</p>
        <div className='button-group'>
          <button>New Disease?</button>
          <button>Need Support?</button>
        </div>
      </div>
      
    </div>
  )
}


export default InquiryHeader
