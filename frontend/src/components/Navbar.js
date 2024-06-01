import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/francesinhas">Francesinhas</Link>
        </li>
        <li className="navbar-item">
          <Link to="/restaurants">Restaurants</Link>
        </li>
        <li className="navbar-item">
          <Link to="/ingredients">Ingredients</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
