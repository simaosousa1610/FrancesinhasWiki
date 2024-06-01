import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantList from '../components/RestaurantList';
import RestaurantForm from '../components/RestaurantForm';
import Modal from '../components/Modal';

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setMessage('Error fetching restaurants.');
    }
  };

  const handleInputChange = (e, field) => {
    setNewRestaurant({ ...newRestaurant, [field]: e.target.value });
  };

  const handleCreateRestaurant = async () => {
    try {
      await axios.post('http://localhost:5000/restaurants', newRestaurant);
      fetchRestaurants();
      setMessage('Restaurant created successfully!');
    } catch (error) {
      console.error('Error creating restaurant:', error);
      setMessage('Error creating restaurant.');
    }
  };

  const handleCloseModal = () => {
    setMessage('');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/restaurants/${id}`);
      fetchRestaurants();
      setMessage('Restaurant deleted successfully!');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      setMessage('Error deleting restaurant.');
    }
  };

  return (
    <div>
      <h2>Restaurants</h2>
      <RestaurantList restaurants={restaurants} onDelete={handleDelete} />
      <RestaurantForm
        newRestaurant={newRestaurant}
        handleInputChange={handleInputChange}
        handleCreateRestaurant={handleCreateRestaurant}
      />
      <Modal message={message} onClose={handleCloseModal} />
    </div>
  );
};

export default RestaurantsPage;
