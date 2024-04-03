// Header.js
import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Header.css';

const Header = ({ backButton, homeButton }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    console.log("header button clicked");
    if (location.pathname === "/admin") {
      navigate("/");
    } 
    else if (location.pathname === "/admin/AddUser") {
      navigate("/admin");
    }
    else if (location.pathname === "/admin/AddUser") {
        navigate("/admin"); 
    } 
    else {
      // Default behavior, go back one step
      navigate(-1);
    }
  };
  
  return (
    <header className='App-header'>
      {backButton && (
        <div className='backButton' onClick={handleNavigation}> 
          <img id='ButtonImage' src="/images/backButton.png" alt="Back"  />
        </div> 
      )}
      <div className='logo'>
        <img src="/images/ELEVATE_logo_1.png" alt="Logo" />
      </div>
      {homeButton && (
        <Link to='/' className="home-Btn">
          <img id='homeButtonImage' src="/images/home (5).png" alt="Back"  />
        </Link>
      )}
    </header>
  );
};

export default Header;
