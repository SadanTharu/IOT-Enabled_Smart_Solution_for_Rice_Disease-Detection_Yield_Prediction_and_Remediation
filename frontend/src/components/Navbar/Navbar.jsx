import React, { useState } from 'react'
import './Navbar.css'

const Navbar = () => {

  const [menu,setMenu] = useState("Home");

  return (
    <div className='navbar'>
      <img src="" alt="" /> {/*logo*/}
      <ul className='navbar-menu'>
        <li onClick={() => setMenu("Home")} className= {menu==="Home"?"active":""}>Home</li> 
        <li onClick={() => setMenu("Treatments")} className= {menu==="Treatments"?"active":""}>Treatments</li>
        <li onClick={() => setMenu("Predictions")} className= {menu==="Predictions"?"active":""}>Predictions</li>
        <li onClick={() => setMenu("Contact-us")} className= {menu==="Contact-us"?"active":""}>Contact us</li>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-search-icon'>
          {/*search icon*/}
        </div>
        <button>sign in</button>
      </div>
    </div>
  )
}



export default Navbar
