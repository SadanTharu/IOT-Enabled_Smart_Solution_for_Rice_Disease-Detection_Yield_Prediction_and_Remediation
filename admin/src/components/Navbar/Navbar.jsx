import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets'; 
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={navRef}>
      <div className='navbar'>
        <img className='logo' src={assets.logo} alt="logo" />
        <img 
          className="toggle-icon" 
          src={assets.menu_icon} 
          alt="Toggle Menu" 
          onClick={toggleNav}
        />
      </div>

      <div className={`sidenav ${isOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Dashboard</Link></li><hr />
          <li className="nav-item"><Link to="/">Disease Management</Link></li><hr />
          <li className="nav-item"><Link to="/Treatmentdashboard">Treated Management</Link></li><hr />
          <li className="nav-item"><Link to="/">User Management</Link></li><hr />
          <li className="nav-item"><Link to="/">Prediction Management</Link></li><hr />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
