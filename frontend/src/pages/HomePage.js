import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => (
  <div className="home-container">
    <h1>Welcome to Francesinha Wiki</h1>
    <nav>
      <ul className="home-nav-list">
        <li className="home-nav-item"><Link to="/francesinhas" className="nav-button">Francesinhas</Link></li>
        <li className="home-nav-item"><Link to="/restaurants" className="nav-button">Restaurants</Link></li>
        <li className="home-nav-item"><Link to="/ingredients" className="nav-button">Ingredients</Link></li>
      </ul>
    </nav>
  </div>
);

export default HomePage;
