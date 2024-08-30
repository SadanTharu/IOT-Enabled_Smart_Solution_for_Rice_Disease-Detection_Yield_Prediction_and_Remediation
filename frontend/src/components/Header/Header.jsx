import React from 'react'
import { useState } from "react";
import './Header.css'


const Header = () => {

  const [menu,setMenu] = useState("home");

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Predict crop yields and disease.</h2>
        <p>Join us on a journey to optimize your agricultural success and experience the benefits that our crop yield prediction and disease treatment tools can offer. Use our platform today to enhance your crop yields and ensure the health of your crops. Elevate your farming practices with our cutting-edge solutions!</p>
        <a href="#explore-menu" onClick={()=> setMenu("menu")} className={menu==="menu"?"active":""}><button>View Menu</button></a>
      </div>
    </div>
  )
}

export default Header
