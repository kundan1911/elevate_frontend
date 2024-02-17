// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';



const Header = ({ backButton }) => {
  const navigate = useNavigate();

  const goBack = () => {
    console.log("back button clicked");
    navigate(-1); // Go back one step
  };
console.log("header render")
  return (
    <header className='App-header'>
      {backButton && (
        <div className='backButton' onClick={goBack}> 
          <img src="/images/backButton.png" alt="Back"  />
        </div> 
      )}
      <div className='logo'>
        <img src="/images/ELEVATE_logo_1.png" alt="Logo" />
      </div>
    </header>
  );
};

export default Header;
