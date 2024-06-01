import React from 'react';
import './RestaurantForm.css';

const RestaurantForm = ({ newRestaurant, handleInputChange, handleCreateRestaurant }) => (
  <div className="restaurant-form">
    <h3>Create Restaurant</h3>
    <input placeholder="Name" value={newRestaurant.name || ''} onChange={e => handleInputChange(e, 'name')} />
    <input placeholder="Address" value={newRestaurant.address || ''} onChange={e => handleInputChange(e, 'address')} />
    <input placeholder="City" value={newRestaurant.city || ''} onChange={e => handleInputChange(e, 'city')} />
    <input placeholder="Country" value={newRestaurant.country || ''} onChange={e => handleInputChange(e, 'country')} />
    <input placeholder="Rating" value={newRestaurant.rating || ''} onChange={e => handleInputChange(e, 'rating')} />
    <button onClick={handleCreateRestaurant}>Create</button>
  </div>
);

export default RestaurantForm;
