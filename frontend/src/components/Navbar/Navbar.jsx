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
          <li className="nav-item"><Link to="/">Home</Link></li><hr />
          <li className="nav-item"><Link to="/About">About</Link></li><hr />
          <li className="nav-item"><Link to="/crop-diseases">Crop Diseases</Link></li><hr />
          <li className="nav-item"><Link to="/RemedyListView">Remediations</Link></li><hr />
          <li className="nav-item"><Link to="/harvest-prediction">Harvest Prediction</Link></li><hr />
          <li className="nav-item"><Link to="/inquiry">Inquiry</Link></li><hr />
          <li className="nav-item"><Link to="/contact">Contact</Link></li><hr />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
