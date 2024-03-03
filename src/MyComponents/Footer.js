// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='contact'>
        <img src="/images/telephone.png" alt="phone"/>
        <span className='phone'>+ 91 - 22 2857 0085</span>
      </div>
      <Link to="/admin" className="adminButton">
        <img src="/images/user.png" alt="admin Icon" className='AdminIcon' />
        <span className='adminText'>Admin</span>
      </Link>
    </footer>
  );
}
