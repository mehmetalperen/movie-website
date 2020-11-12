import React from 'react'
import './Navbar.css';
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className="Navbar">
      <div className="navbar-contanier">
          <Link style={{ textDecoration: 'none' }} to="/"><h1 className="navbar-title">Movie Finder Pro</h1></Link>
          
      </div>
    </div>
  );
}

export default Navbar;
