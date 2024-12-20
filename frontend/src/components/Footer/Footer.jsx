import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="contact-us">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt=""></img>
          <p>Experience precision in crop prediction, disease management, and treatment solutions at Crop Shield in Sri Lanka. Explore our innovative agricultural services.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</li>
            <li>About Us</li>
            <li>Pivacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+94 711223344</li>
            <li>cropshield@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">copyright 2024 Y3S1 WE-SE-59 - All Right Reserved.</p>
    </div>
  );
};

export default Footer;
