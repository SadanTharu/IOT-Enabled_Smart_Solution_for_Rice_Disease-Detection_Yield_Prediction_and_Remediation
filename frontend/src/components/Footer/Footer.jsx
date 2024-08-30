import React, { useState } from "react";
import "./Footer.css"
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {

  const [menu,setMenu] = useState("home");

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Discover precise crop yield predictions and effective disease treatments at our platform. Known for its accurate insights and recommendations, we offer unique solutions to enhance your agricultural practices.</p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li><a href="/" onClick={()=> setMenu("home")} className={menu==="home"?"active":""}>Home</a></li>
                <li>About Us</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+94-71 1122334</li>
                <li><a href="#">cropshieldadmin@gmail.com</a></li>
            </ul>
            Email us with your contact number if you have any concerns, and we will get in touch with you.
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        copyright 2024 Y3S1 WE-59 - All Right Reserved.
      </p>
    </div>
  )
}

export default Footer
