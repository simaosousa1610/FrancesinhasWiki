import React from 'react';
import './List.css';

const RestaurantList = ({ restaurants, onDelete }) => (
  <div className="list-container">
    <div className="grid" >
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="card">
          <div className="name">{restaurant.name}</div>
          <div className="address">Address: {restaurant.address}</div>
          <div className="city">City: {restaurant.city}</div>
          <div className="country">Country: {restaurant.country}</div>
          <div className="rating">Rating: {restaurant.rating}</div>
          <div className="button-group">
            <button onClick={() => onDelete(restaurant._id)} className="action-button">Delete</button>
          </div>
        </div>
      ))}
    </div>
  </div>

);

export default RestaurantList;
